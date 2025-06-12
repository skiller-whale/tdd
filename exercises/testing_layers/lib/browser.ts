import { chromium } from "playwright";

export class Browser {
  #baseUrl: URL;
  #options = { timeout: 500 };
  #page = chromium
    .launch({ headless: process.env.SHOW_BROWSER !== "true" })
    .then((browser) => browser.newContext())
    .then((context) => context.newPage());

  #getFullUrl(url: string) {
    return new URL(url, this.#baseUrl).toString();
  }

  constructor(baseUrl: string | URL) {
    this.#baseUrl = new URL(baseUrl);
  }

  setTimeout(timeout: number): void {
    this.#options.timeout = timeout;
  }

  async visit(url: string): Promise<void> {
    const page = await this.#page;
    await page.goto(this.#getFullUrl(url), this.#options);
  }

  async enterGuess(guess: string): Promise<void> {
    const page = await this.#page;
    const input = page.getByLabel("guess");
    await input.fill(guess);
    await input.press("Enter");
  }

  async getStatus(): Promise<string> {
    const page = await this.#page;
    const statusElement = await page.$(".status");
    if (!statusElement) {
      throw new Error("Status element not found in page");
    }
    return (await statusElement.innerText()).trim();
  }

  async getError(): Promise<string> {
    const page = await this.#page;
    const errorElement = await page.$(".error");
    if (!errorElement) {
      throw new Error("Error element not found in page");
    }
    return (await errorElement.innerText()).trim();
  }

  async getCorrectAnswer(): Promise<string> {
    const page = await this.#page;
    const correctAnswerElement = await page.$(".correct-answer");
    if (!correctAnswerElement) {
      throw new Error("Correct answer element not found in page");
    }
    return (await correctAnswerElement.innerText()).trim();
  }

  async getGuess(index: 0 | 1 | 2 | 3 | 4 | 5): Promise<string> {
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

  async getGuessCharClassList(
    guessIndex: 0 | 1 | 2 | 3 | 4 | 5,
    charIndex: 0 | 1 | 2 | 3 | 4
  ): Promise<string> {
    const page = await this.#page;
    const guessElement = await page.$(`.guess:nth-child(${guessIndex + 1})`);
    if (!guessElement) {
      throw new Error(`Guess element ${guessIndex} not found in page`);
    }
    const squareElement = await guessElement.$(
      `.char:nth-child(${charIndex + 1})`
    );
    if (!squareElement) {
      throw new Error(
        `Character element ${charIndex} in guess ${guessIndex} not found in page`
      );
    }
    return (await squareElement.getAttribute("class")) ?? "";
  }
}
