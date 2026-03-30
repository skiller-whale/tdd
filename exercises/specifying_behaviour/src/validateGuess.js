/**
 * Validates a word before accepting it as a Wordle guess.
 *
 * @param {string} word - The word to validate.
 * @param {string[]} wordList - The list of valid 5-letter words.
 * @returns {{ valid: true } | { valid: false, reason: string }}
 */
export function validateGuess(word, wordList) {
  if (word.length !== 5) {
    return { valid: false, reason: "Guess must be 5 letters" };
  }
  if (!/^[a-z]+$/.test(word)) {
    return { valid: false, reason: "Guess must only contain letters" };
  }
  if (!wordList.includes(word)) {
    return { valid: false, reason: "Not a recognised word" };
  }
  return { valid: true };
}
