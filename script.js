const equityRange = document.querySelector("#equityRange");
const languageToggle = document.querySelector("#languageToggle");
const languageLabel = document.querySelector("#languageLabel");
const tabLinks = document.querySelectorAll("[data-tab]");
const appViews = document.querySelectorAll("[data-view]");
const equityValue = document.querySelector("#equityValue");
const profileLabel = document.querySelector("#profileLabel");
const volatilityValue = document.querySelector("#volatilityValue");
const guidanceText = document.querySelector("#guidanceText");
const riskScore = document.querySelector("#riskScore");
const heroPortfolioValue = document.querySelector("#heroPortfolioValue");
const heroPortfolioReturn = document.querySelector("#heroPortfolioReturn");
const holdingCount = document.querySelector("#holdingCount");
const investedCapital = document.querySelector("#investedCapital");
const unrealizedGain = document.querySelector("#unrealizedGain");
const trackedValueShare = document.querySelector("#trackedValueShare");
const investedShare = document.querySelector("#investedShare");
const gainShare = document.querySelector("#gainShare");
const equityBar = document.querySelector("#equityBar");
const etfBar = document.querySelector("#etfBar");
const bondBar = document.querySelector("#bondBar");
const cashBar = document.querySelector("#cashBar");
const holdingForm = document.querySelector("#holdingForm");
const holdingTicker = document.querySelector("#holdingTicker");
const purchaseDate = document.querySelector("#purchaseDate");
const avgCostInput = document.querySelector("#avgCostInput");
const shareAmountInput = document.querySelector("#shareAmountInput");
const assetTypeInput = document.querySelector("#assetTypeInput");
const accountTypeInput = document.querySelector("#accountTypeInput");
const runPortfolioAnalysis = document.querySelector("#runPortfolioAnalysis");
const holdingsBody = document.querySelector("#holdingsBody");
const portfolioAnalyticsGrid = document.querySelector("#portfolioAnalyticsGrid");
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
const trendForm = document.querySelector("#trendForm");
const trendSymbol = document.querySelector("#trendSymbol");
const priceChart = document.querySelector("#priceChart");
const klineChart = document.querySelector("#klineChart");
const chartMeta = document.querySelector("#chartMeta");
const chartPrice = document.querySelector("#chartPrice");
const chartChange = document.querySelector("#chartChange");
const chartMessage = document.querySelector("#chartMessage");
const klineTitle = document.querySelector("#klineTitle");
const volumeLabel = document.querySelector("#volumeLabel");
const marketAnalysisGrid = document.querySelector("#marketAnalysisGrid");
const financeLink = document.querySelector("#financeLink");
const quickSymbolButtons = document.querySelectorAll("[data-symbol]");
const rangeButtons = document.querySelectorAll("[data-range]");

let activeRange = "1D";
let latestTrendValues = [];
let latestTrendData = null;
let latestTrendSymbol = "AAPL";
let holdings = JSON.parse(localStorage.getItem("billPortfolioHoldings") || "[]");
let currentLanguage = localStorage.getItem("billPortfolioLanguage") || "en";

