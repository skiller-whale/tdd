import { describe, expect, test } from "bun:test";
import { createGame } from "./wordle.js";

describe("`createGame`", () => {
  test("returns initial game state", () => {
    const dictionary = ["aaaaa", "bbbbb", "ccccc"];
    const answer = "aaaaa";
    const state = createGame(dictionary, answer);
    expect(state).toEqual({ dictionary, answer, guesses: [] });
  });

  test("throws if dictionary isn't a non-empty array", () => {
    expect(() => createGame()).toThrow({
      message: "bad or missing dictionary",
    });
    expect(() => createGame("not an array")).toThrow({
      message: "bad or missing dictionary",
    });
    expect(() => createGame([])).toThrow({
      message: "bad or missing dictionary",
    });
  });

  test("throws if answer is not in dictionary", () => {
    const dictionary = ["aaaaa", "bbbbb"];
    const answer = "ccccc";
    expect(() => createGame(dictionary, answer)).toThrow({
      message: "answer not in dictionary",
    });
  });

  test("throws if dictionary isn't all 5-letter words", () => {
    // uncomment when instructed
    // const dictionaryWithNumber = ["aaaaa", 12, "ccccc"];
    // expect(() => createGame(dictionaryWithNumber)).toThrow({
    //   message: "bad dictionary value",
    // });

    // uncomment when instructed
    // const dictionaryWithBoolean = ["aaaaa", false, "ccccc"];
    // expect(() => createGame(dictionaryWithBoolean)).toThrow({
    //   message: "bad dictionary value",
    // });

    // uncomment when instructed
    // const dictionaryWithBadString = ["aaaaa", "cat", "ccccc"];
    // expect(() => createGame(dictionaryWithBadString)).toThrow({
    //   message: "bad dictionary value",
    // });
  });

});

describe("`makeGuess`", () => {
  test("preserves game state and adds guess to the guesses array", () => {
    const dictionary = ["aaaaa", "bbbbb", "ccccc"];
    const answer = "aaaaa";
    const game1 = createGame(dictionary, answer);
    // 1. make guess of "bbbbb"
    // 2. expect dictionary to be unchanged
    // 3. expect answer to be unchanged
    // 4. expect the guesses array to be `["bbbbb"]`
    // 5. make second guess of "ccccc", and expect the guesses array to be `["bbbbb", "ccccc"]`
  });

  test.skip("throws if guess isn't in dictionary", () => {
    const dictionary = ["aaaaa", "bbbbb", "ccccc"];
    const answer = "aaaaa";
    const game = createGame(dictionary, answer);
    expect(() => makeGuess(game, "xxxxx")).toThrow({
      message: "not in word list",
    });
  });

  test.skip("throws if guess has already been tried", () => {
    const dictionary = ["aaaaa", "bbbbb", "ccccc"];
    const answer = "aaaaa";
    const game1 = createGame(dictionary, answer);
    const game2 = makeGuess(game1, "bbbbb");
    expect(() => makeGuess(game2, "bbbbb")).toThrow({
      message: "already guessed",
    });
  });
});

describe.todo("`evaluateGuess`");
