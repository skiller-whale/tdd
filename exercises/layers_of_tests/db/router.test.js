import { afterAll, afterEach, beforeAll, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import router from "./router.js";

// setup
const db = new Database(":memory:");
beforeAll(() => {
  const query = db.query("CREATE TABLE tests (column VARCHAR(5))");
  query.run();
});
afterEach(() => {
  const query = db.query("DELETE FROM tests");
  query.run();
})
afterAll(() => {
  const query = db.query("DROP TABLE tests");
  query.run();
});

// tests
test("POST `/run` runs a query and returns null", async () => {
  const query = "INSERT INTO tests (column) VALUES ($column)";
  const parameters = { $column: "hello" };
  const { response, payload } = await run(query, parameters);
  expect(response.status).toBe(200);
  expect(payload).toEqual({ data: null });
});

test("POST `/get` runs a query and returns the first result", async () => {
  // insert some data
  const query1 = "INSERT INTO tests (column) VALUES ($column)";
  const parameters1 = { $column: "hello" };
  await run(query1, parameters1);

  // check that getting it back works
  const query2 = "SELECT * FROM tests WHERE column = $column";
  const parameters2 = { $column: "hello" };
  const { response, payload } = await get(query2, parameters2);
  expect(response.status).toBe(200);
  expect(payload).toEqual({ data: { column: "hello" } });
});

// helper functions
const run = async (query, parameters) => {
  const request = new Request("http://domain/run", {
    method: "POST",
    body: JSON.stringify({ query, parameters }),
  });
  const response = await router(db, request);
  const payload = await response.json();
  return { response, payload };
};

const get = async (query, parameters) => {
  const request = new Request("http://domain/get", {
    method: "POST",
    body: JSON.stringify({ query, parameters }),
  });
  const response = await router(db, request);
  const payload = await response.json();
  return { response, payload };
};