const copy = {
  en: {
    navDashboard: "Dashboard",
    navHoldings: "Holdings",
    navTrends: "Trends",
    navQuote: "Quote",
    navAnalyzer: "Analyzer",
    navFeatures: "Features",
    navLearn: "Learn",
    startTracking: "Start Tracking",
    heroEyebrow: "Portfolio clarity for self-directed investors",
    heroTitle: "Build a sharper view of your money before you make the next move.",
    heroText: "Track holdings, compare asset allocation, and turn messy investment notes into a calm dashboard built around risk, return, and discipline.",
    addHoldings: "Add Holdings",
    openCharts: "Open Charts",
    totalPortfolio: "Total Portfolio",
    addHoldingsLower: "Add holdings",
    trackedValue: "Tracked Value",
    invested: "Invested",
    gainLoss: "Gain/Loss",
    cashBuffer: "Cash Buffer",
    riskScore: "Risk Score",
    holdings: "Holdings",
    investedCapital: "Invested Capital",
    unrealizedGain: "Unrealized Gain",
    trackerEyebrow: "Portfolio tracker",
    trackerTitle: "Enter your holdings and calculate unrealized return.",
    ticker: "Ticker",
    purchaseDate: "Purchase date",
    investedAmount: "Invested amount",
    avgCost: "Average cost",
    sharesUnits: "Shares / units",
    assetType: "Asset type",
    assetEquity: "Equity",
    assetEtf: "ETF",
    assetBond: "Bond",
    assetCash: "Cash",
    accountType: "Account",
    accountTaxable: "Taxable",
    addHolding: "Add Holding",
    runPortfolioAnalysis: "Run Historical Analysis",
    date: "Date",
    shares: "Shares",
    price: "Price",
    value: "Value",
    allocation: "Allocation",
    return: "Return",
    emptyHoldings: "Add a holding to start tracking your portfolio.",
    portfolioAnalyticsEyebrow: "Historical analytics",
    portfolioAnalyticsTitle: "Use one year of prices to estimate risk and possible outcomes.",
    analyticsWaiting: "Waiting for holdings",
    analyticsWaitingNote: "Add holdings, then run the historical analysis.",
    featuresEyebrow: "What it helps you see",
    featuresTitle: "One workspace for portfolio decisions.",
    featureAllocation: "Allocation Map",
    featureAllocationText: "Understand how much of your money sits in equity, ETFs, bonds, mutual funds, and cash.",
    featureReturn: "Return Tracking",
    featureReturnText: "Compare cost, current value, unrealized gains, and contribution behavior over time.",
    featureNotes: "Decision Notes",
    featureNotesText: "Capture why you bought, sold, or held an asset so your future self can audit the logic.",
    strategyEyebrow: "Beginner-friendly strategy",
    strategyTitle: "High return starts with a clear process, not random confidence.",
    strategyDefine: "<strong>Define:</strong> time horizon, goal, account type, and risk tolerance.",
    strategyDiversify: "<strong>Diversify:</strong> balance growth assets with stabilizers like bonds and cash.",
    strategyReview: "<strong>Review:</strong> rebalance based on rules instead of emotional market timing.",
    previewEyebrow: "Interactive preview",
    previewTitle: "Adjust the equity weight and watch the profile change.",
    equityAllocation: "Equity allocation",
    defensive: "Defensive",
    low: "Low",
    defensiveGuidance: "A steadier mix that prioritizes capital preservation.",
    balancedGrowth: "Balanced Growth",
    medium: "Medium",
    balancedGuidance: "A growth-focused mix with room for stabilizing assets.",
    aggressiveGrowth: "Aggressive Growth",
    high: "High",
    aggressiveGuidance: "A return-seeking mix that needs a longer time horizon.",
    volatilityProfile: "Estimated volatility profile",
    marketEyebrow: "Live market data",
    marketTitle: "Check a stock or ETF quote from Twelve Data.",
    tickerSymbol: "Ticker symbol",
    getQuote: "Get Quote",
    quotePrompt: "Enter a ticker to retrieve the latest available quote.",
    loadingQuote: "Loading latest quote...",
    enterTicker: "Please enter a ticker symbol.",
    trendsEyebrow: "Market trends",
    trendsTitle: "Visualize stocks, index ETFs, and market data across time ranges.",
    symbol: "Symbol",
    chart: "Chart",
    tencent: "Tencent",
    chinaA: "China A",
    loading: "Loading...",
    chartMessageDefault: "SPY is used as an S&P 500 ETF proxy. International symbols depend on Twelve Data coverage and symbol format.",
    kline: "K-line",
    candlestick: "Candlestick",
    volume: "Volume",
    autoAnalysis: "Automated analysis",
    trendFinanceNotes: "Trend and finance notes",
    openFinance: "Open external finance page",
    analyzerEyebrow: "CFA-style stock analyzer",
    analyzerTitle: "Turn a ticker and a few fundamentals into valuation signals.",
    eps: "EPS",
    bookValue: "Book value per share",
    annualDividend: "Annual dividend per share",
    revenueGrowth: "Revenue growth %",
    roe: "ROE %",
    debtEquity: "Debt / Equity",
    analyzeStock: "Analyze Stock",
    analysisStatusDefault: "Add assumptions and run the analyzer.",
    educationalNote: "This is an educational framework, not a buy or sell recommendation.",
    footerNote: "Bill's Portfolio is a learning project. It is not financial advice.",
    invalidHolding: "Please enter a ticker, invested amount, and shares greater than zero.",
    invalidHoldingSmart: "Please enter a ticker, average cost, and shares greater than zero.",
    fetchingPrice: "Fetching latest price for {symbol}...",
    retrievingQuote: "Retrieving latest quote for {symbol}...",
    latestPrice: "{symbol} latest available price: {currency} {price}",
    analyzerNeedsQuote: "The analyzer needs a live quote plus your manual assumptions.",
    peRatio: "P/E Ratio",
    peNote: "Price divided by EPS. Higher can mean strong growth expectations or expensive valuation.",
    pbRatio: "P/B Ratio",
    pbNote: "Price divided by book value per share. Useful for asset-heavy businesses.",
    dividendYield: "Dividend Yield",
    dividendNote: "Annual dividend per share divided by current price.",
    revenueGrowthCard: "Revenue Growth",
    revenueNote: "Top-line growth rate. Compare against company history and peers.",
    roeNote: "Net income divided by equity. Measures profitability on shareholder capital.",
    debtNote: "A quick leverage check. Higher debt can increase financial risk.",
    notEnoughData: "Not enough data",
    notEnoughDataNote: "The API did not return enough usable price points.",
    bullishMomentum: "Bullish momentum",
    bullishNote: "Price is above MA5 and MA5 is above MA20, a simple short-term uptrend signal.",
    bearishPressure: "Bearish pressure",
    bearishNote: "Price is below MA5 and MA5 is below MA20, a simple short-term downtrend signal.",
    mixedTrend: "Mixed trend",
    mixedNote: "Signals are not aligned. This usually calls for patience and comparison across longer ranges.",
    trendSignal: "Trend Signal",
    rangeReturn: "Range Return",
    rangeReturnNote: "Price movement over the selected {range} window.",
    ma5Note: "Short moving average. Useful for near-term momentum.",
    ma20Note: "Medium moving average. Compare it with MA5 and current price.",
    rangeHighLow: "Range High / Low",
    highLowNote: "A quick support/resistance reference from the selected period.",
    volatilityRange: "Volatility Range",
    volatilityNote: "High-low range divided by starting price. Higher means larger swings.",
    volumeIncluded: "Volume included",
    noVolume: "No volume",
    retrievingHistory: "Retrieving price history...",
    showingPoints: "Showing {count} {interval} data points from Twelve Data. SPY is used here as an S&P 500 ETF proxy. International symbols depend on provider coverage.",
    noData: "No Data",
    unavailable: "Unavailable",
    noDataNote: "Try another symbol format, exchange suffix, or a broader range.",
    notEnoughChart: "Not enough data to draw a chart.",
    notEnoughKline: "Not enough OHLC data to draw a K-line chart.",
    analyzingPortfolio: "Analyzing historical returns and Monte Carlo outcomes...",
    historicalReturn: "Historical 1Y Return",
    historicalReturnNote: "Weighted return from available one-year price history.",
    annualizedVolatility: "Annualized Volatility",
    annualizedVolatilityNote: "Estimated from daily historical returns and scaled by 252 trading days.",
    monteCarloMedian: "Monte Carlo Median",
    monteCarloMedianNote: "Median simulated portfolio value one year from now.",
    monteCarloRange: "Monte Carlo 10%-90%",
    monteCarloRangeNote: "A simple uncertainty band from 500 random-walk simulations.",
    analysisUnavailable: "Analysis unavailable",
    analysisUnavailableNote: "The API did not return enough history for your current holdings.",
  },
  zh: {
    navDashboard: "仪表盘",
    navHoldings: "持仓",
    navTrends: "趋势",
    navQuote: "报价",
    navAnalyzer: "分析器",
    navFeatures: "功能",
    navLearn: "学习",
    startTracking: "开始追踪",
    heroEyebrow: "为自主投资者打造的投资组合视图",
    heroTitle: "在下一次投资决策前，更清楚地看懂你的资金。",
    heroText: "追踪持仓、比较资产配置，把零散的投资记录变成围绕风险、收益和纪律的清晰仪表盘。",
    addHoldings: "添加持仓",
    openCharts: "查看图表",
    totalPortfolio: "投资组合总值",
    addHoldingsLower: "添加持仓",
    trackedValue: "已追踪市值",
    invested: "投入本金",
    gainLoss: "盈亏",
    cashBuffer: "现金缓冲",
    riskScore: "风险评分",
    holdings: "持仓数量",
    investedCapital: "投入本金",
    unrealizedGain: "未实现盈亏",
    trackerEyebrow: "投资组合追踪",
    trackerTitle: "输入你的持仓，计算未实现收益。",
    ticker: "代码",
    purchaseDate: "买入日期",
    investedAmount: "投入金额",
    avgCost: "平均成本",
    sharesUnits: "股数 / 份额",
    assetType: "资产类型",
    assetEquity: "股票",
    assetEtf: "ETF",
    assetBond: "债券",
    assetCash: "现金",
    accountType: "账户",
    accountTaxable: "应税账户",
    addHolding: "添加持仓",
    runPortfolioAnalysis: "运行历史分析",
    date: "日期",
    shares: "股数",
    price: "价格",
    value: "市值",
    allocation: "占比",
    return: "收益率",
    emptyHoldings: "添加一条持仓后开始追踪你的投资组合。",
    portfolioAnalyticsEyebrow: "历史分析",
    portfolioAnalyticsTitle: "使用一年价格数据估算风险和可能结果。",
    analyticsWaiting: "等待持仓",
    analyticsWaitingNote: "添加持仓后，运行历史分析。",
    featuresEyebrow: "它能帮你看见什么",
    featuresTitle: "一个用于投资决策的工作台。",
    featureAllocation: "资产配置地图",
    featureAllocationText: "了解你的资金分别分布在股票、ETF、债券、共同基金和现金中。",
    featureReturn: "收益追踪",
    featureReturnText: "比较成本、当前市值、未实现收益以及定投行为。",
    featureNotes: "决策记录",
    featureNotesText: "记录买入、卖出或持有的原因，方便未来复盘自己的逻辑。",
    strategyEyebrow: "适合初学者的策略",
    strategyTitle: "高收益来自清晰流程，而不是随机自信。",
    strategyDefine: "<strong>定义：</strong>投资期限、目标、账户类型和风险承受能力。",
    strategyDiversify: "<strong>分散：</strong>用债券和现金等稳定资产平衡成长资产。",
    strategyReview: "<strong>复盘：</strong>按照规则再平衡，而不是被情绪和市场噪音带着走。",
    previewEyebrow: "互动预览",
    previewTitle: "调整股票仓位，观察组合画像变化。",
    equityAllocation: "股票配置比例",
    defensive: "防御型",
    low: "低",
    defensiveGuidance: "更稳健的组合，优先考虑本金保护。",
    balancedGrowth: "均衡成长型",
    medium: "中",
    balancedGuidance: "偏成长的组合，同时保留稳定资产空间。",
    aggressiveGrowth: "进取成长型",
    high: "高",
    aggressiveGuidance: "追求收益的组合，需要更长投资期限。",
    volatilityProfile: "预估波动画像",
    marketEyebrow: "实时市场数据",
    marketTitle: "通过 Twelve Data 查询股票或 ETF 报价。",
    tickerSymbol: "证券代码",
    getQuote: "获取报价",
    quotePrompt: "输入代码以获取最新可用报价。",
    loadingQuote: "正在加载最新报价...",
    enterTicker: "请输入证券代码。",
    trendsEyebrow: "市场趋势",
    trendsTitle: "可视化股票、指数 ETF 和市场数据的不同时间区间。",
    symbol: "代码",
    chart: "图表",
    tencent: "腾讯",
    chinaA: "中国A股",
    loading: "加载中...",
    chartMessageDefault: "这里用 SPY 作为 S&P 500 ETF 代理。国际市场代码取决于 Twelve Data 覆盖范围和代码格式。",
    kline: "K线",
    candlestick: "蜡烛图",
    volume: "成交量",
    autoAnalysis: "自动分析",
    trendFinanceNotes: "趋势与财务提示",
    openFinance: "打开外部财经页面",
    analyzerEyebrow: "CFA 风格股票分析器",
    analyzerTitle: "用代码和关键基本面数据生成估值信号。",
    eps: "每股收益 EPS",
    bookValue: "每股账面价值",
    annualDividend: "每股年度股息",
    revenueGrowth: "收入增长 %",
    roe: "ROE %",
    debtEquity: "负债 / 权益",
    analyzeStock: "分析股票",
    analysisStatusDefault: "输入假设后运行分析器。",
    educationalNote: "这是教育性分析框架，不构成买入或卖出建议。",
    footerNote: "Bill's Portfolio 是学习项目，不构成财务建议。",
    invalidHolding: "请输入代码、投入金额，以及大于 0 的股数。",
    invalidHoldingSmart: "请输入代码、平均成本，以及大于 0 的股数。",
    fetchingPrice: "正在获取 {symbol} 的最新价格...",
    retrievingQuote: "正在获取 {symbol} 的最新报价...",
    latestPrice: "{symbol} 最新可用价格：{currency} {price}",
    analyzerNeedsQuote: "分析器需要实时报价和你手动输入的假设。",
    peRatio: "市盈率 P/E",
    peNote: "价格除以 EPS。较高数值可能代表高成长预期，也可能代表估值偏贵。",
    pbRatio: "市净率 P/B",
    pbNote: "价格除以每股账面价值。对资产较重的公司更有参考意义。",
    dividendYield: "股息率",
    dividendNote: "每股年度股息除以当前价格。",
    revenueGrowthCard: "收入增长",
    revenueNote: "收入端增长率，应与公司历史和同行比较。",
    roeNote: "净利润除以股东权益，用于衡量股东资本回报率。",
    debtNote: "快速杠杆检查。负债越高，财务风险可能越高。",
    notEnoughData: "数据不足",
    notEnoughDataNote: "API 没有返回足够可用的价格点。",
    bullishMomentum: "多头动能",
    bullishNote: "价格高于 MA5，且 MA5 高于 MA20，是简单的短期上行信号。",
    bearishPressure: "空头压力",
    bearishNote: "价格低于 MA5，且 MA5 低于 MA20，是简单的短期下行信号。",
    mixedTrend: "趋势混合",
    mixedNote: "信号尚未一致，通常需要耐心并结合更长周期比较。",
    trendSignal: "趋势信号",
    rangeReturn: "区间收益",
    rangeReturnNote: "所选 {range} 区间内的价格变化。",
    ma5Note: "短期移动平均线，可用于观察近期动能。",
    ma20Note: "中期移动平均线，可与 MA5 和当前价格比较。",
    rangeHighLow: "区间高 / 低",
    highLowNote: "所选周期内的简易支撑/阻力参考。",
    volatilityRange: "波动区间",
    volatilityNote: "高低价差除以起始价格。数值越高代表波动越大。",
    volumeIncluded: "包含成交量",
    noVolume: "无成交量",
    retrievingHistory: "正在获取价格历史...",
    showingPoints: "显示来自 Twelve Data 的 {count} 个 {interval} 数据点。这里用 SPY 作为 S&P 500 ETF 代理。国际代码取决于数据覆盖范围。",
    noData: "无数据",
    unavailable: "不可用",
    noDataNote: "请尝试其他代码格式、交易所后缀，或更长时间区间。",
    notEnoughChart: "没有足够数据绘制图表。",
    notEnoughKline: "没有足够 OHLC 数据绘制 K 线图。",
    analyzingPortfolio: "正在分析历史收益和蒙特卡洛结果...",
    historicalReturn: "历史1年收益",
    historicalReturnNote: "基于可用一年价格历史的加权收益。",
    annualizedVolatility: "年化波动率",
    annualizedVolatilityNote: "由日收益率估算，并按 252 个交易日年化。",
    monteCarloMedian: "蒙特卡洛中位数",
    monteCarloMedianNote: "一年后模拟投资组合价值的中位数。",
    monteCarloRange: "蒙特卡洛 10%-90%",
    monteCarloRangeNote: "500 次随机游走模拟得到的简易不确定区间。",
    analysisUnavailable: "分析不可用",
    analysisUnavailableNote: "当前持仓没有返回足够的历史数据。",
  },
};

