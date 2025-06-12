import type { GameState } from "../core/gameState";

export default function status(guesses: string[], gameState: GameState) {
  switch (gameState.status) {
    case "playing": {
      const remainingGuesses = 6 - guesses.length;
      return `<p class="status">You have ${remainingGuesses} ${
        remainingGuesses === 1 ? "guess" : "guesses"
      } left.</p>`;
    }

    case "won":
      return '<p class="status">You won!</p>';

    case "lost":
      return '<p class="status">You lost!</p>';
  }
}
