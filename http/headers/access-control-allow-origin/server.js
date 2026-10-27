const http = require("http");

const HOST = "127.0.0.1";
const PORT = 7000;

const ALLOWED_ORIGIN = "http://localhost:5173";

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;

  console.log(`${req.method} ${req.url}`);
  console.log("Origin:", origin);

  // CORS: hanya izinkan origin frontend yang ditentukan
  if (origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Vary", "Origin");
  }

  // Menangani CORS preflight request
  if (req.method === "OPTIONS") {
    if (origin !== ALLOWED_ORIGIN) {
      res.writeHead(403);
      return res.end("Origin not allowed");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Lab-Header");

    res.writeHead(204);
    return res.end();
  }

  // Endpoint GET
  if (req.method === "GET" && req.url === "/api/hello") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: "Hello from Node.js backend!",
        method: req.method,
        receivedOrigin: origin || null,
        receivedHeader: req.headers["x-lab-header"] || null,
      }),
    );
  }

  // Endpoint tidak ditemukan
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      error: "Not Found",
    }),
  );
});

server.listen(PORT, HOST, () => {
  console.log(`Backend running at http://${HOST}:${PORT}`);
});
