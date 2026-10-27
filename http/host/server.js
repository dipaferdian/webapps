const http = require("http");
const crypto = require("crypto");

const PORT = 7000;
const APP_BASE_URL = "http://localhost:7000";

const server = http.createServer((req, res) => {
  // Izinkan frontend lokal mengakses backend.
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (
    req.method !== "POST" ||
    !["/api/vulnerable", "/api/secure"].includes(req.url)
  ) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Not found" }));
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let data;

    try {
      data = JSON.parse(body);
    } catch {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid JSON" }));
    }

    if (typeof data.email !== "string" || !data.email.trim()) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Email is required" }));
    }

    let resetUrl;
    let mode;

    if (req.url === "/api/vulnerable") {
      // VULNERABLE:
      // Menggunakan Host dari HTTP request.
      const host = req.headers.host;

      const token = crypto.randomBytes(32).toString("hex");

      resetUrl = `http://${host}/reset-password?email=${encodeURIComponent(data.email)}?token=${token}`;

      mode = "vulnerable";
    } else {
      // SECURE:
      // Menggunakan domain dari konfigurasi tepercaya.
      resetUrl = `${APP_BASE_URL}/reset-password?email=${encodeURIComponent(data.email)}`;

      mode = "secure";
    }

    res.writeHead(200);
    res.end(JSON.stringify({ mode, resetUrl }, null, 2));
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
