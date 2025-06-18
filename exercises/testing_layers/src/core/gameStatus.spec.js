import { describe, expect, it } from "bun:test";
import gameStatus from "./gameStatus.js";

describe("game status", () => {
  it("returns 'playing' when there are no guesses", () => {
    const guesses = [];
    expect(gameStatus(guesses)).toBe("playing");
  });

  it("returns 'playing' when there are fewer than 6 guesses", () => {
    const guesses = ["fishy", "shark", "shell", "trout", "salty"];
    expect(gameStatus(guesses)).toBe("playing");
  });

  it("returns 'won' when the last guess is correct", () => {
    const guesses = ["fishy", "shark", "shell", "whale"];
    expect(gameStatus(guesses)).toBe("won");
  });

  it("returns 'lost' when there are 6 incorrect guesses", () => {
    const guesses = ["fishy", "shark", "shell", "trout", "salty", "ocean"];
    expect(gameStatus(guesses)).toBe("lost");
  });
});
