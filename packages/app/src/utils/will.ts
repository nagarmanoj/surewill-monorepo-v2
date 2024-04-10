import { Prisma } from "@prisma/client";
import differenceInDays from "date-fns/differenceInDays";
import format from "date-fns/format";
import { db } from "~/libs/prisma";

export const EDIT_DURATION_DAYS = 7;

export const daysSinceWillGeneration = (firstGeneratedAt: Date) => {
  const daysSinceWillGeneration = differenceInDays(
    new Date(),
    new Date(firstGeneratedAt)
  );
  if (daysSinceWillGeneration < 0) return 0;
  return daysSinceWillGeneration;
};

export const canStillEditWill = (firstGeneratedAt?: Date | null) => {
  if (!firstGeneratedAt) return true;
  return daysSinceWillGeneration(firstGeneratedAt) < EDIT_DURATION_DAYS + 1;
};

export const getWillDocumentName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const formattedDate = format(new Date(), "dd/MM/yyyy");
  return `Surewill_${firstName}${lastName}-${formattedDate}.pdf`;
};

const fetchWillWhere = (authUserId: string): Prisma.WillWhereInput => ({
  user: {
    authUserId,
  },
  OR: [{ deletedAt: { isSet: false } }, { deletedAt: null }],
});

export const fetchWill = (authUserId: string) => {
  return db.will.findFirst({
    where: fetchWillWhere(authUserId),
  });
};

export const fetchWillWithPeople = (authUserId: string) => {
  return db.will.findFirst({
    where: fetchWillWhere(authUserId),
    include: {
      people: true,
    },
  });
};

export const fetchWillWithBilling = (authUserId: string) => {
  return db.will.findFirst({
    where: fetchWillWhere(authUserId),
    include: {
      billing: true,
    },
  });
};

export const fetchWillWithPets = (authUserId: string) => {
  return db.will.findFirst({
    where: fetchWillWhere(authUserId),
    include: {
      people: {
        include: {
          pet: true,
        },
      },
    },
  });
};

export type Will = Awaited<ReturnType<typeof fetchWill>>;
export type WillWithPeople = Awaited<ReturnType<typeof fetchWillWithPeople>>;
export type WillWithBilling = Awaited<ReturnType<typeof fetchWillWithBilling>>;
export type WillWithPets = Awaited<ReturnType<typeof fetchWillWithPets>>;
