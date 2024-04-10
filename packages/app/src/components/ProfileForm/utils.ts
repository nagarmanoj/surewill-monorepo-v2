import differenceInYears from "date-fns/differenceInYears";
import type { Will } from "~/utils/will";
import { EMPTY_ADDRESS, getInitialAddress } from "~/utils/addresses";
import type { FieldValues } from "./schema";

const EMPTY_FORM: FieldValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  address: EMPTY_ADDRESS,
  willCreationType: "",
};

export const formatInitialValues = (
  user: {
    firstName: string | null;
    lastName: string | null;
  },
  initialValues: Will
): FieldValues => {
  if (!initialValues) {
    return {
      ...EMPTY_FORM,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    };
  }
  return {
    firstName: initialValues.firstName,
    middleName: initialValues.middleName,
    lastName: initialValues.lastName,
    dateOfBirth: initialValues.dateOfBirth,
    address: getInitialAddress(initialValues.address),
    willCreationType: initialValues.creationType,
  };
};

export const isOver18OrOver = (dateOfBirth: string) => {
  const date = new Date(dateOfBirth);
  const age = differenceInYears(new Date(), date);
  return age > 17;
};
