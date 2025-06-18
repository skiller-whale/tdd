export default function guessForm() {
  return [
    "<form method='POST'>",
    `<input type="text" name="latestGuess" aria-label="guess" autofocus autocomplete="off" required>`,
    "</form>",
  ];
}
