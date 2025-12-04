export default function GuessForm({ error }) {
  return (
    <form method="POST">
      <input type="text" name="latestGuess" aria-label="guess" autoFocus autoComplete="off" required />
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}
