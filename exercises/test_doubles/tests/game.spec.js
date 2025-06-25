import { describe, expect, it } from "bun:test";
import Browser from "../lib/browser.js";
import * as database from "../src/database.js";
import server from "../src/server.js";

describe("game UI", () => {
  it("shows success when the correct answer is guessed first time", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
    await browser.enterGuess("whale");

    // assert
    expect(await browser.getStatus()).toBe("You won!");
  });

  it("shows failure and the correct answer when the game is lost", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
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

  it("shows new game button when the game is over", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
    await browser.enterGuess("whale");

    // assert
    expect(await browser.isNewGameButtonVisible()).toBe(true);
  });

  it("shows the previous guesses in the game", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
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

  it("shows error message for invalid guesses", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
    await browser.enterGuess("abcde");

    // assert
    expect(await browser.getError()).toBe("Guess is not in the dictionary.");
  });

  it("shows colour-coded feedback for previous guesses", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    await browser.visit("/");
    await browser.clickNewGameButton();
    await browser.enterGuess("water");

    // assert
    expect(await browser.getGuessCharClass(0, 0)).toBe("green");
    expect(await browser.getGuessCharClass(0, 1)).toBe("yellow");
    expect(await browser.getGuessCharClass(0, 2)).toBe("gray");
    expect(await browser.getGuessCharClass(0, 3)).toBe("yellow");
    expect(await browser.getGuessCharClass(0, 4)).toBe("gray");
  });
});
