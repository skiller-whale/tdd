export default class Client {
  #baseUrl;

  async #fetch(path, init) {
    const url = new URL(path, this.#baseUrl);
    const response = await fetch(url, init);
    const body = response.headers
      .get("Content-Type")
      ?.includes("application/json")
      ? await response.json()
      : await response.text();
    return { response, body };
  }

  constructor(baseUrl) {
    this.#baseUrl = new URL(baseUrl);
  }

  async get(path) {
    return this.#fetch(path);
  }

  async post(path, formData) {
    return this.#fetch(path, {
      method: "POST",
      body: formData,
    });
  }
}