function t(key, params = {}) {
  const template = copy[currentLanguage][key] || copy.en[key] || key;
  return Object.entries(params).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = t(key);
    if (value.includes("<")) {
      element.innerHTML = value;
      return;
    }
    element.textContent = value;
  });
  languageLabel.textContent = currentLanguage === "zh" ? "EN" : "中文";
  updateProfile();
  renderHoldings();
  if (latestTrendData) {
    updateChartHeader(latestTrendSymbol, activeRange, latestTrendData);
    updateMarketAnalysis(latestTrendSymbol, activeRange, latestTrendData);
    chartMessage.textContent = t("showingPoints", {
      count: latestTrendData.values.length,
      interval: latestTrendData.interval,
    });
  }
}

function showView(viewName) {
  appViews.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });
  tabLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.tab === viewName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewName === "trends") {
    drawPriceChart(latestTrendValues);
    drawKlineChart(latestTrendValues);
  }
}

function getInitialView() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "trends") return "trends";
  if (hash === "market") return "quote";
  if (hash === "analyzer") return "analyzer";
  if (["features", "strategy", "preview"].includes(hash)) return "learn";
  return "dashboard";
}

tabLinks.forEach((link) => {
  link.addEventListener("click", () => showView(link.dataset.tab));
});

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("billPortfolioLanguage", currentLanguage);
  applyLanguage();
});

