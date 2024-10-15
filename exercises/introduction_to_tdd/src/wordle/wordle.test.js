import { describe, expect, test } from "bun:test";
import laWords from "./words/la_words.js";
import { createGame } from "./wordle.js";

describe("wordle game logic", () => {
  // `createGame` function
  test("`createGame` returns an object with a valid answer", () => {
    const game = createGame();
    expect(laWords).toContain(game.answer);
  });

  test("`createGame` returns an object with an empty array of guesses", () => {
    const game = createGame();
    expect(game.guesses).toEqual([]);
  });

  // `makeGuess` function
  test.skip("`makeGuess` adds the guess to the guesses array", () => {
    const gameStart = { answer: "abate", guesses: [] };
    const gameNext = makeGuess(gameStart, "wrong");
    expect(gameNext.guesses).toHaveLength(1);
    expect(gameNext.guesses).toContain("wrong");
  });

  test.skip("`makeGuess` throws if the guess isn't in the word list", () => {
    const gameStart = { answer: "abate", guesses: [] };
    expect(() => makeGuess(gameStart, "car")).toThrow({
      message: "not in word list",
    });
  });

  test.todo("`makeGuess` throws if the guess has already been tried");

  // `evaluateGuess` function
  test.todo("`evaluateGuess` returns the correct combination of g/o/-");
});
