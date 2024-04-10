import { NextResponse } from "next/server";
import { z } from "zod";
import { PersonCategory, WillCreationType, Prisma } from "@prisma/client";
import { db } from "~/libs/prisma";
import {
  withAuth,
  ensureWillOwnerWithWill,
  RequestWithAuth,
} from "~/libs/auth";
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
    const will = await ensureWillOwnerWithWill(request.user.id, params.willId);
    if (!will) {
      return NextResponse.json(
        { success: false, error: "Not Authorized." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const validatedInput = updateWillSchema.parse(json);

    const guardian: PersonInput | null = validatedInput.guardian
      ? {
          ...validatedInput.guardian,
          category: PersonCategory.GUARDIAN,
        }
      : null;

    const backupGuardian: PersonInput | null = validatedInput.backupGuardian
      ? {
          ...validatedInput.backupGuardian,
          category: PersonCategory.GUARDIAN_BACKUP,
        }
      : null;

    const existingPets =
      will.people
        ?.filter((person) => person.category === "PET_OWNER")
        ?.map((personWithPet) => personWithPet.pet) || [];

    const petsPeople: PersonInput[] = validatedInput.pets.map((pet) => ({
      fullName: pet.ownerFullName,
      address: pet.ownerAddress,
      category: PersonCategory.PET_OWNER,
      pet: {
        create: {
          name: pet.name,
          type: pet.type,
          willId: params.willId,
          // we delete and reset all pet people, so make sure we keep the careMoneyAmount too
          careMoneyAmount:
            existingPets.find((existingPet) => existingPet?.name === pet.name)
              ?.careMoneyAmount || "",
        },
      },
    }));

    const allPeople: Prisma.PersonUpdateManyWithoutWillNestedInput["create"] = [
      ...petsPeople,
    ];
    if (guardian) {
      allPeople.push(guardian);
    }
    if (backupGuardian) {
      allPeople.push(backupGuardian);
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
                PersonCategory.GUARDIAN,
                PersonCategory.GUARDIAN_BACKUP,
                PersonCategory.PET_OWNER,
              ],
            },
          },
        },
      },
    });

    const hasKids = !!guardian;

    const updateWillWithPeople = db.will.update({
      where: { id: params.willId },
      data: {
        creationType: WillCreationType.CUSTOM,
        partnerAsExecutor: false, // reset this value to the DB default because it's not relevant to custom Wills
        partnerAsGuardian: false, // reset this value to the DB default because it's not relevant to custom Wills
        cremated: validatedInput.cremated,
        inheritanceAge: hasKids ? validatedInput.inheritanceAge : null, // if no kids then this value must be null
        passResidualEstateToChildren: hasKids ? undefined : false, // if no kids then this value must be false
        childrenResidualEstatePercentage: hasKids ? undefined : null, // if no kids then this value must be zero (or null)
        donateOrgans: validatedInput.donateOrgans,
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
