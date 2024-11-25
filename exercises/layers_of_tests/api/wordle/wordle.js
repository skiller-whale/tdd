export const createGame = (dictionary, answer) => {
  return {
    dictionary,
    answer,
    guesses: [],
    evaluations: [],
  }
};

export const makeGuess = (game, guess) => {
  const evaluation = evaluateGuess(game.answer, guess);
  return {
    ...game,
    guesses: [...game.guesses, guess],
    evaluations: [...game.evaluations, evaluation],
  };
};

export const evaluateGuess = (answer, guess) => {
  const evaluationArray = ["-", "-", "-", "-", "-"]; // assume everything's grey to start
  const remainingArray = answer.split(""); // to keep track of which letters are already accounted for

  // check for greens
  guess.split("").forEach((char, index) => {
    if (answer[index] === char) {
      evaluationArray[index] = "g";
      remainingArray[index] = "";
    }
  });

  // check for oranges
  guess.split("").forEach((char, index) => {
    if (answer[index] !== char && remainingArray.includes(char)) {
      evaluationArray[index] = "o";
      remainingArray[remainingArray.indexOf(char)] = "";
    }
  });

  // return result
  return evaluationArray.join("");
};
