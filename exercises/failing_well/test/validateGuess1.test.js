import { expect, it } from "bun:test";
import { validateGuess } from "../src/validateGuess.js";

it("validates/invalidates guesses correctly", () => {
  const words = ["crane", "rates", "towns"];
  expect(validateGuess("crane", words).valid).toBe(true);
  expect(validateGuess("cran", words).valid).toBe(false);
  expect(validateGuess("cr4ne", words).valid).toBe(false);
  expect(validateGuess("bumps", words).valid).toBe(false);
});

it("returns a reason for invalid guesses", () => {
  const words = ["crane"];
  const tooShort = validateGuess("cran", words);
  expect(tooShort.reason !== undefined).toBe(true);
  const nonLetter = validateGuess("cr4ne", words);
  expect(nonLetter.reason !== undefined).toBe(true);
  const notInList = validateGuess("bumps", words);
  expect(notInList.reason).toBeDefined();
});
