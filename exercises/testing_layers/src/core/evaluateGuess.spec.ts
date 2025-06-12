import { describe, expect, it } from "bun:test";
import evaluateGuess from "./evaluateGuess.ts";

describe("evaluateGuess", () => {
  it("returns dashes for incorrect letters", () => {
    expect(evaluateGuess("xxxxx")).toEqual("-----");
  });

  it("matches letters in the right place", () => {
    expect(evaluateGuess("whale")).toEqual("ggggg");
    expect(evaluateGuess("wxxxx")).toEqual("g----");
    expect(evaluateGuess("xhxxx")).toEqual("-g---");
    expect(evaluateGuess("xxaxx")).toEqual("--g--");
    expect(evaluateGuess("xxxlx")).toEqual("---g-");
    expect(evaluateGuess("xxxxe")).toEqual("----g");
  });

  it("matches letters in the wrong place", () => {
    expect(evaluateGuess("halew")).toEqual("ooooo");
    expect(evaluateGuess("hxxxx")).toEqual("o----");
    expect(evaluateGuess("xwxxx")).toEqual("-o---");
    expect(evaluateGuess("xxwxx")).toEqual("--o--");
    expect(evaluateGuess("xxxwx")).toEqual("---o-");
    expect(evaluateGuess("xxxxw")).toEqual("----o");
  });

  it("doesn't display duplicates", () => {
    expect(evaluateGuess("xwwxx")).toEqual("-o---");
  });
});
