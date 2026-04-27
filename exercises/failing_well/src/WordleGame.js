import { evaluateGuess } from "./evaluateGuess.js";
import { validateGuess } from "./validateGuess.js";

export class WordleGame {
  /**
   * Creates a new game of Wordle.
   *
   * @param {string} correctAnswer The correct answer for this game of Wordle
   * @param {string[]} wordList The list of valid words that can be guessed in this game
   * @throws {Error} If the correct answer is not in the word list.
   */
  constructor(correctAnswer, wordList) {
    if (!wordList.includes(correctAnswer)) {
      throw new Error("Answer must be in the word list");
    }

    this.correctAnswer = correctAnswer;
    this.wordList = wordList;
    this.guesses = [];
    this.evaluations = [];
  }

  /**
   * Submits a guess for this game of Wordle. If the guess is valid, it will be evaluated and added to the game state. If the guess is invalid, an error will be thrown.
   *
   * @param {string} guess 
   * @returns void
   * @throws {Error} If the guess is invalid.
   */
  submitGuess(guess) {
    if (this.guesses.at(-1) === this.correctAnswer || this.guesses.length >= 6) {
      return null;
    }

    const validationResult = validateGuess(guess, this.wordList);
    if (!validationResult.valid) {
      throw new Error(validationResult.error);
    }

    const evaluation = evaluateGuess(guess, this.correctAnswer);
    this.guesses.push(guess);
    this.evaluations.push(evaluation);
  }
}
