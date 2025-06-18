export default function guessesFeedback(guesses) {
  const guessesForDisplay = [
    guesses[0] ?? "     ",
    guesses[1] ?? "     ",
    guesses[2] ?? "     ",
    guesses[3] ?? "     ",
    guesses[4] ?? "     ",
    guesses[5] ?? "     ",
  ];

  return [
    '<div class="guesses">',
    ...guessesForDisplay.flatMap(guessFeedback),
    "</div>",
  ];
}

function guessFeedback(guess) {
  return [
    '<div class="guess">',
    ...guess.split("").map(guessCharFeedback),
    "</div>",
  ];
}

function guessCharFeedback(char) {
  return `<span>${char}</span>`;
}
