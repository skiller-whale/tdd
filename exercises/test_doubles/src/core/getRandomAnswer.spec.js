import { describe, it, expect, mock, spyOn } from "bun:test";
import getRandomAnswer from "./getRandomAnswer.js";
import dictionary from "./dictionary.js";

describe("getRandomAnswer", () => {
  it("returns a valid answer", () => {
    const answer = getRandomAnswer();
    expect(dictionary).toContain(answer);
  });

  it.todo("returns a different answer each time", () => {
    // TODO
  });

  it.todo("calls `Math.random`", () => {
    // TODO
  });

  it.todo("returns the same answer when `Math.random` returns the same value", () => {
    // TODO
  });
});
