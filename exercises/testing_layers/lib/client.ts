import type { Endpoint, FetchResult } from "./types.js";

export class Client {
  #baseUrl: URL;

  async #fetch(path: string, init?: RequestInit) {
    const url = new URL(path, this.#baseUrl);
    const response = await fetch(url, init);
    const body = response.headers
      .get("Content-Type")
      ?.includes("application/json")
      ? await response.json()
      : await response.text();
    return { response, body };
  }

  constructor(baseUrl: string | URL) {
    this.#baseUrl = new URL(baseUrl);
  }

  async get(path: string) {
    return this.#fetch(path);
  }

  async post(path: string, data: unknown) {
    return this.#fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export class JsonClient<Endpoints extends Record<string, Endpoint> = {}> {
  #baseUrl: URL;

  async #fetch<Path extends keyof Endpoints>(path: Path, init?: RequestInit) {
    const url = new URL(path as string, this.#baseUrl);
    const response = await fetch(url, init);
    const data = await response.json();
    return { response, data };
  }

  constructor(baseUrl: string | URL) {
    this.#baseUrl = new URL(baseUrl);
  }

  async get<Path extends keyof Endpoints>(path: Path) {
    return this.#fetch(path) as Promise<
      FetchResult<
        Endpoints[Path]["GET"] extends { result: infer Result }
          ? Result
          : unknown
      >
    >;
  }

  async post<Path extends keyof Endpoints>(
    path: Path,
    data: Endpoints[Path]["POST"] extends { accepts: infer Accepts }
      ? Accepts
      : unknown
  ) {
    return this.#fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }) as Promise<
      FetchResult<
        Endpoints[Path]["POST"] extends { result: infer Result }
          ? Result
          : unknown
      >
    >;
  }
}
