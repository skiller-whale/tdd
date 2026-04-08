import { expect, it } from "bun:test";
import { evaluateGuess } from "../src/evaluateGuess.js";

it("correct", () => {
  expect(evaluateGuess("crane", "crane")).toBe("ggggg");
});

it("incorrect", () => {
  expect(evaluateGuess("bumps", "crane")).toBe("-----");
});

it("yellow letters", () => {
  expect(evaluateGuess("acorn", "crane")).toBe("yy-yy");
});

it("mixed", () => {
  expect(evaluateGuess("grace", "crane")).toBe("-ggyg");
});

it("duplicate letters", () => {
  expect(evaluateGuess("error", "crane")).toBe("yg---");
});
