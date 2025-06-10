import { describe, it, expect } from "bun:test";
import evaluateGuess from "./evaluateGuess.ts";

describe("evaluateGuess", () => {
  it("matches letters in the right place", () => {
    expect(evaluateGuess("whale", "whale")).toEqual("ggggg");
    expect(evaluateGuess("whale", "wxxxx")).toEqual("g----");
    expect(evaluateGuess("whale", "xhxxx")).toEqual("-g---");
    expect(evaluateGuess("whale", "xxaxx")).toEqual("--g--");
    expect(evaluateGuess("whale", "xxxlx")).toEqual("---g-");
    expect(evaluateGuess("whale", "xxxxe")).toEqual("----g");
  });

  it("matches letters in the wrong place", () => {
    expect(evaluateGuess("whale", "halew")).toEqual("ooooo");
    expect(evaluateGuess("whale", "hxxxx")).toEqual("o----");
    expect(evaluateGuess("whale", "xwxxx")).toEqual("-o---");
    expect(evaluateGuess("whale", "xxwxx")).toEqual("--o--");
    expect(evaluateGuess("whale", "xxxwx")).toEqual("---o-");
    expect(evaluateGuess("whale", "xxxxw")).toEqual("----o");
  });

  it("doesn't display duplicates", () => {
    expect(evaluateGuess("radio", "tools")).toEqual("-o---");
  });

  it("allows duplicates when the correct answer contains duplicates", () => {
    expect(evaluateGuess("dadda", "adaad")).toEqual("ooo-o");
  });

  it("prioritises green over orange", () => {
    expect(evaluateGuess("dadda", "aaaaa")).toEqual("-g--g");
  });
});