function updateProfile() {
  const equity = Number(equityRange.value);

  equityValue.textContent = `${equity}%`;
  riskScore.textContent = Math.round(equity * 1.08);

  if (equity < 40) {
    profileLabel.textContent = t("defensive");
    volatilityValue.textContent = t("low");
    guidanceText.textContent = t("defensiveGuidance");
    return;
  }

  if (equity < 70) {
    profileLabel.textContent = t("balancedGrowth");
    volatilityValue.textContent = t("medium");
    guidanceText.textContent = t("balancedGuidance");
    return;
  }

  profileLabel.textContent = t("aggressiveGrowth");
  volatilityValue.textContent = t("high");
  guidanceText.textContent = t("aggressiveGuidance");
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
  quoteResult.innerHTML = `<p>${t("loadingQuote")}</p>`;

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
    quoteResult.innerHTML = `<p>${t("enterTicker")}</p>`;
    return;
  }

  try {
    await fetchQuote(symbol);
  } catch (error) {
    quoteResult.innerHTML = `<p>${error.message}</p>`;
  }
});

function formatMoney(value, currency = "USD") {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function saveHoldings() {
  localStorage.setItem("billPortfolioHoldings", JSON.stringify(holdings));
}

function getCostBasis(holding) {
  if (Number.isFinite(holding.costBasis)) {
    return holding.costBasis;
  }
  if (Number.isFinite(holding.avgCost) && Number.isFinite(holding.shares)) {
    return holding.avgCost * holding.shares;
  }
  return holding.investedAmount || 0;
}

function renderHoldings() {
  if (!holdings.length) {
    holdingsBody.innerHTML = `
      <tr>
        <td colspan="11">${t("emptyHoldings")}</td>
      </tr>
    `;
    updatePortfolioSummary();
    return;
  }

  holdingsBody.innerHTML = holdings
    .map((holding) => {
      const marketValue = holding.shares * holding.currentPrice;
      const costBasis = getCostBasis(holding);
      const avgCost = holding.avgCost || costBasis / holding.shares;
      const gain = marketValue - costBasis;
      const returnPercent = (gain / costBasis) * 100;
      const allocation = getPortfolioValue() > 0 ? (marketValue / getPortfolioValue()) * 100 : 0;
      const gainClass = gain >= 0 ? "positive" : "negative";

      return `
        <tr>
          <td>${holding.symbol}</td>
          <td>${holding.accountType || "--"}</td>
          <td>${holding.assetType || "--"}</td>
          <td>${holding.purchaseDate || "--"}</td>
          <td>${formatMoney(avgCost, holding.currency)}</td>
          <td>${holding.shares.toFixed(4)}</td>
          <td>${formatMoney(holding.currentPrice, holding.currency)}</td>
          <td>${formatMoney(marketValue, holding.currency)}</td>
          <td>${allocation.toFixed(1)}%</td>
          <td class="${gainClass}">${formatMoney(gain, holding.currency)}</td>
          <td class="${gainClass}">${returnPercent.toFixed(2)}%</td>
        </tr>
      `;
    })
    .join("");

  updatePortfolioSummary();
}

function getPortfolioValue() {
  return holdings.reduce((sum, holding) => sum + holding.shares * holding.currentPrice, 0);
}

function updatePortfolioSummary() {
  const totalInvested = holdings.reduce((sum, holding) => sum + getCostBasis(holding), 0);
  const totalValue = getPortfolioValue();
  const totalGain = totalValue - totalInvested;
  const totalReturn = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
  const gainClass = totalGain >= 0 ? "positive" : "negative";

  heroPortfolioValue.textContent = formatMoney(totalValue);
  heroPortfolioReturn.textContent = holdings.length ? `${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}%` : t("addHoldingsLower");
  heroPortfolioReturn.classList.toggle("negative", totalGain < 0);
  holdingCount.textContent = String(holdings.length);
  investedCapital.textContent = formatMoney(totalInvested);
  unrealizedGain.textContent = formatMoney(totalGain);
  unrealizedGain.className = gainClass;
  trackedValueShare.textContent = holdings.length ? "100%" : "0%";
  investedShare.textContent = totalValue > 0 ? `${Math.min(100, (totalInvested / totalValue) * 100).toFixed(0)}%` : "0%";
  gainShare.textContent = totalInvested > 0 ? `${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(1)}%` : "0%";

  const investedHeight = totalValue > 0 ? Math.max(12, Math.min(92, (totalInvested / totalValue) * 92)) : 12;
  const gainHeight = totalValue > 0 ? Math.max(12, Math.min(92, (Math.abs(totalGain) / totalValue) * 92)) : 12;
  equityBar.style.height = holdings.length ? "92%" : "18%";
  etfBar.style.height = `${investedHeight}%`;
  bondBar.style.height = `${gainHeight}%`;
  cashBar.style.height = holdings.length ? "22%" : "12%";
}

async function refreshHoldingPrices() {
  if (!holdings.length) {
    return;
  }

  const refreshed = [];
  for (const holding of holdings) {
    try {
      const quote = await getQuote(holding.symbol);
      refreshed.push({
        ...holding,
        currentPrice: Number(quote.close || quote.price),
        currency: quote.currency || holding.currency || "USD",
      });
    } catch (error) {
      refreshed.push(holding);
    }
  }
  holdings = refreshed;
  saveHoldings();
  renderHoldings();
}

function randomNormal() {
  const u1 = Math.random() || 0.000001;
  const u2 = Math.random() || 0.000001;
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function percentile(values, percentileValue) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor((percentileValue / 100) * sorted.length)));
  return sorted[index];
}

