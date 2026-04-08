/**
 * Determines which letters in a Wordle guess are correct (green), present but in the wrong place (yellow), or not present at all (grey).
 * @param {string} guess - The guessed word.
 * @param {string} correctAnswer - The correct word.
 * @returns {string} A string representing the evaluation of each letter: 'g' for green, 'y' for yellow, '-' for grey.
 */
export function evaluateGuess(guess, correctAnswer) {
  const evaluationArray = "-----".split("");
  const remainingArray = correctAnswer.split("");

  // check for greens
  for (let index = 0; index < 5; index++) {
    if (correctAnswer[index] === guess[index]) {
      evaluationArray[index] = "g";
      remainingArray[index] = "";
    }
  }

  // check for yellows
  for (let index = 0; index < 5; index++) {
    if (correctAnswer[index] !== guess[index] && remainingArray.includes(guess[index])) {
      evaluationArray[index] = "y";
      remainingArray[remainingArray.indexOf(guess[index])] = "";
    }
  }

  return evaluationArray.join("");
};
