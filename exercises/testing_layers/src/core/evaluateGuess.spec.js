import { describe, expect, it } from "bun:test";
import evaluateGuess from "./evaluateGuess.js";

describe("evaluateGuess", () => {
  it.todo("identifies letters not in the word", () => {
    // characters nowhere in the correct answer should be marked as such
  });

  it.todo("identifies letters in the right place", () => {
    // characters in the correct answer and in the right place should be marked as such
  });

  it("identifies letters in the wrong place", () => {
    // characters that are in the correct answer but not in the right place should be marked as such
  });

  it("doesn't display duplicates", () => {
    // e.g. if a letter appears twice in the guess, but only once in the correct answer,
    // it should only be marked once
  });
});
