type ClerkError = {
  code: string;
  longMessage: string;
  message: string;
  meta: { paramName: string };
};

// Convert snake_case to Sentence Case so that Clerk errors are more readable
const formatError = (message: string) =>
  message
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());

export const formatPhoneNumber = (value: string) => {
  if (value.startsWith("+61")) return value.replace(/\s/g, ""); // remove all empty spaces
  const regexCheck = value.match(/[0-9]{0,14}/g);
  if (regexCheck === null) {
    return "";
  }
  let formattedValue = regexCheck?.join("") || "";
  // convert 04 --> +614
  if (formattedValue.startsWith("0")) {
    formattedValue = "+61" + formattedValue.slice(1);
  }
  return formattedValue;
};

export const getFirstErrorMessage = (errors: Array<ClerkError>) => {
  const firstError = errors[0];
  if (firstError.code === "form_param_format_invalid") {
    return "Phone number must be 10 characters starting with 04";
  }
  return formatError(firstError.longMessage);
};
