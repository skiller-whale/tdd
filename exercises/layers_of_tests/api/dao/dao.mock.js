let games;

export const initialiseDB = async () => {
  games = [];
};

export const reset = async () => {
  games = [];
};

// exercise 1 - implement/uncomment `createGame`
export const createGame = async (game) => {
  game.id = crypto.randomUUID();
  games = [...games, game];
  return game;
};

// exercise 5 - implement/uncomment `getGame` and `updateGame`
export const getGame = async (id) => {
  return games.find((game) => game.id === id);
};

export const updateGame = async (game) => {
  games = games.map((g) => g.id === game.id ? game : g);
};
