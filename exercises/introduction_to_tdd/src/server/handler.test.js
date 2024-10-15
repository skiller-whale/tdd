import { expect, describe, test } from "bun:test";
import handler from "./handler.js";

describe("Server", () => {
  test("`/` works", async () => {
    const request1 = new Request("http://localhost:3000/");
    const response1 = await handler(request1);
    expect(response1.status).toBe(200);
    expect(response1.headers.get("Content-Type")).toBe("text/html");

    const request2 = new Request("http://localhost:3000/index.html");
    const response2 = await handler(request2);
    expect(response2).toEqual(response1);
  });

  test("`/screen.css` works", async () => {
    const request = new Request("http://localhost:3000/screen.css");
    const response = await handler(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/css");
  });

  test("`/app.js` works", async () => {
    const request = new Request("http://localhost:3000/app.js");
    const response = await handler(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/javascript");
  });
});
