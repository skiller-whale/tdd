import { describe, expect, it } from "bun:test";
import setupServers from "./helpers/servers.ts";
import setupBrowser from "./helpers/browser.ts";

describe("new game UI", () => {
  it("creates a new game with the answer given", async () => {
    const server = setupServers();
    const browser = await setupBrowser(server.baseUrl);

    await browser.visit("/");
    await browser.enterAnswer("whale");
    await browser.enterGuess("whale");
    expect((await browser.getStatusElement()).innerText).toBe("You won!");
  });

  it.todo("shows an error message when the answer is invalid", async () => {
    // you can copy and paste the setup code from the other test above

    // await browser.getErrorElement()
    //   - returns the element with an "error" class (if it exists)
  });
});
