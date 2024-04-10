import { NextResponse } from "next/server";
import { z } from "zod";
import { PersonCategory, WillCreationType, Prisma } from "@prisma/client";
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
    const validatedInput = updateWillSchema.parse(json);

    const financialBeneficiaries: PersonInput[] =
      validatedInput.financialBeneficiaries.map((beneficiary) => {
        let input: PersonInput = {
          fullName: beneficiary.fullName,
          address: beneficiary.address,
          moneyReceived: beneficiary.moneyReceived,
          category: PersonCategory.BENEFICIARY_FINANCIAL,
        };
        if (beneficiary.isCharity) {
          input = {
            ...input,
            isCharity: true,
          };
        }
        return input;
      });

    const itemBeneficiaries: PersonInput[] =
      validatedInput.itemBeneficiaries.map((beneficiary) => ({
        fullName: beneficiary.fullName,
        address: beneficiary.address,
        category: PersonCategory.BENEFICIARY_ITEMS,
        specialItem: {
          description: beneficiary.itemDescription,
        },
      }));

    const residualEstateBeneficiaries: PersonInput[] =
      validatedInput.residualEstateBeneficiaries.map((beneficiary) => ({
        fullName: beneficiary.fullName,
        address: beneficiary.address,
        percentageAssets: beneficiary.percentageAssets,
        category: PersonCategory.BENEFICIARY_ASSETS,
      })) || [];

    const allPeople: Prisma.PersonUpdateManyWithoutWillNestedInput["create"] = [
      ...financialBeneficiaries,
      ...itemBeneficiaries,
      ...residualEstateBeneficiaries,
    ];

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
                PersonCategory.BENEFICIARY_FINANCIAL,
                PersonCategory.BENEFICIARY_ITEMS,
                PersonCategory.BENEFICIARY_ASSETS,
              ],
            },
          },
        },
      },
    });

    const updateWillWithPeople = db.will.update({
      where: { id: params.willId },
      data: {
        creationType: WillCreationType.CUSTOM,
        partnerAsExecutor: false, // reset this value to the DB default because it's not relevant to custom Wills
        partnerAsGuardian: false, // reset this value to the DB default because it's not relevant to custom Wills
        childrenResidualEstatePercentage:
          validatedInput.childrenResidualEstatePercentage || null,
        passResidualEstateToChildren:
          validatedInput.passResidualEstateToChildren,
        passResidualEstateToSiblings:
          validatedInput.passResidualEstateToSiblings,
        people: {
          create: allPeople,
        },
      },
    });

    const petCareMoneyUpdates = validatedInput.petCareMoney.map(
      (petWithMoney) => {
        return db.pet.update({
          where: {
            id: petWithMoney.petId,
          },
          data: {
            careMoneyAmount: petWithMoney.careMoneyAmount,
          },
        });
      }
    );

    await db.$transaction([
      deletePeopleFromWill,
      updateWillWithPeople,
      ...petCareMoneyUpdates,
    ]);

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
