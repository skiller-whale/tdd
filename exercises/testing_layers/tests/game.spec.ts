import { describe, expect, it } from "bun:test";
import setupServers from "./helpers/servers.ts";
import setupBrowser from "./helpers/browser.ts";
import urlForGameWithAnswer from "./helpers/gameUrlForAnswer.ts";

describe("game UI", () => {
  it("shows success when the correct answer is guessed first time", async () => {
    const server = setupServers();
    const browser = await setupBrowser(server.baseUrl);
    await browser.visit(urlForGameWithAnswer("whale"));

    await browser.enterGuess("whale");
    expect((await browser.getStatusElement()).innerText).toBe("You won!");
  });

  it("shows the number of guesses remaining", async () => {
    const server = setupServers();
    const browser = await setupBrowser(server.baseUrl);
    await browser.visit(urlForGameWithAnswer("whale"));

    await browser.enterGuess("fishy");
    expect((await browser.getStatusElement()).innerText).toBe(
      "You have 5 guesses left."
    );

    await browser.enterGuess("shark");
    expect((await browser.getStatusElement()).innerText).toBe(
      "You have 4 guesses left."
    );

    await browser.enterGuess("shell");
    expect((await browser.getStatusElement()).innerText).toBe(
      "You have 3 guesses left."
    );
  });

  it("shows failure and the correct answer when the game is lost", async () => {
    const server = setupServers();
    const browser = await setupBrowser(server.baseUrl);

    await browser.visit(urlForGameWithAnswer("whale"));
    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    expect((await browser.getStatusElement()).innerText).toBe("You lost!");
    expect((await browser.getCorrectAnswerElement()).innerText).toBe("WHALE");
  });

  it("shows the previous guesses in the game", async () => {
    const server = setupServers();
    const browser = await setupBrowser(server.baseUrl);

    await browser.visit(urlForGameWithAnswer("whale"));
    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    const guessElements = await browser.getGuessElements();
    expect(guessElements[0].innerText).toBe("FISHY");
    expect(guessElements[1].innerText).toBe("SHARK");
    expect(guessElements[2].innerText).toBe("SHELL");
    expect(guessElements[3].innerText).toBe("TROUT");
    expect(guessElements[4].innerText).toBe("SALTY");
    expect(guessElements[5].innerText).toBe("OCEAN");
  });

  it.todo("shows evaluations for each guess", async () => {
    // you can copy and paste the setup code from the other tests above

    // await browser.getGuessElements()
    //   - returns an array of guess elements (one for each guess)

    // guessElements[0].innerText
    //   - the text of the first guess element (i.e. should be the word guessed)

    // guessElements[0].innerSquares
    //   - an array of square elements for the first guess (one for each letter)

    // guessElements[0].innerSquares[0].classList
    //   - the classList of the first square element (you can check if classList.includes("green") or similar)
  });

  it.todo("shows an error message when the guess is invalid", async () => {
    // you can copy and paste the setup code from the other tests above

    // await browser.getErrorElement()
    //   - returns the element with an "error" class (if it exists)
  });
});
