import { NextResponse } from "next/server";
import { z } from "zod";
import {
  PersonCategory,
  WillCreationType,
  WillStatus,
  Prisma,
} from "@prisma/client";
import { db } from "~/libs/prisma";
import { withAuth, ensureWillOwner, RequestWithAuth } from "~/libs/auth";
import { updateWillSchema } from "./types";

type PersonInput = Prisma.PersonCreateWithoutWillInput;

const putHandler = async (
  request: RequestWithAuth,
  {
    params,
  }: {
    params: {
      willId: string;
    };
  }
) => {
  try {
    const isWillOwner = await ensureWillOwner(request.user.id, params.willId);
    if (!isWillOwner) {
      return NextResponse.json(
        { success: false, error: "Not Authorized." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const { isWillPaid, ...validatedInput } = updateWillSchema.parse(json);

    const executor: PersonInput | null = validatedInput.executor
      ? {
          ...validatedInput.executor,
          category: PersonCategory.EXECUTOR,
        }
      : null;

    const backupExecutor: PersonInput | null = validatedInput.backupExecutor
      ? {
          ...validatedInput.backupExecutor,
          category: PersonCategory.EXECUTOR_BACKUP,
        }
      : null;

    const executors: Prisma.PersonUpdateManyWithoutWillNestedInput["create"] =
      [];
    if (executor) {
      executors.push(executor);
    }
    if (backupExecutor) {
      executors.push(backupExecutor);
    }

    const deletePeopleFromWill = db.will.update({
      where: {
        id: params.willId,
      },
      data: {
        people: {
          deleteMany: {
            category: {
              in: [
                // Only delete the people that are relevant to this part of the Will
                PersonCategory.EXECUTOR,
                PersonCategory.EXECUTOR_BACKUP,
              ],
            },
          },
        },
      },
    });

    const updateWillWithPeople = db.will.update({
      where: { id: params.willId },
      data: {
        status: isWillPaid
          ? WillStatus.COMPLETE_PAID
          : WillStatus.COMPLETE_UNPAID, // if editing an already paid Will, keep the status as COMPLETE_PAID
        creationType: WillCreationType.CUSTOM,
        partnerAsExecutor: false, // reset this value to the DB default because it's not relevant to custom Wills
        partnerAsGuardian: false, // reset this value to the DB default because it's not relevant to custom Wills
        professionalAsExecutor: validatedInput.professionalAsExecutor,
        professionalAsBackupExecutor:
          validatedInput.professionalAsBackupExecutor,
        people: {
          create: executors,
        },
      },
    });

    await db.$transaction([deletePeopleFromWill, updateWillWithPeople]);

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues,
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const PUT = withAuth(putHandler);
