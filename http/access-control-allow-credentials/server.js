const http = require("node:http");

const allowedOrigin = "http://localhost:4000";

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;

  // Konfigurasi CORS
  if (origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  }

  // Endpoint login untuk membuat sesi dummy
  if (req.url === "/login" && req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      "session=demo123; HttpOnly; SameSite=Lax; Path=/",
    );

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: "Demo login successful",
      }),
    );
  }

  // Endpoint profil
  if (req.url === "/api/profile" && req.method === "GET") {
    const cookie = req.headers.cookie || "";
    console.log("cookie", cookie);

    if (!cookie.includes("session=demo123")) {
      res.writeHead(401, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          error: "Unauthorized",
        }),
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        username: "testuser",
        email: "test@example.com",
        role: "user",
      }),
    );
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Target server: http://localhost:3000");
});
