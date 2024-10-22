export default async (request) => {
  const url = new URL(request.url);

  switch (url.pathname) {
    case "/":
    case "/index.html": {
      const index = await Bun.file("./src/client/index.html").bytes();
      return new Response(index, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    case "/screen.css": {
      const css = await Bun.file("./src/client/screen.css").bytes();
      return new Response(css, {
        status: 200,
        headers: { "Content-Type": "text/css" },
      });
    }

    case "/app.js": {
      const build = await Bun.build({ entrypoints: ["./src/client/app.jsx"] });
      const javascript = await build.outputs[0].text();
      return new Response(javascript, {
        status: 200,
        headers: { "Content-Type": "text/javascript" },
      });
    }

    default:
      return new Response("Page not found", { status: 404 });
  }
};
