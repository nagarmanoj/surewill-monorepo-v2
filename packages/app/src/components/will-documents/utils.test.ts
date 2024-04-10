import {
  stateIsTerritory,
  getStateOrTerritoryText,
  getAddressForStateOrTerritory,
} from "./utils";

describe("stateIsTerritory", () => {
  test("returns true for territories", () => {
    expect(stateIsTerritory("northern territory")).toBe(true);
    expect(stateIsTerritory("Australian Capital Territory")).toBe(true);
  });
  test("returns true for territories", () => {
    expect(stateIsTerritory("Queensland")).toBe(false);
  });
});

describe("getStateOrTerritoryText", () => {
  test("returns the correct text for states", () => {
    expect(getStateOrTerritoryText("Queensland")).toBe(
      "in the State of Queensland"
    );
  });
  test("returns the correct text for territories", () => {
    expect(getStateOrTerritoryText("Northern Territory")).toBe(
      "in the Northern Territory"
    );
  });
});

describe("getAddressForStateOrTerritory", () => {
  describe("in a state", () => {
    test("return the correct address text", () => {
      const result = getAddressForStateOrTerritory({
        line1: "Line1",
        line2: "Line2",
        city: "Wooloowin",
        state: "Queensland",
        postalCode: "111222",
        country: "Australia",
      });
      const expected =
        "Line1, Line2, Wooloowin, in the State of Queensland, 111222";
      expect(result).toBe(expected);
    });
  });
  describe("in a territory", () => {
    test("return the correct address text", () => {
      const result = getAddressForStateOrTerritory({
        line1: "Line1",
        line2: "Line2",
        city: "Wooloowin",
        state: "Northern Territory",
        postalCode: "111222",
        country: "Australia",
      });
      const expected =
        "Line1, Line2, Wooloowin, in the Northern Territory, 111222";
      expect(result).toBe(expected);
    });
  });
});
