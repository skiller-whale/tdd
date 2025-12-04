export default function StatusMessage({ status }) {
  switch (status) {
    case "playing":
      return <></>;

    case "won":
      return <p className="status">You won!</p>;

    case "lost":
      return (
        <>
          <p className="status">You lost!</p>
          <p>The correct answer was</p>
          <p className="correct-answer">WHALE</p>
        </>
      );
  }
}
