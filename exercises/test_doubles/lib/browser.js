import { chromium } from "playwright";

export default class Browser {
  #baseUrl;
  #options = { timeout: 500 };
  #page = chromium
    .launch({ headless: process.env.SHOW_BROWSER !== "true" })
    .then((browser) => browser.newContext())
    .then((context) => context.newPage());

  #getFullUrl(url) {
    return new URL(url, this.#baseUrl).toString();
  }

  constructor(baseUrl) {
    this.#baseUrl = new URL(baseUrl);
  }

  setTimeout(timeout) {
    this.#options.timeout = timeout;
  }

  async visit(url) {
    const page = await this.#page;
    await page.goto(this.#getFullUrl(url), this.#options);
  }

  async isNewGameButtonVisible() {
    const page = await this.#page;
    const button = page.getByRole("button", { name: "New Game" });
    return await button.isVisible();
  }

  async clickNewGameButton() {
    const page = await this.#page;
    const button = page.getByRole("button", { name: "New Game" });
    if (!(await button.isVisible())) {
      throw new Error("New Game button not found in page");
    }
    await button.click();
  }

  async enterGuess(guess) {
    const page = await this.#page;
    const input = page.getByLabel("guess");
    if (!(await input.isVisible())) {
      throw new Error("Guess input not found in page");
    }
    await input.fill(guess);
    await input.press("Enter");
  }

  async getStatus() {
    const page = await this.#page;
    const statusElement = await page.$(".status");
    if (!statusElement) {
      throw new Error("Status element not found in page");
    }
    return (await statusElement.innerText()).trim();
  }

  async getError() {
    const page = await this.#page;
    const errorElement = await page.$(".error");
    if (!errorElement) {
      throw new Error("Error element not found in page");
    }
    return (await errorElement.innerText()).trim();
  }

  async getCorrectAnswer() {
    const page = await this.#page;
    const correctAnswerElement = await page.$(".correct-answer");
    if (!correctAnswerElement) {
      throw new Error("Correct answer element not found in page");
    }
    return (await correctAnswerElement.innerText()).trim();
  }

  async getGuess(index) {
    const page = await this.#page;
    const guessElement = await page.$(`.guess:nth-child(${index + 1})`);
    if (!guessElement) {
      throw new Error(`Guess element ${index} not found in page`);
    }
    const innerText = (await guessElement.innerText())
      .replaceAll(/\n/g, "")
      .trim();
    return innerText;
  }

  async getGuessCharClass(guessIndex, charIndex) {
    const page = await this.#page;
    const guessElement = await page.$(`.guess:nth-child(${guessIndex + 1})`);
    if (!guessElement) {
      throw new Error(`Guess element ${guessIndex} not found in page`);
    }
    const squareElement = await guessElement.$(
      `span:nth-child(${charIndex + 1})`
    );
    if (!squareElement) {
      throw new Error(
        `Character element ${charIndex} in guess ${guessIndex} not found in page`
      );
    }
    return (await squareElement.getAttribute("class")) ?? "";
  }

  async getStats() {
    const page = await this.#page;
    const statsElement = await page.$(".stats");
    if (!statsElement) {
      throw new Error("Stats element not found in page");
    }
    return (await statsElement.innerText()).trim();
  }
}