async function runHistoricalPortfolioAnalysis() {
  if (!holdings.length) {
    portfolioAnalyticsGrid.innerHTML = metricCard(t("analysisUnavailable"), "--", t("analyticsWaitingNote"));
    return;
  }

  portfolioAnalyticsGrid.innerHTML = metricCard(t("loading"), "--", t("analyzingPortfolio"));

  const totalValue = getPortfolioValue();
  const analyses = [];

  for (const holding of holdings) {
    try {
      const data = await getTimeSeries(holding.symbol, "1Y");
      const closes = data.values.map((point) => point.close).filter(Number.isFinite);
      if (closes.length < 30) {
        continue;
      }

      const returns = [];
      for (let i = 1; i < closes.length; i += 1) {
        returns.push(Math.log(closes[i] / closes[i - 1]));
      }

      const meanDaily = average(returns);
      const variance = average(returns.map((value) => (value - meanDaily) ** 2));
      const annualReturn = Math.exp(meanDaily * 252) - 1;
      const annualVolatility = Math.sqrt(variance) * Math.sqrt(252);
      const weight = totalValue > 0 ? (holding.shares * holding.currentPrice) / totalValue : 0;

      analyses.push({ annualReturn, annualVolatility, weight });
    } catch (error) {
      // Skip symbols without enough historical data.
    }
  }

  if (!analyses.length || totalValue <= 0) {
    portfolioAnalyticsGrid.innerHTML = metricCard(t("analysisUnavailable"), "--", t("analysisUnavailableNote"));
    return;
  }

  const expectedReturn = analyses.reduce((sum, item) => sum + item.annualReturn * item.weight, 0);
  const expectedVolatility = Math.sqrt(analyses.reduce((sum, item) => sum + (item.annualVolatility * item.weight) ** 2, 0));
  const simulations = [];

  for (let simulation = 0; simulation < 500; simulation += 1) {
    let simulatedValue = totalValue;
    for (let day = 0; day < 252; day += 1) {
      const dailyMean = expectedReturn / 252;
      const dailyVolatility = expectedVolatility / Math.sqrt(252);
      simulatedValue *= Math.exp(dailyMean - (dailyVolatility ** 2) / 2 + dailyVolatility * randomNormal());
    }
    simulations.push(simulatedValue);
  }

  portfolioAnalyticsGrid.innerHTML = [
    metricCard(t("historicalReturn"), formatPercent(expectedReturn * 100), t("historicalReturnNote")),
    metricCard(t("annualizedVolatility"), formatPercent(expectedVolatility * 100), t("annualizedVolatilityNote")),
    metricCard(t("monteCarloMedian"), formatMoney(percentile(simulations, 50)), t("monteCarloMedianNote")),
    metricCard(
      t("monteCarloRange"),
      `${formatMoney(percentile(simulations, 10))} / ${formatMoney(percentile(simulations, 90))}`,
      t("monteCarloRangeNote"),
    ),
  ].join("");
}

