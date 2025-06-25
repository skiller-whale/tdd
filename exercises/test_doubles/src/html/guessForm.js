export default function guessForm(error) {
  return [
    "<form method='POST'>",
    `<input type="text" name="latestGuess" aria-label="guess" autofocus autocomplete="off" required>`,
    error ? `<p class="error">${error}</p>` : "",
    "</form>",
  ];
}
