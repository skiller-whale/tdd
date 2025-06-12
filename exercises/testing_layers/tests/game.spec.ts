import { beforeAll, describe, expect, it } from "bun:test";
import { Browser } from "../lib/browser.ts";
import backend from "../src/backend.ts";
import frontend from "../src/frontend.ts";

describe("game UI", () => {
  let browser: Browser;
  beforeAll(() => {
    backend.start({ port: 0 });
    frontend.start({ port: 0, backend: backend.client });
    browser = new Browser(frontend.baseUrl);
  });

  it("shows success when the correct answer is guessed first time", async () => {
    await browser.visit("/");
    await browser.enterGuess("whale");
    expect(await browser.getStatus()).toBe("You won!");
  });

  it("shows the number of guesses remaining", async () => {
    await browser.visit("/");

    await browser.enterGuess("fishy");
    expect(await browser.getStatus()).toBe("You have 5 guesses left.");

    await browser.enterGuess("shark");
    expect(await browser.getStatus()).toBe("You have 4 guesses left.");

    await browser.enterGuess("shell");
    expect(await browser.getStatus()).toBe("You have 3 guesses left.");
  });

  it("shows failure and the correct answer when the game is lost", async () => {
    await browser.visit("/");

    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    expect(await browser.getStatus()).toBe("You lost!");
    expect(await browser.getCorrectAnswer()).toBe("WHALE");
  });

  it("shows the previous guesses in the game", async () => {
    await browser.visit("/");

    await browser.enterGuess("fishy");
    await browser.enterGuess("shark");
    await browser.enterGuess("shell");
    await browser.enterGuess("trout");
    await browser.enterGuess("salty");
    await browser.enterGuess("ocean");

    expect(await browser.getGuess(0)).toBe("FISHY");
    expect(await browser.getGuess(1)).toBe("SHARK");
    expect(await browser.getGuess(2)).toBe("SHELL");
    expect(await browser.getGuess(3)).toBe("TROUT");
    expect(await browser.getGuess(4)).toBe("SALTY");
    expect(await browser.getGuess(5)).toBe("OCEAN");
  });

  it.todo("shows colour-coded feedback for each guess", async () => {
    await browser.visit("/");

    // get the classList of nth character of the mth guess with:
    // await browser.getGuessCharClassList(m, n);
    // check this classList includes "green", "yellow", or "gray"
  });

  it.todo("rejects invalid guesses with an error message", async () => {
    await browser.visit("/");

    // get the error message on the page with:
    // await browser.getError()
  });
});
