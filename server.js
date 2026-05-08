const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const HOST = process.env.RENDER ? "0.0.0.0" : "127.0.0.1";
const ROOT = __dirname;

loadEnv();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/quote") {
    await handleQuote(url, response);
    return;
  }

  serveStaticFile(url, response);
});

server.listen(PORT, HOST, () => {
  console.log(`Bill's Portfolio is running on ${HOST}:${PORT}`);
});

function loadEnv() {
  const envPath = path.join(ROOT, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    process.env[key.trim()] = valueParts.join("=").trim();
  }
}

async function handleQuote(url, response) {
  const symbol = (url.searchParams.get("symbol") || "").trim().toUpperCase();
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!symbol) {
    sendJson(response, 400, { message: "Ticker symbol is required." });
    return;
  }

  if (!apiKey) {
    sendJson(response, 503, {
      message: "Add TWELVE_DATA_API_KEY to a local .env file, then restart the server.",
    });
    return;
  }

  const quoteUrl = new URL("https://api.twelvedata.com/quote");
  quoteUrl.searchParams.set("symbol", symbol);
  quoteUrl.searchParams.set("apikey", apiKey);

  try {
    const apiResponse = await fetch(quoteUrl);
    const quote = await apiResponse.json();

    if (!apiResponse.ok || quote.status === "error" || quote.code) {
      sendJson(response, 502, {
        message: quote.message || "Market data provider returned an error.",
      });
      return;
    }

    sendJson(response, 200, quote);
  } catch (error) {
    sendJson(response, 502, {
      message: "Could not connect to the market data provider.",
    });
  }
}

function serveStaticFile(url, response) {
  const safePath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(ROOT, safePath));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    });
    response.end(contents);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}
