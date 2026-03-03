/**
 * Computes aggregate player statistics from arrays of GameResult objects.
 *
 * PlayerStats shape:
 * {
 *   gamesPlayed:      number,
 *   gamesWon:         number,
 *   winRate:          number,   // 0-1
 *   averageAttempts:  number,   // mean attempts for wins only
 * }
 */
export function calculatePlayerStats(gameResults) {
  if (gameResults.length === 0) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      winRate: 0,
      averageAttempts: 0,
    }
  }

  const gamesPlayed = gameResults.length;
  const gamesWon = gameResults.filter(isGameWon).length;
  const winRate = gamesWon / gamesPlayed;
  const averageAttempts = calculateAverageAttempts(gameResults);
  return {
    gamesPlayed,
    gamesWon,
    winRate,
    averageAttempts,
  };
}

/**
 * Calculates the average number of attempts for winning games only.
 * Returns 0 if there are no wins.
 */
function calculateAverageAttempts(gameResults) {
  const winningGames = gameResults.filter(isGameWon);
  if (winningGames.length === 0) {
    return 0;
  }
  const totalAttempts = winningGames.reduce(
    (sum, r) => sum + r.guesses.length,
    0,
  );
  return totalAttempts / winningGames.length;
}

/**
 * Determines whether a game is won or lost based on the guesses and answer.
 */
function isGameWon(gameResult) {
  return gameResult.guesses.at(-1) === gameResult.answer;
}
