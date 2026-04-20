import { describe, expect, it } from "bun:test";
import { WordleGame } from "../src/game.js";
import { evaluateGuess } from "../src/evaluateGuess.js";

describe("WordleGame", () => {
  describe("constructor", () => {
    it("initializes the game state", () => {
      const wordList = ["whale", "water", "fishy", "skill"];
      const game = new WordleGame("whale", wordList);
      expect(game.correctAnswer).toBe("whale");
      expect(game.wordList).toBe(wordList);
      expect(game.guesses).toEqual([]);
      expect(game.evaluations).toEqual([]);
    });

    it("throws an error if the answer is not in the word list", () => {
      const wordList = ["whale", "water", "fishy", "skill"];
      expect(() => new WordleGame("crane", wordList)).toThrow();
    });
  });

  describe("submitGuess", () => {
    it("correctly evaluates the guess", () => {
      const wordList = ["whale", "water", "fishy", "skill"];
      const game = new WordleGame("whale", wordList);
      game.submitGuess("water");
      expect(game.evaluations[0]).toBe(evaluateGuess("water", "whale"));
    });

    it("does not accept further guesses after the game is over", () => {
      const wordList = ["whale", "water", "fishy", "skill"];
      const game = new WordleGame("whale", wordList);
      game.submitGuess("whale");
      game.submitGuess("water");
      expect(game.guesses.length).toBe(1);
    });

    it("throws an error for invalid guesses", () => {
      const wordList = ["whale", "water", "fishy", "skill"];
      const game = new WordleGame("whale", wordList);
      expect(() => game.submitGuess("crane")).toThrow();
    });
  });
});
