import { evaluateGuess } from "../wordle/wordle.js";

export const getGameState = (game) => {
  const lastGuess = game.guesses[game.guesses.length - 1];
  if (lastGuess !== undefined && evaluateGuess(game.answer, lastGuess) === "ggggg") {
    return "won";
  }

  if (game.guesses.length === 6) {
    return "lost";
  }

  return "playing";
};

export const getGuessesForDisplay = (game) => {
  const guesses = game.guesses.map((guess) => {
    const evaluation = evaluateGuess(game.answer, guess);
    return guess.split("").map((letter, index) => {
      const color =
        evaluation[index] === "g"
          ? "green"
          : evaluation[index] === "o"
          ? "orange"
          : "gray";
      return { letter, color };
    });
  });

  while (guesses.length < 6) {
    guesses.push(new Array(5).fill({ letter: "", color: "lightgray" }));
  }

  return guesses;
};
