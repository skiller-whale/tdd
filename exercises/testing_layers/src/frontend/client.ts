let baseUrl: URL;

export function configureBaseUrl(baseUrlToSet: URL) {
  baseUrl = baseUrlToSet;
}

export default async function fetchFromBackend(path: string, body: unknown = {}) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from backend: ${response.statusText}`);
  }

  return response.json() as Promise<any>;
}
