// exported functions
export const initialiseDB = async () => {
  const query = "CREATE TABLE IF NOT EXISTS games (id VARCHAR(36), json VARCHAR(1000))";
  await run(query);
};

export const reset = async () => {
  const query = "DELETE FROM games";
  await run(query);
};

export const createGame = async (game) => {
  // const id = crypto.randomUUID();
  // const query = "INSERT INTO games (id, json) VALUES ($id, $json)";
  // const parameters = { $id: id, $json: JSON.stringify(game) };
  // await run(query, parameters);
  // return { ...game, id };
};

export const getGame = async (id) => {
  // const query = "SELECT * FROM games WHERE id=$id";
  // const parameters = { $id: id };
  // const result = await get(query, parameters);
  // return result ? { id: result.id, ...JSON.parse(result.json) } : undefined;
};

export const updateGame = async (game) => {
  // const { id, ...properties } = game;
  // const query = "UPDATE games SET json = $json WHERE id = $id";
  // const parameters = { $id: id, $json: JSON.stringify(properties) };
  // await run(query, parameters);
};

// helper functions
const dbURL = "http://localhost:8081";

const run = async (query, parameters) => {
  const response = await fetch(`${dbURL}/run`, {
    method: "POST",
    body: JSON.stringify({ query, parameters }),
  });
  const result = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
};

const get = async (query, parameters) => {
  const response = await fetch(`${dbURL}/get`, {
    method: "POST",
    body: JSON.stringify({ query, parameters }),
  });
  const result = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};
