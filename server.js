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

  if (url.pathname === "/api/time-series") {
    await handleTimeSeries(url, response);
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

async function handleTimeSeries(url, response) {
  const symbol = (url.searchParams.get("symbol") || "").trim().toUpperCase();
  const range = (url.searchParams.get("range") || "1M").trim().toUpperCase();
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  const rangeConfig = getRangeConfig(range);

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

  const seriesUrl = new URL("https://api.twelvedata.com/time_series");
  seriesUrl.searchParams.set("symbol", symbol);
  seriesUrl.searchParams.set("interval", rangeConfig.interval);
  seriesUrl.searchParams.set("outputsize", String(rangeConfig.outputsize));
  seriesUrl.searchParams.set("apikey", apiKey);

  try {
    const apiResponse = await fetch(seriesUrl);
    const series = await apiResponse.json();

    if (!apiResponse.ok || series.status === "error" || series.code) {
      sendJson(response, 502, {
        message: series.message || "Market data provider returned an error.",
      });
      return;
    }

    if (!Array.isArray(series.values) || series.values.length === 0) {
      sendJson(response, 404, {
        message: `No chart data was found for ${symbol}. Try another symbol or range.`,
      });
      return;
    }

    const values = series.values
      .map((point) => ({
        datetime: point.datetime,
        open: Number(point.open),
        high: Number(point.high),
        low: Number(point.low),
        close: Number(point.close),
        volume: Number(point.volume),
      }))
      .filter((point) => Number.isFinite(point.close))
      .reverse();

    sendJson(response, 200, {
      symbol,
      range,
      interval: rangeConfig.interval,
      meta: series.meta || {},
      values,
    });
  } catch (error) {
    sendJson(response, 502, {
      message: "Could not connect to the market data provider.",
    });
  }
}

function getRangeConfig(range) {
  const ranges = {
    "1D": { interval: "5min", outputsize: 78 },
    "5D": { interval: "30min", outputsize: 65 },
    "1W": { interval: "1h", outputsize: 40 },
    "1M": { interval: "1day", outputsize: 30 },
    "6M": { interval: "1day", outputsize: 130 },
    "1Y": { interval: "1day", outputsize: 260 },
  };

  return ranges[range] || ranges["1M"];
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
