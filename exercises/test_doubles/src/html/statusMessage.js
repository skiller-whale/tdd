export default function status(status) {
  switch (status) {
    case "playing":
      return [];

    case "won":
      return '<p class="status">You won!</p>';

    case "lost":
      return [
        '<p class="status">You lost!</p>',
        "<p>The correct answer was</p>",
        `<p class="correct-answer">WHALE</p>`,
      ];
  }
}
