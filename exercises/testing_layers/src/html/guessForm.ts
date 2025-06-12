export default function guessForm(errorMessage?: string) {
  return [
    "<form method='POST'>",
    `<input type="text" name="latestGuess" aria-label="guess" autofocus autocomplete="off" required>`,
    errorMessage ? `<p class="error">${errorMessage}</p>` : "",
    "</form>",
  ];
}
