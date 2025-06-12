import { describe, expect, it } from "bun:test";
import dictionary from "./dictionary.ts";
import validateGuess from "./validateGuess.ts";

describe("validateGuess", () => {
  it("returns undefined for a valid guess", () => {
    expect(validateGuess("whale")).toBeUndefined();
  });

  // for exercise 3 (double loop):
  // IF you stepped down a second time, work with these tests:
  it.todo("returns an error for guesses that are too short");

  it.todo("returns an error for guesses that are too long");

  it.todo("returns an error for guesses that are not in the dictionary");
});
