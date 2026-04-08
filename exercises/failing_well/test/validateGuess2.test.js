import { describe, expect, it } from "bun:test";
import { validateGuess } from "../src/validateGuess.js";

describe("validateGuess", () => {
  describe("with a valid guess", () => {
    it("returns valid for a recognised 5-letter word", () => {
      const result = validateGuess("crane", ["crane", "rates"]);
      expect(result.valid).toBe(true);
    });
  });

  describe("with an invalid guess", () => {
    it("returns invalid with a reason for a guess that's too short", () => {
      const result = validateGuess("cran", ["crane", "rates"]);
      expect(result.valid).toBe(false);
      expect(result.reason).toBe("Guess must be 5 letters");
    });

    it("returns invalid with a reason for non-letter characters", () => {
      const result = validateGuess("cr4ne", ["crane", "rates"]);
      expect(result.valid).toBe(false);
      expect(result.reason).toBe("Guess must only contain letters");
    });

    it("returns invalid with a reason for a guess not in the word list", () => {
      const result = validateGuess("bumps", ["crane", "rates"]);
      expect(result.valid).toBe(false);
      expect(result.reason).toBe("Not a recognised word");
    });
  });
});
