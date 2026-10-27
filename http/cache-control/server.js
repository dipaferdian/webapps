const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = 3000;
let requestCount = 0;

const server = http.createServer((req, res) => {
  // Serve the HTML page.
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "cache-control.html");

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // API endpoint with cache validation.
  if (url.pathname === "/api/data" && req.method === "GET") {
    requestCount++;

    const data = {
      message: "Hello from Node.js server!",
      // serverRequestCount: requestCount,
    };

    const body = JSON.stringify(data);

    // Generate an ETag from the response body.
    const etag = `"${crypto.createHash("sha256").update(body).digest("hex")}"`;

    console.log(`Request #${requestCount}`);
    console.log("If-None-Match:", req.headers["if-none-match"]);

    // Check whether the cached response is still valid.
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, {
        "Cache-Control": "no-cache",
        ETag: etag,
      });

      res.end();
      console.log("Response: 304 Not Modified\n");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      ETag: etag,
    });

    res.end(body);
    console.log("Response: 200 OK\n");
    return;
  }

  // Handle unknown routes.
  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });

  res.end("404 Not Found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
