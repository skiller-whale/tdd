import Client from "./client.js";
import { text } from "./response.js";

export default class Server {
  #server = null;
  #options = {};
  #routes = {};

  #addRoute(path, method, handler) {
    if (!this.#routes[path]) {
      this.#routes[path] = {};
    }
    this.#routes[path][method] = handler;
  }

  async #handleRequest(request) {
    try {
      const { pathname } = new URL(request.url);
      const method = request.method;
      const route = this.#routes[pathname]?.[method];
      return route
        ? route({ ...this.#options, request })
        : text("Not Found", 404);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return text("Internal Server Error", 500);
    }
  }

  start(options) {
    if (this.#server) {
      this.#server.stop();
    }
    this.#options = options;
    this.#server = Bun.serve({
      port: this.#options.port ?? 0,
      fetch: (request) => this.#handleRequest(request),
    });
  }

  get baseUrl() {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return this.#server.url;
  }

  get client() {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return new Client(this.#server.url);
  }

  get(path, handler) {
    this.#addRoute(path, "GET", handler);
  }

  post(path, handler) {
    this.#addRoute(path, "POST", handler);
  }
}
