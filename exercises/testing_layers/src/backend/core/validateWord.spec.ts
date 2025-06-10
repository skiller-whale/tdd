import { describe, it, expect } from "bun:test";
import validateWord from "./validateWord.ts";
import english from "../dictionaries/english.ts";

describe("validateWord", () => {
  it("returns undefined for a valid guess", () => {
    expect(validateWord("whale")).toBeUndefined();
  });
});