runPortfolioAnalysis.addEventListener("click", runHistoricalPortfolioAnalysis);

holdingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const symbol = holdingTicker.value.trim().toUpperCase();
  const avgCost = Number(avgCostInput.value);
  const shares = Number(shareAmountInput.value);
  const costBasis = avgCost * shares;

  if (!symbol || avgCost <= 0 || shares <= 0) {
    holdingsBody.innerHTML = `
      <tr>
        <td colspan="11">${t("invalidHoldingSmart")}</td>
      </tr>
    `;
    return;
  }

  holdingsBody.innerHTML = `
    <tr>
      <td colspan="11">${t("fetchingPrice", { symbol })}</td>
    </tr>
  `;

  try {
    const quote = await getQuote(symbol);
    holdings.push({
      id: crypto.randomUUID(),
      symbol,
      purchaseDate: purchaseDate.value,
      avgCost,
      costBasis,
      shares,
      assetType: assetTypeInput.value,
      accountType: accountTypeInput.value,
      currentPrice: Number(quote.close || quote.price),
      currency: quote.currency || "USD",
    });
    saveHoldings();
    renderHoldings();
    holdingForm.reset();
    holdingTicker.value = symbol;
  } catch (error) {
    holdingsBody.innerHTML = `
      <tr>
        <td colspan="11">${error.message}</td>
      </tr>
    `;
  }
});

renderHoldings();
refreshHoldingPrices();

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
    signals.push(peRatio > 30 ? (currentLanguage === "zh" ? "P/E 显示估值偏成长定价" : "valuation looks growth-priced by P/E") : (currentLanguage === "zh" ? "P/E 相比高成长股票没有那么激进" : "P/E is less demanding than many high-growth names"));
  }

  if (Number.isFinite(roe)) {
    signals.push(roe > 20 ? (currentLanguage === "zh" ? "ROE 显示盈利能力较强" : "profitability appears strong by ROE") : (currentLanguage === "zh" ? "ROE 需要与同行比较" : "ROE needs comparison with peers"));
  }

  if (Number.isFinite(debtEquity)) {
    signals.push(debtEquity > 2 ? (currentLanguage === "zh" ? "杠杆水平值得进一步检查" : "leverage deserves closer review") : (currentLanguage === "zh" ? "按该输入看杠杆并不极端" : "leverage is not extreme by this simple input"));
  }

  if (Number.isFinite(revenueGrowth)) {
    signals.push(revenueGrowth > 10 ? (currentLanguage === "zh" ? "增长是投资逻辑的重要部分" : "growth is a key part of the thesis") : (currentLanguage === "zh" ? "增长假设可能需要更保守" : "growth assumptions may need to be conservative"));
  }

  if (Number.isFinite(dividendYield) && dividendYield > 2) {
    signals.push(currentLanguage === "zh" ? "股息对总回报有明显贡献" : "dividends contribute meaningfully to total return");
  }

  return signals.join(currentLanguage === "zh" ? "；" : "; ") + (currentLanguage === "zh" ? "。" : ".");
}

