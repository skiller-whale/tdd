import dictionary from "./dictionary.js";

export function newGame(correctAnswer) {
  return {
    id: crypto.randomUUID(),
    correctAnswer,
    guesses: [],
    evaluations: [],
    status: "playing",
    error: undefined,
  };
}

export function makeGuess(game, latestGuess) {
  const error = validateGuess(latestGuess);
  const guesses = error ? game.guesses : [...game.guesses, latestGuess];
  const evaluations = guesses.map((guess) => evaluateGuess(game.correctAnswer, guess));
  const status = latestGuess === game.correctAnswer
    ? "won"
    : guesses.length >= 6
    ? "lost"
    : "playing";

  return {
    ...game,
    error,
    guesses,
    evaluations,
    status,
  };
}

function validateGuess(guess) {
  if (guess.length !== 5) {
    return "Guesses must be 5 characters long.";
  }
  if (!dictionary.includes(guess)) {
    return "Guess is not in the dictionary.";
  }
  return undefined;
}

function evaluateGuess(correctAnswer, guess) {
  const correctAnswerChars = correctAnswer.split("");
  const guessChars = guess.split("");

  // assume all letters are wrong by default
  const result = Array(guess.length).fill("-");

  // first pass: check for letters in the right position (greens)
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === correctAnswerChars[i]) {
      result[i] = "+";
      correctAnswerChars[i] = null; // mark as used
      guessChars[i] = null; // mark as used
    }
  }

  // second pass: check for letters in the wrong position (yellows)
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] !== null && correctAnswerChars.includes(guessChars[i])) {
      result[i] = "?";
      const index = correctAnswerChars.indexOf(guessChars[i]);
      correctAnswerChars[index] = null; // mark as used
    }
  }

  return result;
}
