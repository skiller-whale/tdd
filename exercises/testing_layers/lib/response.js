export function html(content, status = 200) {
  const body = Array.isArray(content) ? content.join("") : content;
  return new Response(`<!DOCTYPE html><html><body>${body}</body></html>`, {
    headers: {
      "Content-Type": "text/html",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function text(body, status = 200) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function redirect(url, status = 303) {
  return Response.redirect(url, status);
}
