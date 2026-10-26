const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Allow requests from the client origin.
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:2000");

  // Expose custom response headers to JavaScript.
  //   res.setHeader("Access-Control-Expose-Headers", "X-Request-ID");

  // Handle CORS preflight requests.
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/data" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Request-ID", "req-12345");

    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Hello from the server!",
      }),
    );
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
