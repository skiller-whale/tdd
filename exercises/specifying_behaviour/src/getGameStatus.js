/**
 * Returns the current status of a Wordle game.
 *
 * @param {string[]} guesses - The guesses made so far (lowercase 5-letter words).
 * @param {string} target - The target word (lowercase 5-letter word).
 * @returns {"won" | "lost" | "in_progress"}
 */
export function getGameStatus(guesses, target) {
  if (guesses.at(-1) === target) return "won";
  if (guesses.length >= 6) return "lost";
  return "in_progress";
}