async function analyzeStock(event) {
  event.preventDefault();

  const symbol = analysisTicker.value.trim().toUpperCase();
  if (!symbol) {
    analysisStatus.textContent = t("enterTicker");
    return;
  }

  analysisStatus.textContent = t("retrievingQuote", { symbol });
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

    analysisStatus.textContent = t("latestPrice", {
      symbol: quote.name || symbol,
      currency: quote.currency || "USD",
      price: price.toFixed(2),
    });
    ratioGrid.innerHTML = [
      metricCard(t("peRatio"), formatMultiple(peRatio), t("peNote")),
      metricCard(t("pbRatio"), formatMultiple(pbRatio), t("pbNote")),
      metricCard(t("dividendYield"), formatPercent(dividendYield), t("dividendNote")),
      metricCard(t("revenueGrowthCard"), formatPercent(revenueGrowth), t("revenueNote")),
      metricCard("ROE", formatPercent(roe), t("roeNote")),
      metricCard(t("debtEquity"), formatMultiple(debtEquity), t("debtNote")),
    ].join("");
    analysisNote.textContent = buildInterpretation({ peRatio, pbRatio, dividendYield, revenueGrowth, roe, debtEquity });
  } catch (error) {
    analysisStatus.textContent = error.message;
    analysisNote.textContent = t("analyzerNeedsQuote");
  }
}

analysisForm.addEventListener("submit", analyzeStock);

function setActiveRange(range) {
  activeRange = range;
  rangeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === range);
  });
}

async function getTimeSeries(symbol, range) {
  const response = await fetch(`/api/time-series?symbol=${encodeURIComponent(symbol)}&range=${encodeURIComponent(range)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to retrieve chart data.");
  }

  return data;
}

function formatCurrencyValue(value, currency = "USD") {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return `${currency} ${value.toFixed(2)}`;
}

function updateChartHeader(symbol, range, data) {
  const values = data.values;
  const first = values[0]?.close;
  const last = values[values.length - 1]?.close;
  const change = last - first;
  const changePercent = (change / first) * 100;
  const currency = data.meta?.currency || "USD";
  const name = data.meta?.instrument_name || symbol;

  chartMeta.textContent = `${name} · ${range}`;
  chartPrice.textContent = formatCurrencyValue(last, currency);
  chartChange.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)} (${changePercent.toFixed(2)}%)`;
  chartChange.classList.toggle("negative", change < 0);
}

function drawPriceChart(values) {
  const ctx = priceChart.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = priceChart.clientWidth;
  const height = priceChart.clientHeight;
  const padding = 34;

  priceChart.width = width * ratio;
  priceChart.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (values.length < 2) {
    ctx.fillStyle = "#90a4b8";
    ctx.font = "16px system-ui";
    ctx.fillText(t("notEnoughChart"), padding, height / 2);
    return;
  }

  const prices = values.map((point) => point.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const spread = max - min || 1;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  ctx.strokeStyle = "rgba(142, 214, 255, 0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = padding + (chartHeight / 3) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  ctx.beginPath();
  values.forEach((point, index) => {
    const x = padding + (chartWidth * index) / (values.length - 1);
    const y = padding + chartHeight - ((point.close - min) / spread) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
      return;
    }

    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = prices[prices.length - 1] >= prices[0] ? "#4dffb5" : "#ff6f61";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#90a4b8";
  ctx.font = "12px system-ui";
  ctx.fillText(max.toFixed(2), padding, padding - 10);
  ctx.fillText(min.toFixed(2), padding, height - 10);
}

function getCanvasSize(canvas) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  return { ctx, width, height };
}

function average(numbers) {
  if (!numbers.length) {
    return Number.NaN;
  }
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

function movingAverage(values, days) {
  if (values.length < days) {
    return Number.NaN;
  }
  return average(values.slice(-days).map((point) => point.close));
}

function drawKlineChart(values) {
  const { ctx, width, height } = getCanvasSize(klineChart);
  const padding = 34;
  const volumeHeight = Math.max(58, height * 0.18);
  const priceHeight = height - padding * 2 - volumeHeight - 18;

  if (values.length < 2) {
    ctx.fillStyle = "#90a4b8";
    ctx.font = "16px system-ui";
    ctx.fillText(t("notEnoughKline"), padding, height / 2);
    return;
  }

  const highs = values.map((point) => Number.isFinite(point.high) ? point.high : point.close);
  const lows = values.map((point) => Number.isFinite(point.low) ? point.low : point.close);
  const volumes = values.map((point) => Number.isFinite(point.volume) ? point.volume : 0);
  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const priceSpread = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...volumes, 1);
  const chartWidth = width - padding * 2;
  const candleGap = chartWidth / values.length;
  const candleWidth = Math.max(3, Math.min(14, candleGap * 0.58));

  ctx.strokeStyle = "rgba(142, 214, 255, 0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = padding + (priceHeight / 3) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  values.forEach((point, index) => {
    const open = Number.isFinite(point.open) ? point.open : point.close;
    const high = Number.isFinite(point.high) ? point.high : point.close;
    const low = Number.isFinite(point.low) ? point.low : point.close;
    const close = point.close;
    const x = padding + candleGap * index + candleGap / 2;
    const highY = padding + priceHeight - ((high - minPrice) / priceSpread) * priceHeight;
    const lowY = padding + priceHeight - ((low - minPrice) / priceSpread) * priceHeight;
    const openY = padding + priceHeight - ((open - minPrice) / priceSpread) * priceHeight;
    const closeY = padding + priceHeight - ((close - minPrice) / priceSpread) * priceHeight;
    const top = Math.min(openY, closeY);
    const bodyHeight = Math.max(2, Math.abs(closeY - openY));
    const positive = close >= open;
    const color = positive ? "#4dffb5" : "#ff6f61";

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();
    ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyHeight);

    const volumeY = height - padding;
    const barHeight = (volumes[index] / maxVolume) * volumeHeight;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(x - candleWidth / 2, volumeY - barHeight, candleWidth, barHeight);
    ctx.globalAlpha = 1;
  });

  ctx.fillStyle = "#90a4b8";
  ctx.font = "12px system-ui";
  ctx.fillText(maxPrice.toFixed(2), padding, padding - 10);
  ctx.fillText(minPrice.toFixed(2), padding, padding + priceHeight + 14);
}

