import type { GameState } from "../core/gameState";

export default function answer(gameState: GameState) {
  return [
    "<p>The correct answer was</p>",
    `<p class="correct-answer">${gameState.correctAnswer}</p>`,
  ];
}
