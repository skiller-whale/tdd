import { describe, it, expect } from "bun:test";
import server from "./server.js";

describe("server", () => {
  it("`GET /` returns some HTML", async () => {
    // arrange
    server.start({ port: 0 });
    const client = server.client;

    // act
    const { response, body } = await client.get("/");

    // assert
    // NOTE: this is a very basic test with minimal assertions
    // testing that the HTML is interactive in the right way is done higher up, in `tests/game.spec.js`
    expect(body).toInclude("<h1>Skiller Wordle</h1>");
    expect(response.status).toBe(200);
  });

  it("`POST /` with valid guess in formData redirects with guess added to the URL", async () => {
    // arrange
    server.start({ port: 0 });
    const client = server.client;

    // act
    const formData = new FormData();
    formData.append("latestGuess", "whale");
    const params = new URLSearchParams({ guesses: ["fishy", "shark"] });
    const { response } = await client.post(`/?${params.toString()}`, formData);

    // assert
    const url = new URL(response.url);
    expect(url.searchParams.get("guesses")).toBe("fishy,shark,whale");
    expect(response.redirected).toBe(true);
  });

  it.todo(
    "`POST /` with invalid guess in formData redirects with guess _not_ added to the URL",
    async () => {
      // arrange
      server.start({ port: 0 });
      const client = server.client;

      // act

      // assert
    }
  );

  it.todo(
    "`POST /` with invalid guess in formData redirects with error message added to the URL",
    async () => {
      // arrange
      server.start({ port: 0 });
      const client = server.client;

      // act

      // assert
    }
  );
});
