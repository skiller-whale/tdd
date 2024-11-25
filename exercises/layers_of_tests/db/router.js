export default async (db, request) => {
  const url = new URL(request.url);

  try {
    const payload = await request.json();
    const query = db.query(payload.query);
  
    // run query
    if (url.pathname === "/run") {
      query.run(payload.parameters);
      const result = { data: null };
      return response(result, 200);
    }
  
    // get query
    if (url.pathname === "/get") {
      const data = query.get(payload.parameters);
      return response({ data }, 200);
    }
  
    // 404
    return response({ error: "endpoint not found" }, 404);
  } catch (error) {
    // 400
    return response({ error: error.message }, 400);
  }
};

const response = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
