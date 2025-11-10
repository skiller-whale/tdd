export default class Router {
  constructor(dao) {
    this.dao = dao;
  }

  async get(path) {
    if (path === "/users") {
      const [users, total] = this.dao.getUsers();
      return Response.json({
        data: users,
        previousPage: null,
        nextPage: total > 10 ? 2 : null,
        total,
      });
    }

    return new Response("Not Found", { status: 404 });
  }
}