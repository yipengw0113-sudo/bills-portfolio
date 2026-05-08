const equityRange = document.querySelector("#equityRange");
const equityValue = document.querySelector("#equityValue");
const profileLabel = document.querySelector("#profileLabel");
const volatilityValue = document.querySelector("#volatilityValue");
const guidanceText = document.querySelector("#guidanceText");
const riskScore = document.querySelector("#riskScore");
const quoteForm = document.querySelector("#quoteForm");
const tickerInput = document.querySelector("#tickerInput");
const quoteResult = document.querySelector("#quoteResult");
const analysisForm = document.querySelector("#analysisForm");
const analysisTicker = document.querySelector("#analysisTicker");
const epsInput = document.querySelector("#epsInput");
const bookValueInput = document.querySelector("#bookValueInput");
const dividendInput = document.querySelector("#dividendInput");
const growthInput = document.querySelector("#growthInput");
const roeInput = document.querySelector("#roeInput");
const debtEquityInput = document.querySelector("#debtEquityInput");
const analysisStatus = document.querySelector("#analysisStatus");
const ratioGrid = document.querySelector("#ratioGrid");
const analysisNote = document.querySelector("#analysisNote");

function updateProfile() {
  const equity = Number(equityRange.value);

  equityValue.textContent = `${equity}%`;
  riskScore.textContent = Math.round(equity * 1.08);

  if (equity < 40) {
    profileLabel.textContent = "Defensive";
    volatilityValue.textContent = "Low";
    guidanceText.textContent = "A steadier mix that prioritizes capital preservation.";
    return;
  }

  if (equity < 70) {
    profileLabel.textContent = "Balanced Growth";
    volatilityValue.textContent = "Medium";
    guidanceText.textContent = "A growth-focused mix with room for stabilizing assets.";
    return;
  }

  profileLabel.textContent = "Aggressive Growth";
  volatilityValue.textContent = "High";
  guidanceText.textContent = "A return-seeking mix that needs a longer time horizon.";
}

equityRange.addEventListener("input", updateProfile);
updateProfile();

function renderQuote(data) {
  const change = Number(data.change || 0);
  const changeClass = change < 0 ? "quote-change negative" : "quote-change";
  const exchange = data.exchange ? ` · ${data.exchange}` : "";

  quoteResult.innerHTML = `
    <p>${data.name || data.symbol}${exchange}</p>
    <strong class="quote-price">${data.currency || "USD"} ${Number(data.close || data.price).toFixed(2)}</strong>
    <span class="${changeClass}">${change >= 0 ? "+" : ""}${change.toFixed(2)} (${Number(data.percent_change || 0).toFixed(2)}%)</span>
  `;
}

async function fetchQuote(symbol) {
  quoteResult.innerHTML = "<p>Loading latest quote...</p>";

  const data = await getQuote(symbol);

  renderQuote(data);
}

async function getQuote(symbol) {
  const response = await fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to retrieve quote.");
  }

  return data;
}

quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const symbol = tickerInput.value.trim().toUpperCase();
  if (!symbol) {
    quoteResult.innerHTML = "<p>Please enter a ticker symbol.</p>";
    return;
  }

  try {
    await fetchQuote(symbol);
  } catch (error) {
    quoteResult.innerHTML = `<p>${error.message}</p>`;
  }
});

function formatMultiple(value) {
  if (!Number.isFinite(value)) {
    return "N/A";
  }
  return `${value.toFixed(1)}x`;
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "N/A";
  }
  return `${value.toFixed(2)}%`;
}

function metricCard(label, value, note) {
  return `
    <article class="ratio-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${note}</p>
    </article>
  `;
}

function buildInterpretation({ peRatio, pbRatio, dividendYield, revenueGrowth, roe, debtEquity }) {
  const signals = [];

  if (Number.isFinite(peRatio)) {
    signals.push(peRatio > 30 ? "valuation looks growth-priced by P/E" : "P/E is less demanding than many high-growth names");
  }

  if (Number.isFinite(roe)) {
    signals.push(roe > 20 ? "profitability appears strong by ROE" : "ROE needs comparison with peers");
  }

  if (Number.isFinite(debtEquity)) {
    signals.push(debtEquity > 2 ? "leverage deserves closer review" : "leverage is not extreme by this simple input");
  }

  if (Number.isFinite(revenueGrowth)) {
    signals.push(revenueGrowth > 10 ? "growth is a key part of the thesis" : "growth assumptions may need to be conservative");
  }

  if (Number.isFinite(dividendYield) && dividendYield > 2) {
    signals.push("dividends contribute meaningfully to total return");
  }

  return signals.join("; ") + ".";
}

async function analyzeStock(event) {
  event.preventDefault();

  const symbol = analysisTicker.value.trim().toUpperCase();
  if (!symbol) {
    analysisStatus.textContent = "Please enter a ticker symbol.";
    return;
  }

  analysisStatus.textContent = `Retrieving latest quote for ${symbol}...`;
  ratioGrid.innerHTML = "";

  try {
    const quote = await getQuote(symbol);
    const price = Number(quote.close || quote.price);
    const eps = Number(epsInput.value);
    const bookValue = Number(bookValueInput.value);
    const dividend = Number(dividendInput.value);
    const revenueGrowth = Number(growthInput.value);
    const roe = Number(roeInput.value);
    const debtEquity = Number(debtEquityInput.value);

    const peRatio = price / eps;
    const pbRatio = price / bookValue;
    const dividendYield = (dividend / price) * 100;

    analysisStatus.textContent = `${quote.name || symbol} latest available price: ${quote.currency || "USD"} ${price.toFixed(2)}`;
    ratioGrid.innerHTML = [
      metricCard("P/E Ratio", formatMultiple(peRatio), "Price divided by EPS. Higher can mean strong growth expectations or expensive valuation."),
      metricCard("P/B Ratio", formatMultiple(pbRatio), "Price divided by book value per share. Useful for asset-heavy businesses."),
      metricCard("Dividend Yield", formatPercent(dividendYield), "Annual dividend per share divided by current price."),
      metricCard("Revenue Growth", formatPercent(revenueGrowth), "Top-line growth rate. Compare against company history and peers."),
      metricCard("ROE", formatPercent(roe), "Net income divided by equity. Measures profitability on shareholder capital."),
      metricCard("Debt / Equity", formatMultiple(debtEquity), "A quick leverage check. Higher debt can increase financial risk."),
    ].join("");
    analysisNote.textContent = buildInterpretation({ peRatio, pbRatio, dividendYield, revenueGrowth, roe, debtEquity });
  } catch (error) {
    analysisStatus.textContent = error.message;
    analysisNote.textContent = "The analyzer needs a live quote plus your manual assumptions.";
  }
}

analysisForm.addEventListener("submit", analyzeStock);
