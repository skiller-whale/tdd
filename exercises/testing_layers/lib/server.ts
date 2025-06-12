import { Client, JsonClient } from "./client.ts";
import { json, text } from "./response.ts";
import type {
  BaseOptions,
  Endpoint,
  JsonRequestHandler,
  Method,
  RequestHandler,
} from "./types.ts";

export class Server<Options extends BaseOptions = BaseOptions> {
  #server: Bun.Server | null = null;
  #options: Options = {} as Options;
  #routes: Record<string, Partial<Record<Method, RequestHandler<Options>>>> =
    {};

  #addRoute(path: string, method: Method, handler: RequestHandler<Options>) {
    if (!this.#routes[path]) {
      this.#routes[path] = {};
    }
    this.#routes[path][method] = handler;
  }

  async #handleRequest(request: Request): Promise<Response> {
    try {
      const { pathname } = new URL(request.url);
      const method = request.method as Method;
      const route = this.#routes[pathname]?.[method];
      return route
        ? route({ ...this.#options, request })
        : text("Not Found", 404);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return text("Internal Server Error", 500);
    }
  }

  start(options: Options): void {
    if (this.#server) {
      this.#server.stop();
    }
    this.#options = options;
    this.#server = Bun.serve({
      port: this.#options.port ?? 0,
      fetch: (request) => this.#handleRequest(request),
    });
  }

  get baseUrl(): URL {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return this.#server.url;
  }

  get client(): Client {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return new Client(this.#server.url);
  }

  get(path: string, handler: RequestHandler<Options>) {
    this.#addRoute(path, "GET", handler);
  }

  post(path: string, handler: RequestHandler<Options>) {
    this.#addRoute(path, "POST", handler);
  }
}

export class JsonServer<
  Options extends BaseOptions = BaseOptions,
  Endpoints extends Record<string, Endpoint> = {}
> {
  #server: Bun.Server | null = null;
  #options: Options = {} as Options;
  #routes: Record<
    string,
    Partial<Record<Method, JsonRequestHandler<Options>>>
  > = {};

  #addRoute<Path extends string, Method extends keyof Endpoints[Path]>(
    path: Path,
    method: Method,
    handler: JsonRequestHandler<
      Options,
      Endpoints[Path][Method] extends { accepts: infer Accepts }
        ? Accepts
        : unknown,
      Endpoints[Path][Method] extends { result: infer Result }
        ? Result
        : unknown
    >
  ) {
    if (!this.#routes[path]) {
      this.#routes[path] = {};
    }
    // @ts-ignore
    this.#routes[path][method] = handler;
  }

  async #handleRequest(request: Request): Promise<Response> {
    try {
      const { pathname } = new URL(request.url);
      const method = request.method as Method;
      const route = this.#routes[pathname]?.[method];

      if (route) {
        const payload = await request.json().catch(() => ({}));
        const data = await route({ ...this.#options, request, payload });
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      }
      return json({ error: "Not Found" }, 404);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return json({ error: "Internal Server Error" }, 500);
    }
  }

  start(options: Options): void {
    if (this.#server) {
      this.#server.stop();
    }
    this.#options = options;
    this.#server = Bun.serve({
      port: this.#options.port ?? 0,
      fetch: (request) => this.#handleRequest(request),
    });
  }

  get baseUrl(): URL {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return this.#server.url;
  }

  get client(): JsonClient<Endpoints> {
    if (!this.#server) {
      throw new Error("Server is not running. Call start() first.");
    }
    return new JsonClient<Endpoints>(this.#server.url);
  }

  get<Path extends string>(
    path: Path,
    handler: JsonRequestHandler<
      Options,
      Endpoints[Path]["GET"] extends { accepts: infer Accepts }
        ? Accepts
        : unknown,
      Endpoints[Path]["GET"] extends { result: infer Result } ? Result : unknown
    >
  ) {
    this.#addRoute(path, "GET", handler);
  }

  post<Path extends string>(
    path: Path,
    handler: JsonRequestHandler<
      Options,
      Endpoints[Path]["POST"] extends { accepts: infer Accepts }
        ? Accepts
        : unknown,
      Endpoints[Path]["POST"] extends { result: infer Result }
        ? Result
        : unknown
    >
  ) {
    this.#addRoute(path, "POST", handler);
  }
}
