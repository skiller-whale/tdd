import { describe, expect, it } from "bun:test";
import { newGame, makeGuess } from "./gameState.js";

describe("game state", () => {
  it("returns the correct game status", () => {
    const game1 = newGame("whale");
    expect(game1.status).toBe("playing");

    const game2 = makeGuess(game1, "whale");
    expect(game2.status).toBe("won");

    const game3 = makeGuess(game1, "shark");
    const game4 = makeGuess(game3, "shell");
    const game5 = makeGuess(game4, "trout");
    const game6 = makeGuess(game5, "salty");
    const game7 = makeGuess(game6, "ocean");
    expect(game6.status).toBe("playing");

    const game8 = makeGuess(game7, "fishy");
    expect(game8.status).toBe("lost");
  });

  it("rejects invalid guesses with an error message", () => {
    const game = newGame("whale");
    expect(makeGuess(game, "abcd").error).toBe(
      "Guesses must be 5 characters long."
    );
    expect(makeGuess(game, "abcdef").error).toBe(
      "Guesses must be 5 characters long."
    );
    expect(makeGuess(game, "abcde").error).toBe(
      "Guess is not in the dictionary."
    );
  });

  it("adds valid guesses to the guesses array", () => {
    const game1 = newGame("whale");

    const game2 = makeGuess(game1, "fishy");
    expect(game2.guesses).toEqual(["fishy"]);

    const game3 = makeGuess(game2, "shark");
    expect(game3.guesses).toEqual(["fishy", "shark"]);

    const game4 = makeGuess(game3, "shell");
    expect(game4.guesses).toEqual(["fishy", "shark", "shell"]);
  });

  it("evaluates guesses correctly", () => {
    const game1 = newGame("whale");

    const game2 = makeGuess(game1, "trout");
    expect(game2.evaluations).toEqual([["-", "-", "-", "-", "-"]]);

    const game3 = makeGuess(game2, "water");
    expect(game3.evaluations).toEqual([
      ["-", "-", "-", "-", "-"],
      ["+", "?", "-", "?", "-"],
    ]);

    const game4 = makeGuess(game3, "shell");
    expect(game4.evaluations).toEqual([
      ["-", "-", "-", "-", "-"],
      ["+", "?", "-", "?", "-"],
      ["-", "+", "?", "+", "-"],
    ]);
  });
});
