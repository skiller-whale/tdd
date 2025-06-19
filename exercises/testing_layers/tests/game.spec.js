import { describe, expect, it } from "bun:test";
import Browser from "../lib/browser.js";
import server from "../src/server.js";

describe("game UI", () => {
  it("shows success when the correct answer is guessed first time", async () => {
    // arrange
    server.start({ port: 0 });
    const browser = new Browser(server.baseUrl);
    await browser.visit("/");

    // act
    await browser.enterGuess("whale");

    // assert
    expect(await browser.getStatus()).toBe("You won!");
  });

  it("shows failure and the correct answer when the game is lost", async () => {
    // arrange
    server.start({ port: 0 });
    const browser = new Browser(server.baseUrl);
    await browser.visit("/");

    // act
    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    // assert
    expect(await browser.getStatus()).toBe("You lost!");
    expect(await browser.getCorrectAnswer()).toBe("WHALE");
  });

  it("shows the previous guesses in the game", async () => {
    // arrange
    server.start({ port: 0 });
    const browser = new Browser(server.baseUrl);
    await browser.visit("/");

    // act
    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    // assert
    expect(await browser.getGuess(0)).toBe("FISHY");
    expect(await browser.getGuess(1)).toBe("SHARK");
    expect(await browser.getGuess(2)).toBe("SHELL");
    expect(await browser.getGuess(3)).toBe("TROUT");
    expect(await browser.getGuess(4)).toBe("SALTY");
    expect(await browser.getGuess(5)).toBe("OCEAN");
  });

  it.todo("shows error message for invalid guesses", async () => {
    // arrange
    server.start({ port: 0 });
    const browser = new Browser(server.baseUrl);
    await browser.visit("/");

    // act

    // assert
    // NOTE: you can use `await browser.getError()` to get the text content of
    // the first element on the page with the class "error"
  });

  it.todo("shows colour-coded feedback for previous guesses", async () => {
    // arrange
    server.start({ port: 0 });
    const browser = new Browser(server.baseUrl);
    await browser.visit("/");

    // act
    // a useful guess to try here would be "water", which should be reported as:
    //   - green for the first character (W)
    //   - yellow for the second character (A)
    //   - gray for the third character (T)
    //   - yellow for the fourth character (E)
    //   - gray for the fifth character (R)

    // assert
    // NOTE: you can use `await browser.getGuessCharClass(n, m)` to get the class
    // of the mth character of the nth guess - and then check this is either
    // "green", "yellow", or "gray" (as appropriate)
  });
});
