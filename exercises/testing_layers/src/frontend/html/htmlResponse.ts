import page from "./page.ts";

export default function htmlResponse(body: string[], status = 200) {
  return new Response(page(body), {
    status,
    headers: { "Content-Type": "text/html" },
  });
}
