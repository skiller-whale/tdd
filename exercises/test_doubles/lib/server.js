import { CookieMap } from "bun";
import Client from "./client.js";
import { text } from "./response.js";

if (!globalThis.URLPattern) { 
  await import("urlpattern-polyfill");
}

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
      const url = new URL(request.url);
      const method = request.method;
      for (const pattern of Object.keys(this.#routes)) {
        const urlPattern = new URLPattern(pattern, url.origin);
        const urlPatternExecResult = urlPattern.exec(url);
        if (urlPatternExecResult) {
          const route = this.#routes[pattern][method];
          const params = urlPatternExecResult.pathname.groups;
          const cookies = new CookieMap(request.headers.get("Cookie") ?? "");
          return route
            ? route({ ...this.#options, request, params, cookies })
            : text("Method not Supported", { status: 405 });
        }
      }
      return text("Not Found", { status: 404 });
    } catch (error) {
      console.error("Internal Server Error:", error);
      return text("Internal Server Error", { status: 500 });
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
