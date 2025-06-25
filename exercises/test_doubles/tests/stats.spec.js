import { describe, expect, it } from "bun:test";
import Browser from "../lib/browser.js";
import * as database from "../src/database.mock.js";
import server from "../src/server.js";

async function winGame(browser) {
  await browser.visit("/");
  await browser.clickNewGameButton();
  await browser.enterGuess("whale");
}

async function loseGame(browser) {
  await browser.visit("/");
  await browser.clickNewGameButton();
  await browser.enterGuess("fishy");
  await browser.enterGuess("shark");
  await browser.enterGuess("shell");
  await browser.enterGuess("trout");
  await browser.enterGuess("salty");
  await browser.enterGuess("ocean");
}

describe("game UI stats", () => {
  it("shows stats at the end of the game (games won, lost, and total played)", async () => {
    // arrange
    await database.initialize();
    server.start({ port: 0, database });
    const browser = new Browser(server.baseUrl);

    // act
    // TODO: win and lose some number of games

    // assert
    // TODO: check the stats
    // you can use `await browser.getStats()` to get the innerHTML of the element with a class of `stats`
  });
});
