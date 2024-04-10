import type { Person, Pet } from "@prisma/client";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddress,
} from "~/utils/addresses";

export const getInitialCremated = (cremated: boolean | null) => {
  if (cremated === true) return "cremated";
  if (cremated === false) return "buried";
  return "undecided";
};

export const getInitialPets = (people: Array<Person & { pet: Pet | null }>) => {
  const peopleWithPets = people
    ?.filter((person) => person.category === "PET_OWNER")
    ?.map((owner) => ({
      name: owner.pet?.name || "",
      type: owner.pet?.type || "",
      ownerFullName: owner.fullName,
      ownerAddress: getInitialAddress(owner.address),
      isOwnerPartner: !!owner.isPartner,
    }));
  if (peopleWithPets.length > 0) return peopleWithPets;
  return [];
};

export const getInitialPetsChoiceValue = (
  isInitialCreate: boolean,
  initialPets: Array<{
    name: string;
    type: string;
    ownerFullName: string;
    ownerAddress: AddressSchema;
  }>
): "yes" | "no" | null => {
  if (isInitialCreate) return null;
  const hasPets = initialPets.filter((pet) => !!pet.name).length > 0;
  return hasPets ? "yes" : "no";
};

export const getUniquePeopleOptions = (allPeople: Person[]) => {
  const peopleNames = allPeople
    .filter((person) => !person.isCharity)
    .map((person) => person.fullName);
  const uniqueNames = new Set(peopleNames);
  const uniquePeople = Array.from(uniqueNames)
    .map((name) => ({
      id: allPeople.find((person) => person.fullName === name)?.id || "",
      fullName: name,
      address:
        allPeople.find((person) => person.fullName === name && !!person.address)
          ?.address || EMPTY_ADDRESS,
      email:
        allPeople.find((person) => person.fullName === name && !!person.email)
          ?.email || "",
    }))
    .filter((person) => person.fullName && person.address);
  return uniquePeople;
};
