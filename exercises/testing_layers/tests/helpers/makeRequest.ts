type Options = {
  baseUrl: URL;
  path: string;
  requestBody?: Record<string, unknown>;
};

export default async function makeRequest({
  baseUrl,
  path,
  requestBody,
}: Options) {
  const url = new URL(path, baseUrl);

  const response = await fetch(url.toString(), {
    method: requestBody ? "POST" : "GET",
    headers: requestBody ? { "Content-Type": "application/json" } : {},
    body: requestBody ? JSON.stringify(requestBody) : undefined,
  });

  const body = response.headers
    .get("content-type")
    ?.includes("application/json")
    ? await response.json()
    : await response.text();

  return { status: response.status, body };
}
