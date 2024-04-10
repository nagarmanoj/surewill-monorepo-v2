import { NextResponse } from "next/server";
import { z } from "zod";
import {
  PersonCategory,
  WillCreationType,
  Prisma,
  WillStatus,
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

    const assetPeople: PersonInput[] = validatedInput.assets.map(
      (assetPerson) => ({
        fullName: assetPerson.fullName,
        address: assetPerson.address,
        category: PersonCategory.BENEFICIARY_ASSETS,
        percentageAssets: assetPerson.percentageAssets,
      })
    );

    const petsPeople: PersonInput[] = validatedInput.pets.map((pet) => ({
      fullName: pet.ownerFullName,
      address: pet.ownerAddress,
      category: PersonCategory.PET_OWNER,
      pet: {
        create: {
          name: pet.name,
          type: pet.type,
          willId: params.willId,
        },
      },
    }));

    const executor: PersonInput | null = validatedInput.executor
      ? {
          fullName: validatedInput.executor.fullName,
          email: validatedInput.executor.email,
          address: validatedInput.executor.address,
          category: PersonCategory.EXECUTOR,
        }
      : null;

    const allPeople: Prisma.PersonUpdateManyWithoutWillNestedInput["create"] = [
      ...assetPeople,
      ...petsPeople,
    ];
    if (executor) {
      allPeople.push(executor);
    }

    const deletePeopleFromWill = db.will.update({
      where: {
        id: params.willId,
      },
      data: {
        people: {
          deleteMany: {},
        },
      },
    });

    const updateWillWithPeople = db.will.update({
      where: { id: params.willId },
      data: {
        creationType: WillCreationType.SINGLE,
        status: isWillPaid
          ? WillStatus.COMPLETE_PAID // if editing an already paid Will, keep the status as COMPLETE_PAID
          : WillStatus.COMPLETE_UNPAID,
        cremated: validatedInput.cremated,
        professionalAsExecutor: !!validatedInput.professionalAsExecutor,
        people: {
          create: allPeople,
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
