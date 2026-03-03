/**
 * GameResult represents a single completed Wordle game.
 *
 * Shape:
 * {
 *   playerName: string,   // display name (also used as identifier)
 *   answer:     string,   // the 5-letter target word (lowercase)
 *   guesses:    string[], // each guess (lowercase, 5 letters)
 *   date:       string,   // ISO date string, e.g. "2026-02-18"
 * }
 */

/**
 * Validates that a value is a well-formed GameResult.
 *
 * A valid GameResult must have:
 * - a non-empty string `playerName`
 * - a 5-letter lowercase alphabetic `answer`
 * - `guesses` as a non-empty array of 5-letter lowercase alphabetic strings
 * - `date` as a string matching YYYY-MM-DD
 * - the game must be in a completed state (won or lost, i.e. last guess
 *   matches answer or there are 6 guesses)
 *
 * Returns { valid: true } or { valid: false, reason: "..." }.
 */
export function validateGameResult(result) {
  if (result === null || Array.isArray(result) || typeof result !== "object") {
    return { valid: false, reason: "Result must be an object" };
  }

  if (typeof result.playerName !== "string" || result.playerName.length === 0) {
    return { valid: false, reason: "playerName must be a non-empty string" };
  }

  if (typeof result.answer !== "string" || !/^[a-z]{5}$/.test(result.answer)) {
    return { valid: false, reason: "answer must be a 5-letter lowercase word" };
  }

  if (!Array.isArray(result.guesses) || result.guesses.length === 0) {
    return { valid: false, reason: "guesses must be a non-empty array" };
  }

  for (const guess of result.guesses) {
    if (typeof guess !== "string" || !/^[a-z]{5}$/.test(guess)) {
      return {
        valid: false,
        reason: "Each guess must be a 5-letter lowercase word",
      };
    }
  }

  if (
    typeof result.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(result.date)
  ) {
    return { valid: false, reason: "date must be a YYYY-MM-DD string" };
  }

  if (result.guesses.at(-1) !== result.answer && result.guesses.length < 6) {
    return {
      valid: false,
      reason: "Game must be in a completed state (won or lost)",
    };
  }

  return { valid: true };
}

/**
 * Returns a one-line summary of a game result.
 *
 * Format: "PlayerName: ANSWER n/6 ✓" (for wins)
 *     or: "PlayerName: ANSWER X/6 ✗" (for losses)
 *
 * The answer is displayed in uppercase.
 */
export function summarizeGame(result) {
  const answer = result.answer.toUpperCase();
  const status = result.guesses.at(-1) === result.answer ? "✓" : "✗";
  const attempts = status === "✓" ? result.guesses.length : "X";
  return `${result.playerName}: ${answer} ${attempts}/6 ${status}`;
}
