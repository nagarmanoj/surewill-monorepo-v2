// Taken from https://github.com/colinhacks/zod/blob/master/src/types.ts#L560C1-L561C72
const EMAIL_REGEX =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
