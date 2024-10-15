import { describe, expect, test } from "bun:test";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Wordle from "./Wordle.jsx";

const testSetup = (answer) => {
  const user = userEvent.setup();
  render(<Wordle answer={answer} />);

  const answersTable = screen.getByRole("table");
  const rows = within(answersTable).getAllByRole("row");
  const guessInput = screen.getByRole("textbox", { name: "Guess" });
  const guessButton = screen.getByRole("button", { name: "Submit Guess" });

  const makeGuess = async (guess) => {
    await user.clear(guessInput);
    await user.type(guessInput, guess);
    await user.click(guessButton);
  };

  return { rows, guessInput, guessButton, makeGuess };
};

describe("Wordle component", () => {
  test("component initialises correctly", () => {
    const { rows, guessInput, guessButton } = testSetup();
    expect(rows.length).toBe(6);
    expect(guessInput).toBeInTheDocument();
    expect(guessButton).toBeInTheDocument();
  });

  test("guess input works", async () => {
    const { rows, makeGuess } = testSetup();
    await makeGuess("abuzz");
    expect(rows[0]).toHaveTextContent("abuzz");
  });

  // unskip this test when instructed
  test.skip("guess output displays correctly", async () => {
    const answer = "abate";
    const { rows, makeGuess } = testSetup(answer);
    await makeGuess("afoot");
    const columns = within(rows[0]).getAllByRole("cell");
    expect(columns[0].style.background).toBe("green");
    expect(columns[1].style.background).toBe("gray");
    expect(columns[2].style.background).toBe("gray");
    expect(columns[3].style.background).toBe("gray");
    expect(columns[4].style.background).toBe("orange");
  });
});
