export default function gameStatus(guesses) {
  return guesses.at(-1) === "whale"
    ? "won"
    : guesses.length >= 6
    ? "lost"
    : "playing";
}
