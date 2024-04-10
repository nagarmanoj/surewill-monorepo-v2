import { UpdateWillInput } from "~/app/api/wills/[willId]/custom/executors/types";
import type { WillWithPets } from "~/utils/will";
import type { FieldValues } from "./schema";
import { EMPTY_ADDRESS } from "~/utils/addresses";

const EMPTY_FORM: FieldValues = {
  executor: {
    fullName: "",
    email: "",
    address: EMPTY_ADDRESS,
  },
  backupExecutor: {
    fullName: "",
    email: "",
    address: EMPTY_ADDRESS,
  },
  professionalAsExecutor: false,
  professionalAsBackupExecutor: false,
};

export const formatInitialValues = (
  initialValues: NonNullable<WillWithPets>
): FieldValues => {
  if (!initialValues) return EMPTY_FORM;
  const executor = initialValues.people.find(
    (person) => person.category === "EXECUTOR"
  );
  const backupExecutor = initialValues.people.find(
    (person) => person.category === "EXECUTOR_BACKUP"
  );
  return {
    executor: executor || EMPTY_FORM["executor"],
    backupExecutor: backupExecutor || EMPTY_FORM["backupExecutor"],
    professionalAsExecutor: !!initialValues.professionalAsExecutor,
    professionalAsBackupExecutor: !!initialValues.professionalAsBackupExecutor,
  };
};

export const formatFormValues = (
  values: FieldValues
): Omit<UpdateWillInput, "isWillPaid"> => ({
  executor:
    values.executor && values.executor?.fullName.length > 0
      ? values.executor
      : null,
  backupExecutor:
    values.backupExecutor && values.backupExecutor?.fullName?.length > 0
      ? values.backupExecutor
      : null,
  professionalAsExecutor: values.professionalAsExecutor,
  professionalAsBackupExecutor: values.professionalAsBackupExecutor,
});