function classifyTrend(values) {
  const last = values[values.length - 1]?.close;
  const first = values[0]?.close;
  const ma5 = movingAverage(values, 5);
  const ma20 = movingAverage(values, 20);
  const changePercent = ((last - first) / first) * 100;

  if (!Number.isFinite(last) || !Number.isFinite(first)) {
    return {
      changePercent: Number.NaN,
      ma5,
      ma20,
      label: t("notEnoughData"),
      note: t("notEnoughDataNote"),
    };
  }

  if (Number.isFinite(ma5) && Number.isFinite(ma20) && last > ma5 && ma5 > ma20) {
    return {
      changePercent,
      ma5,
      ma20,
      label: t("bullishMomentum"),
      note: t("bullishNote"),
    };
  }

  if (Number.isFinite(ma5) && Number.isFinite(ma20) && last < ma5 && ma5 < ma20) {
    return {
      changePercent,
      ma5,
      ma20,
      label: t("bearishPressure"),
      note: t("bearishNote"),
    };
  }

  return {
    changePercent,
    ma5,
    ma20,
    label: t("mixedTrend"),
    note: t("mixedNote"),
  };
}

function updateMarketAnalysis(symbol, range, data) {
  const values = data.values;
  const last = values[values.length - 1]?.close;
  const first = values[0]?.close;
  const high = Math.max(...values.map((point) => Number.isFinite(point.high) ? point.high : point.close));
  const low = Math.min(...values.map((point) => Number.isFinite(point.low) ? point.low : point.close));
  const trend = classifyTrend(values);
  const rangeMove = ((last - first) / first) * 100;
  const volatility = ((high - low) / first) * 100;
  const yahooSymbol = encodeURIComponent(symbol.replace(".", "-"));

  klineTitle.textContent = `${symbol} OHLC`;
  volumeLabel.textContent = values.some((point) => Number.isFinite(point.volume) && point.volume > 0) ? t("volumeIncluded") : t("noVolume");
  financeLink.href = `https://finance.yahoo.com/quote/${yahooSymbol}`;

  marketAnalysisGrid.innerHTML = [
    metricCard(t("trendSignal"), trend.label, trend.note),
    metricCard(t("rangeReturn"), formatPercent(rangeMove), t("rangeReturnNote", { range })),
    metricCard("MA5", formatCurrencyValue(trend.ma5, data.meta?.currency || "USD"), t("ma5Note")),
    metricCard("MA20", formatCurrencyValue(trend.ma20, data.meta?.currency || "USD"), t("ma20Note")),
    metricCard(t("rangeHighLow"), `${high.toFixed(2)} / ${low.toFixed(2)}`, t("highLowNote")),
    metricCard(t("volatilityRange"), formatPercent(volatility), t("volatilityNote")),
  ].join("");
}

async function renderTrend(symbol = trendSymbol.value.trim().toUpperCase(), range = activeRange) {
  const cleanSymbol = symbol.trim().toUpperCase();
  if (!cleanSymbol) {
    chartMessage.textContent = t("enterTicker");
    return;
  }

  trendSymbol.value = cleanSymbol;
  chartMeta.textContent = `${cleanSymbol} · ${range}`;
  chartPrice.textContent = t("loading");
  chartChange.textContent = "--";
  chartChange.classList.remove("negative");
  chartMessage.textContent = t("retrievingHistory");
  klineTitle.textContent = t("loading");
  marketAnalysisGrid.innerHTML = "";

  try {
    const data = await getTimeSeries(cleanSymbol, range);
    latestTrendValues = data.values;
    latestTrendData = data;
    latestTrendSymbol = cleanSymbol;
    updateChartHeader(cleanSymbol, range, data);
    drawPriceChart(latestTrendValues);
    drawKlineChart(latestTrendValues);
    updateMarketAnalysis(cleanSymbol, range, data);
    chartMessage.textContent = t("showingPoints", {
      count: data.values.length,
      interval: data.interval,
    });
  } catch (error) {
    chartPrice.textContent = "--";
    chartChange.textContent = "--";
    latestTrendValues = [];
    latestTrendData = null;
    latestTrendSymbol = cleanSymbol;
    drawPriceChart([]);
    drawKlineChart([]);
    klineTitle.textContent = t("candlestick");
    volumeLabel.textContent = t("noVolume");
    marketAnalysisGrid.innerHTML = metricCard(t("noData"), t("unavailable"), t("noDataNote"));
    chartMessage.textContent = error.message;
  }
}

trendForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await renderTrend();
});

quickSymbolButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    await renderTrend(button.dataset.symbol, activeRange);
  });
});

rangeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    setActiveRange(button.dataset.range);
    await renderTrend(trendSymbol.value, activeRange);
  });
});

window.addEventListener("resize", () => {
  drawPriceChart(latestTrendValues);
  drawKlineChart(latestTrendValues);
});

applyLanguage();
showView(getInitialView());
renderTrend("AAPL", activeRange);
