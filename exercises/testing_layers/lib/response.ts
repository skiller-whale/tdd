export function html(content: string | string[], status = 200): Response {
  const body = Array.isArray(content) ? content.join("") : content;
  return new Response(`<!DOCTYPE html><html><body>${body}</body></html>`, {
    headers: {
      "Content-Type": "text/html",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function json(data: Record<string, unknown>, status = 200): Response {
  const body = JSON.stringify(data);
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function text(body: string, status = 200): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function redirect(url: string, status = 302): Response {
  return Response.redirect(url, status);
}
