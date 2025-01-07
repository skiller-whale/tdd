import { describe, expect, test } from "bun:test";
import { testAuthToken, testUsers } from "./test-utils.js";

describe("GET /users", () => {
  test("OK", async () => {
    const response = await fetch("/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${testAuthToken}` },
    });
    expect(response.status).toBe(200); // OK
  });

  test("bad token", async () => {
    const response = await fetch("/users", {
      method: "GET",
      headers: { Authorization: "Bearer XXX" },
    });
    expect(response.status).toBe(401); // Unauthorized
  });
});

describe("POST /users", () => {
  test("OK", async () => {
    const newUserOK = {
      /** pretend there's valid user data in here */
    };
    const response = await fetch("/users", {
      method: "POST",
      headers: { Authorization: `Bearer ${testAuthToken}` },
      body: JSON.stringify(newUserOK),
    });
    expect(response.status).toBe(201); // Created
  });

  test("bad data", async () => {
    const newUserBad = {
      /** pretend there's invalid user data in here, e.g. missing fields */
    };
    const response = await fetch("/users", {
      method: "POST",
      headers: { Authorization: `Bearer ${testAuthToken}` },
      body: JSON.stringify(newUserBad),
    });
    expect(response.status).toBe(422); // Unprocessable Content
  });

  test("bad token", async () => {
    const response = await fetch("/users", {
      method: "POST",
      headers: { Authorization: "Bearer XXX" },
    });
    expect(response.status).toBe(401); // Unauthorized
  });
});

describe("GET /users/:id", () => {
  test("OK", async () => {
    const response = await fetch(`/users/${testUsers[0].id}`, {
      headers: { Authorization: `Bearer ${testAuthToken}` },
    });
    expect(response.status).toBe(200); // OK
  });

  test("bad ID", async () => {
    const response = await fetch("/users/XXX", {
      headers: { Authorization: `Bearer ${testAuthToken}` },
    });
    expect(response.status).toBe(404); // Not Found
  });

  test("bad token", async () => {
    const response = await fetch(`/users/${testUsers[0].id}`, {
      method: "POST",
      headers: { Authorization: "Bearer XXX" },
    });
    expect(response.status).toBe(401); // Unauthorized
  });
});

describe("DELETE /users/:id", () => {
  test("OK", async () => {
    const response = await fetch(`/users/${testUsers[0].id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${testAuthToken}` },
    });
    expect(response.status).toBe(204); // No Content
  });

  test("bad ID", async () => {
    const response = await fetch("/users/XXX", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${testAuthToken}` },
    });
    expect(response.status).toBe(404); // Not Found
  });

  test("bad token", async () => {
    const response = await fetch(`/users/${testUsers[0].id}`, {
      method: "POST",
      headers: { Authorization: "Bearer XXX" },
    });
    expect(response.status).toBe(401); // Unauthorized
  });
});
