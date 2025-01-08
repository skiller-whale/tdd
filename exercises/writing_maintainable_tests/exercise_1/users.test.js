import { expect, test } from "bun:test";
import { usersForTests } from "./test-utils.js";
import Router from "./router.js"; // pretend this exists
import MockDao from "./mock-dao.js"; // pretend this exists

test("get 0 users OK", async () => {
  const testUsers = []; // empty array of users
  const mockDao = new MockDao();
  mockDao.setUsers(testUsers);
  const router = new Router(mockDao);
  const response = await router.get("/users");
  expect(response.status).toBe(200); // OK
  expect(response.headers.get("Content-Type")).toBe("application/json");
  const payload = await response.json();
  expect(payload).toEqual({
    data: testUsers,
    total: 0,
    nextPage: null,
    previousPage: null,
  });
});

test("get 10 users OK", async () => {
  const testUsers = usersForTests.slice(0, 10); // array of 10 users
  const mockDao = new MockDao();
  mockDao.setUsers(testUsers);
  const router = new Router(mockDao);
  const response = await router.get("/users");
  expect(response.status).toBe(200); // OK
  expect(response.headers.get("Content-Type")).toBe("application/json");
  const payload = await response.json();
  expect(payload).toEqual({
    data: testUsers,
    total: 10,
    nextPage: null,
    previousPage: null,
  });
});

test("get 20 users OK", async () => {
  const testUsers = usersForTests.slice(0, 20); // array of 20 users
  const mockDao = new MockDao();
  mockDao.setUsers(testUsers);
  const router = new Router(mockDao);
  const response = await router.get("/users");
  expect(response.status).toBe(200); // OK
  expect(response.headers.get("Content-Type")).toBe("application/json");
  const payload = await response.json();
  expect(payload).toEqual({
    data: testUsers.slice(0, 10),
    total: 20,
    nextPage: 2,
    previousPage: null,
  });
});
