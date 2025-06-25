export function html(content, options = {}) {
  const body = Array.isArray(content) ? content.join("") : content;
  const status = options.status ?? 200;
  const headers = {
    "Content-Type": "text/html",
    "Content-Length": body.length.toString(),
  };
  if (options.cookies) headers["Set-Cookie"] = options.cookies.toSetCookieHeaders();

  return new Response(`<!DOCTYPE html><html><body>${body}</body></html>`, {
    headers,
    status,
  });
}

export function text(body, options = {}) {
  const status = options.status ?? 200;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": body.length.toString(),
    },
    status,
  });
}

export function redirect(url, options = {}) {
  const status = options.status ?? 303;
  return Response.redirect(url, status);
}
