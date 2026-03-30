import { describe, expect, it } from "bun:test";
import { validateGuess } from "../src/validateGuess.js";

describe("validateGuess", () => {
  it("returns valid for a 5-letter word in the word list", () => {
    expect(validateGuess("crane", ["crane", "audio"])).toEqual({ valid: true });
  });

  it("returns invalid for a word that is not 5 letters", () => {
    expect(validateGuess("cr", ["crane", "audio"])).toEqual({
      valid: false,
      reason: "Guess must be 5 letters",
    });
  });

  it("returns invalid for a word containing non-letter characters", () => {
    expect(validateGuess("cr4ne", ["crane", "audio"])).toEqual({
      valid: false,
      reason: "Guess must only contain letters",
    });
  });

  it("returns invalid for a word not in the word list", () => {
    expect(validateGuess("audio", ["crane"])).toEqual({
      valid: false,
      reason: "Not a recognised word",
    });
  });
});
