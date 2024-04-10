import { formatPhoneNumber } from "./utils";

describe("formatPhoneNumber", () => {
  test("formats numbers starting with 04", () => {
    const inputNumber = "0455666777";
    expect(formatPhoneNumber(inputNumber)).toBe("+61455666777");
  });
  test("removes spaces from phone numbers", () => {
    const inputNumber = "0455 666 777";
    expect(formatPhoneNumber(inputNumber)).toBe("+61455666777");
  });
  test("removes spaces from +61 phone numbers", () => {
    const inputNumber = "+61 455 666 777";
    expect(formatPhoneNumber(inputNumber)).toBe("+61455666777");
  });
  test("ignores already formatted phone numbers", () => {
    const inputNumber = "+61455666777";
    expect(formatPhoneNumber(inputNumber)).toBe("+61455666777");
  });
});
