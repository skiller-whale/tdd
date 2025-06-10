type NewGamePageProps = {
  errorMessage?: string;
};

export default function newGame({ errorMessage }: NewGamePageProps) {
  return [
    "<p>Welcome to Skiller Wordle!</p>",
    "<p>To start a new game, enter the answer into the form below and press ENTER.</p>",
    '<form method="POST">',
    '<input type="text" aria-label="answer" name="answer" autofocus required>',
    errorMessage ? `<p class="error">${errorMessage}</p>` : "",
    "</form>",
  ];
}
