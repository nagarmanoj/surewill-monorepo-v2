import { NextResponse } from "next/server";
import { Prisma, WillCreationType } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";
import { uuid } from "uuidv4";
import { db } from "~/libs/prisma";
import { updateProfileSchema } from "./types";

const postHandler = async (request: Request) => {
  try {
    const authUser = await currentUser();
    if (!authUser) {
      return new Response("Not Authorized.", {
        status: 401,
      });
    }

    const { id: authUserId, emailAddresses, primaryEmailAddressId } = authUser;

    const json = await request.json();
    const { willCreationType, willId, ...input } =
      updateProfileSchema.parse(json);

    const emailAddress = emailAddresses.find(
      (email) => email.id === primaryEmailAddressId
    )?.emailAddress;

    const data = {
      ...input,
      email: emailAddress,
      creationType: willCreationType as WillCreationType,
    };

    if (willId) {
      await db.will.update({
        where: { id: willId },
        data,
      });
    } else {
      const createWillInput: Prisma.WillCreateWithoutUserInput = {
        ...data,
        generationKey: uuid(),
        email: emailAddress,
      };

      // User with authUserId may or may not exist, because it's created from a Clerk webhook.
      // In most cases it will already exist, unless for some reason the webhook failed.
      await db.user.upsert({
        where: {
          authUserId,
        },
        create: {
          authUserId,
          wills: {
            create: createWillInput,
          },
        },
        update: {
          wills: {
            create: createWillInput,
          },
        },
      });
    }

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

export const POST = postHandler;
