import { chromium } from "playwright";

const timeout = { timeout: 500 };

export default async function setupBrowser(baseUrl: URL) {
  const page = await chromium
    .launch({ headless: process.env.SHOW_BROWSER !== "true" })
    .then((browser) => browser.newContext())
    .then((context) => context.newPage());

  function getFullUrl(url: string) {
    return new URL(url, baseUrl).toString();
  }

  return {
    visit: async (url: string) => {
      await page.goto(getFullUrl(url), timeout);
    },

    enterAnswer: async (answer: string) => {
      const input = page.getByLabel("answer");
      await input.fill(answer);
      await input.press("Enter");
    },

    enterGuess: async (guess: string) => {
      const input = page.getByLabel("guess");
      await input.fill(guess);
      await input.press("Enter");
    },

    getStatusElement: async () => {
      const statusElementHandle = await page.$(".status");
      if (!statusElementHandle) {
        throw new Error("Status element not found in page");
      }
      return {
        innerText: (await statusElementHandle.innerText()).trim(),
      };
    },

    getErrorElement: async () => {
      const errorElementHandle = await page.$(".error");
      if (!errorElementHandle) {
        throw new Error("Error element not found in page");
      }
      return {
        innerText: (await errorElementHandle.innerText()).trim(),
      };
    },

    getCorrectAnswerElement: async () => {
      const correctAnswerElementHandle = await page.$(".correct-answer");
      if (!correctAnswerElementHandle) {
        throw new Error("Correct answer element not found in page");
      }
      return {
        innerText: (await correctAnswerElementHandle.innerText()).trim(),
      };
    },

    getGuessElements: async () => {
      const guessElementHandles = await page.$$(".guess");
      if (!guessElementHandles || guessElementHandles.length === 0) {
        throw new Error("No previous guess elements found in page");
      }

      return await Promise.all(
        guessElementHandles.map(async (handle) => {
          const innerText = (await handle.innerText())
            .replaceAll(/\n/g, "")
            .trim();
          const squareElementHandles = await handle.$$(".char");
          if (!squareElementHandles || squareElementHandles.length === 0) {
            throw new Error("No square elements found in guess element");
          }
          const innerSquares = await Promise.all(
            squareElementHandles.map(async (square) => {
              const innerText = (await square.innerText()).trim();
              const classList = await square.getAttribute("class") ?? "";
              return { innerText, classList };
            })
          );

          return { innerText, innerSquares };
        })
      );
    },
  };
}
