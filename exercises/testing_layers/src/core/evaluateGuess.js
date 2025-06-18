export default function evaluateGuess(guess) {
  const correctAnswerChars = ["w", "h", "a", "l", "e"];
  const guessChars = guess.split("");

  // initialise the result array
  // TODO: assume all letters are wrong by defualt
  const result = [];

  // first pass: check for greens
  for (let i = 0; i < guessChars.length; i++) {
    // TODO: if the letter is in the correct position, mark it as correct
    // TODO: mark the letter as accounted for
  }

  // second pass: check for oranges
  for (let i = 0; i < guessChars.length; i++) {
    // TODO: if the letter is in the correct answer but not in the right place, mark it as such
    // TODO: _only_ mark the letter as such if it hasn't already been marked accounted for
    // TODO: mark the letter as accounted for
  }

  return result;
}
