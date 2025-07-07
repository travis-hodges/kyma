import React, { useEffect, useRef } from 'react'

// Mock market data for animation
const mockMarketData = {
  tickers: [
    { symbol: 'AAPL', price: 185.92, change: 2.34, pe: 28.5, volume: '45.2M', marketCap: '2.9T' },
    { symbol: 'MSFT', price: 378.85, change: -1.23, pe: 32.1, volume: '23.8M', marketCap: '2.8T' },
    { symbol: 'GOOGL', price: 142.56, change: 0.87, pe: 25.8, volume: '18.9M', marketCap: '1.8T' },
    { symbol: 'AMZN', price: 145.24, change: -0.45, pe: 60.2, volume: '32.1M', marketCap: '1.5T' },
    { symbol: 'TSLA', price: 248.42, change: 5.67, pe: 75.3, volume: '89.7M', marketCap: '789B' },
    { symbol: 'NVDA', price: 485.09, change: 12.34, pe: 45.6, volume: '67.3M', marketCap: '1.2T' },
    { symbol: 'META', price: 334.92, change: -2.18, pe: 22.4, volume: '28.5M', marketCap: '850B' },
    { symbol: 'NFLX', price: 485.09, change: 3.21, pe: 35.7, volume: '12.8M', marketCap: '215B' },
    { symbol: 'AMD', price: 128.45, change: 4.56, pe: 28.9, volume: '45.2M', marketCap: '207B' },
    { symbol: 'CRM', price: 245.67, change: -1.89, pe: 42.3, volume: '8.9M', marketCap: '240B' },
    { symbol: 'ORCL', price: 118.34, change: 0.92, pe: 18.7, volume: '15.6M', marketCap: '320B' },
    { symbol: 'ADBE', price: 567.89, change: 7.34, pe: 38.2, volume: '6.7M', marketCap: '258B' },
    { symbol: 'INTC', price: 45.67, change: -0.23, pe: 15.4, volume: '34.8M', marketCap: '193B' },
    { symbol: 'CSCO', price: 48.92, change: 1.45, pe: 13.8, volume: '22.1M', marketCap: '197B' },
    { symbol: 'IBM', price: 167.34, change: -0.67, pe: 22.1, volume: '4.8M', marketCap: '151B' }
  ],
  indices: [
    { symbol: 'S&P 500', price: 4567.89, change: 23.45, volume: '2.1B' },
    { symbol: 'NASDAQ', price: 14234.56, change: 67.89, volume: '3.4B' },
    { symbol: 'DOW', price: 34567.89, change: -123.45, volume: '1.8B' },
    { symbol: 'VIX', price: 18.45, change: -2.34, volume: '45.2M' },
    { symbol: 'RUT', price: 1892.34, change: 12.67, volume: '567M' }
  ],
  crypto: [
    { symbol: 'BTC', price: '$43,567', change: '+2.34%' },
    { symbol: 'ETH', price: '$2,345', change: '+1.67%' },
    { symbol: 'SOL', price: '$98.76', change: '+5.43%' },
    { symbol: 'ADA', price: '$0.45', change: '-0.23%' },
    { symbol: 'DOT', price: '$7.89', change: '+3.21%' }
  ]
}

// Generate price chart data
const generatePriceData = (basePrice, volatility = 0.02, points = 20) => {
  const data = []
  let price = basePrice
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.5) * volatility * price
    data.push(price)
  }
  return data
}

// Technical indicators
const technicalData = [
  'RSI(14): 67.3 | MACD: 0.0234 | BB%: 78.2',
  'Stoch K: 84.1 | Stoch D: 79.6 | Williams %R: -15.9',
  'CCI: 156.7 | ADX: 23.4 | ATR: 2.34',
  'OBV: +12.4M | VWAP: $184.67 | Pivot: $183.45',
  'Ichimoku: Tenkan 182.3 | Kijun 181.8 | Senkou A 180.2',
  'Fibonacci: 38.2% @ $179.2 | 50% @ $176.8 | 61.8% @ $174.4',
  'Volume Profile: POC $183.2 | Value Area $181.5-$185.1',
  'Order Flow: Bid 2.3M | Ask 1.8M | Spread 0.12',
  'Market Microstructure: Tick Size 0.01 | Lot Size 100',
  'Correlation Matrix: SPY 0.87 | QQQ 0.92 | IWM 0.76',
  'Beta: 1.23 | Alpha: 0.045 | Sharpe: 1.67',
  'VaR (95%): 2.34% | Expected Shortfall: 3.12%',
  'Implied Volatility: 28.4% | Historical Vol: 25.7%',
  'Skewness: -0.34 | Kurtosis: 4.2 | Jarque-Bera: 156.7',
  'Cointegration: Engle-Granger p=0.023 | Johansen r=2',
  'GARCH(1,1): α=0.12 | β=0.85 | ω=0.00034',
  'Kalman Filter: State Estimate 184.2 | Covariance 0.0234',
  'Monte Carlo: 95% CI [$178.4, $189.7] | 10k simulations',
  'Black-Scholes: Call $5.67 | Put $3.23 | Delta 0.67',
  'Greeks: Gamma 0.023 | Theta -0.045 | Vega 0.156'
]

// Code snippets
const codeSnippets = [
  'def calculate_risk_metrics(portfolio):\n    var_95 = np.percentile(returns, 5)\n    return var_95',
  'class MarketDataProcessor:\n    def __init__(self):\n        self.websocket = WebSocket()\n        self.orderbook = OrderBook()',
  'async def execute_trade(symbol, side, qty):\n    order = Order(symbol, side, qty)\n    await exchange.submit(order)',
  'function calculateGreeks(option) {\n    const delta = option.delta();\n    const gamma = option.gamma();\n    return {delta, gamma};',
  'SELECT AVG(price) FROM trades \nWHERE symbol = "AAPL" \nAND timestamp > NOW() - INTERVAL 1 HOUR',
  'def backtest_strategy(data):\n    signals = generate_signals(data)\n    returns = calculate_returns(signals)\n    sharpe = returns.mean() / returns.std()',
  'class RiskManager:\n    def __init__(self):\n        self.position_limits = {\n            "max_exposure": 0.02,\n            "max_drawdown": 0.15\n        }',
  'function calculateCorrelationMatrix(assets) {\n    const corr = assets.map(a => \n        assets.map(b => pearson(a, b))\n    );\n    return corr;',
  'def monte_carlo_simulation(price, volatility, days):\n    paths = np.random.normal(0, 1, (10000, days))\n    return price * np.exp(paths * volatility)',
  'class OrderBook:\n    def __init__(self):\n        self.bids = SortedDict()\n        self.asks = SortedDict()\n        self.depth = 10',
  'async def stream_market_data():\n    async with websockets.connect(ws_url) as ws:\n        async for msg in ws:\n            yield parse_message(msg)',
  'function calculateVaR(returns, confidence) {\n    const sorted = returns.sort((a,b) => a-b);\n    const index = Math.floor(confidence * returns.length);\n    return sorted[index];',
  'def kalman_filter(measurements):\n    x = np.array([0, 0])  # state\n    P = np.eye(2) * 1000  # uncertainty\n    for z in measurements:\n        x, P = predict(x, P)\n        x, P = update(x, P, z)\n    return x',
  'class PortfolioOptimizer:\n    def __init__(self):\n        self.constraints = [\n            {"type": "eq", "fun": lambda x: np.sum(x) - 1}\n        ]',
  'function calculateImpliedVolatility(option, market_price) {\n    const f = (vol) => blackScholes(option, vol) - market_price;\n    return newtonMethod(f, 0.3);',
  'def cointegration_test(series1, series2):\n    model = sm.OLS(series1, series2).fit()\n    residuals = model.resid\n    return adfuller(residuals)',
  'class MarketMicrostructure:\n    def __init__(self):\n        self.tick_size = 0.01\n        self.lot_size = 100\n        self.min_spread = 0.001',
  'function calculateGARCH(returns) {\n    const model = new GARCHModel({\n        p: 1, q: 1,\n        omega: 0.0001,\n        alpha: 0.1,\n        beta: 0.8\n    });\n    return model.fit(returns);',
  'def calculate_technical_indicators(data):\n    rsi = talib.RSI(data.close, timeperiod=14)\n    macd, signal, hist = talib.MACD(data.close)\n    bb_upper, bb_middle, bb_lower = talib.BBANDS(data.close)'
]

// Candlestick data for charts
const candlestickData = [
  { open: 185, high: 187, low: 184, close: 186, color: '#00FF88' },
  { open: 186, high: 188, low: 185, close: 187, color: '#00FF88' },
  { open: 187, high: 189, low: 186, close: 185, color: '#FF4444' },
  { open: 185, high: 186, low: 183, close: 184, color: '#FF4444' },
  { open: 184, high: 187, low: 184, close: 186, color: '#00FF88' }
]

// Trend lines data
const trendLines = [
  { x1: 0, y1: 0, x2: 200, y2: 20, color: '#00FF88' },
  { x1: 0, y1: 0, x2: 200, y2: -10, color: '#FF4444' },
  { x1: 0, y1: 0, x2: 200, y2: 30, color: '#00FFFF' }
]

// Fibonacci retracement levels
const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]

// News headlines
const newsData = [
  'BREAKING: Fed announces 25bps rate hike, dot plot shows 2 more hikes in 2024',
  'ECB Governing Council member Schnabel signals hawkish stance on inflation',
  'BOJ maintains negative rates at -0.1%, yield curve control unchanged',
  'PBOC injects 200B yuan via MLF, 7-day repo rate steady at 2.1%',
  'SEC approves spot Bitcoin ETF applications from BlackRock, Fidelity, Ark',
  'CFTC reports record speculative positioning in crude oil futures',
  'BIS Quarterly Review: Global debt reaches $307T, debt-to-GDP at 349%',
  'IMF World Economic Outlook: Global growth revised to 2.9% for 2024',
  'OECD Composite Leading Indicators: US 99.8, Eurozone 99.2, Japan 100.1',
  'G20 Finance Ministers communiqué: Digital currency framework agreement',
  'Basel III implementation: Tier 1 capital requirements increased to 10.5%',
  'ESMA consultation paper: MiFID II market structure reforms proposed',
  'CFPB finalizes rule on open banking, API standards for data sharing',
  'Federal Reserve Bank of New York: Reverse repo facility usage at $1.2T',
  'Bank of England Financial Stability Report: Commercial real estate risks elevated',
  'European Banking Authority: Stress test results show 15 banks need capital buffers',
  'Bank of Japan: Yield curve control adjustments, 10Y JGB target ±0.5%',
  'People\'s Bank of China: Digital yuan pilot expands to 26 cities',
  'Reserve Bank of Australia: Cash rate target maintained at 4.35%',
  'Bank of Canada: Overnight rate target at 5.0%, quantitative tightening continues'
]

// Trading alerts
const alertData = [
  '🚨 CRITICAL: Margin call triggered on account #AX-8472, deficit $45,230',
  '⚠️ RISK ALERT: Portfolio VaR exceeds 2.5% threshold, current: 3.12%',
  '🔔 PRICE ALERT: AAPL breaks resistance at $185.50, volume 2.3x average',
  '⚡ VOLUME SPIKE: TSLA trades 15.7M shares in 5 minutes, 4.2x normal',
  '📈 BREAKOUT: NVDA clears $490 resistance, RSI divergence confirmed',
  '📉 SUPPORT BREACH: META falls below $340 support, next level $335',
  '🎯 TARGET HIT: GOOGL reaches $145 target, profit taking recommended',
  '💥 GAP DETECTED: AMZN opens $8.50 above previous close, gap fill likely',
  '🚨 LIQUIDATION: Forced selling detected in crypto futures, BTC -12%',
  '⚠️ CORRELATION BREAKDOWN: Tech sector correlation drops from 0.87 to 0.45',
  '🔔 EARNINGS ALERT: MSFT beats EPS by $0.15, revenue up 18% YoY',
  '⚡ OPTIONS FLOW: Unusual call activity in NFLX, 50k contracts at $450 strike',
  '📈 DIVERGENCE: Price making higher highs, RSI making lower highs',
  '📉 DEATH CROSS: 50-day MA crosses below 200-day MA on SPY',
  '🎯 FIBONACCI: Price reaches 61.8% retracement level, reversal expected',
  '💥 FLASH CRASH: Algorithmic trading cascade triggers 5% market drop'
]

// Order types
const orderData = [
  'BUY 10,000 AAPL @ $185.50 STOP | TIF: GTC | Route: ARCA',
  'SELL 5,000 TSLA @ $248.00 LIMIT | TIF: DAY | Route: EDGX',
  'BUY STOP 2,000 NVDA @ $490.00 | TIF: GTC | Route: BATS',
  'SELL LIMIT 3,000 META @ $340.00 | TIF: DAY | Route: IEX',
  'MARKET BUY 15,000 GOOGL | TIF: IOC | Route: ARCA',
  'STOP LOSS 8,000 AMZN @ $140.00 | TIF: GTC | Route: EDGX',
  'TRAILING STOP 4,000 MSFT @ 2% | TIF: GTC | Route: BATS',
  'BUY TO COVER 6,000 NFLX | TIF: FOK | Route: ARCA',
  'SELL SHORT 10,000 AMD @ $120.00 | TIF: DAY | Route: IEX',
  'OPTION BUY 500 AAPL 190 CALL @ $3.45 | Exp: 2024-03-15',
  'OPTION SELL 300 TSLA 250 PUT @ $8.20 | Exp: 2024-02-16',
  'SPREAD BUY 100 NVDA 500/510 CALL | Debit: $4.50 | Exp: 2024-04-19',
  'STRADDLE SELL 200 META 340 CALL/PUT | Credit: $12.30 | Exp: 2024-03-15',
  'IRON CONDOR 50 SPY 450/455/465/470 | Credit: $1.85 | Exp: 2024-02-16',
  'BUTTERFLY 75 QQQ 380/385/390 | Debit: $2.10 | Exp: 2024-03-15'
]

// Portfolio metrics
const portfolioData = [
  'Portfolio: +2.34% MTD | +8.67% YTD | +23.45% 1Y',
  'P&L: +$12,450.67 | Unrealized: +$8,234.12 | Realized: +$4,216.55',
  'Beta: 1.23 | Alpha: 0.045 | Information Ratio: 1.67',
  'Sharpe: 1.67 | Sortino: 2.34 | Calmar: 3.45',
  'Max Drawdown: -8.5% | Current Drawdown: -2.3% | Recovery: 73%',
  'Exposure: 87.3% | Cash: 12.7% | Margin: 15.2%',
  'Sector Allocation: Tech 45% | Finance 23% | Healthcare 18% | Energy 14%',
  'Geographic: US 78% | Europe 12% | Asia 8% | Emerging 2%',
  'Market Cap: Large 65% | Mid 25% | Small 10%',
  'Style: Growth 60% | Value 30% | Blend 10%',
  'Volatility: 18.2% | Downside Deviation: 12.4%',
  'Correlation: 0.67 | Diversification Ratio: 0.78',
  'Skewness: -0.3 | Kurtosis: 4.2 | Jarque-Bera: 156.7',
  'VaR (95%): 2.1% | Expected Shortfall: 3.4% | Conditional VaR: 2.8%',
  'Tracking Error: 1.23% | Information Ratio: 1.67 | Active Share: 45%'
]

// Risk metrics
const riskData = [
  'VaR (95%): 2.1% | VaR (99%): 3.4% | Expected Shortfall: 4.2%',
  'Max Drawdown: 8.5% | Average Drawdown: 3.2% | Recovery Time: 45 days',
  'Volatility: 18.2% | Downside Volatility: 12.4% | Upside Volatility: 24.1%',
  'Correlation Matrix: SPY 0.87 | QQQ 0.92 | IWM 0.76 | VIX -0.45',
  'Skewness: -0.34 | Kurtosis: 4.2 | Jarque-Bera: 156.7 | p-value: 0.001',
  'GARCH(1,1): α=0.12 | β=0.85 | ω=0.00034 | Persistence: 0.97',
  'Conditional Volatility: 15.6% | Unconditional Vol: 18.2%',
  'Tail Dependence: Upper 0.23 | Lower 0.45 | Asymmetric: Yes',
  'Copula: Gaussian | Dependence Parameter: 0.67 | Kendall\'s Tau: 0.45',
  'Extreme Value Theory: Return Level (10Y): -12.4% | Confidence: [15.2%, 9.8%]',
  'Regime Switching: 2 regimes | Current regime: High volatility | Probability: 0.78',
  'Stress Testing: 2008 scenario impact: -23.4% | 2020 scenario impact: -18.7%'
]

// Earnings data
const earningsData = [
  'EPS: $2.45 (+15.2% YoY) | Revenue: $12.3B (+8.7% YoY) | Beat: +12.3%',
  'Guidance: Q1 EPS $2.60-$2.80 | Revenue $13.1B-$13.5B | Growth: +8-12%',
  'P/E: 24.5 | Forward P/E: 22.1 | PEG: 1.67 | P/S: 3.4',
  'EBITDA: $4.2B | EBITDA Margin: 34.1% | Operating Margin: 28.7%',
  'Free Cash Flow: $3.1B | FCF Yield: 4.2% | Dividend Yield: 1.8%',
  'ROE: 18.7% | ROA: 12.3% | ROIC: 15.6% | WACC: 8.9%',
  'Debt/EBITDA: 1.8x | Interest Coverage: 12.4x | Current Ratio: 2.1',
  'Inventory Turnover: 8.7x | Days Sales Outstanding: 45 | Cash Conversion: 67',
  'Gross Margin: 42.3% | Operating Margin: 28.7% | Net Margin: 21.4%',
  'Revenue Growth: +18.7% | EPS Growth: +15.2% | Book Value Growth: +12.4%',
  'Analyst Estimates: Buy 23 | Hold 8 | Sell 2 | Consensus: Overweight',
  'Price Targets: High $210 | Low $165 | Median $195 | Upside: +8.2%'
]

// Dividend data
const dividendData = [
  'Yield: 2.4% | Payout Ratio: 45.2% | Coverage Ratio: 2.3x',
  'Payout: $0.85 | Ex-Date: 2024-12-15 | Pay Date: 2025-01-15',
  'Growth Rate: +5.2% | 5-Year CAGR: +8.7% | 10-Year CAGR: +6.4%',
  'Dividend Aristocrat: 25+ years | Consecutive Increases: 28 years',
  'Dividend Safety Score: A+ | S&P Rating: AA- | Moody\'s: Aa3',
  'Free Cash Flow Coverage: 3.2x | Earnings Coverage: 2.3x | Interest Coverage: 12.4x',
  'Dividend Growth Model: DDM Value $198.45 | Gordon Growth: $185.67',
  'Dividend Yield vs 10Y Treasury: +1.2% | vs S&P 500: +0.8%',
  'Sector Average Yield: 1.8% | Industry Average: 2.1% | Company: 2.4%',
  'Dividend Sustainability: Strong | Payout Trend: Increasing | Risk: Low',
  'Special Dividends: $2.00 (2023) | Stock Dividends: 2:1 (2022)',
  'DRIP Available: Yes | DRIP Discount: 2% | Reinvestment Rate: 15%'
]

// Analyst ratings
const analystData = [
  'Consensus: Buy 23 | Hold 8 | Sell 2 | Strong Buy: 15',
  'Target: $195 (+8.2%) | High: $210 | Low: $165 | Median: $195',
  'Rating Changes: Upgrades 3 | Downgrades 1 | Initiations 2 | Reiterations 18',
  'EPS Estimates: Current $8.45 | Next Year $9.67 | 2-Year $11.23',
  'Revenue Estimates: Current $45.2B | Next Year $52.1B | 2-Year $61.8B',
  'Price Target Revisions: +5.2% avg | +2.1% median | Range: -3.4% to +12.7%',
  'Analyst Coverage: 33 firms | Average Experience: 8.7 years | Accuracy: 78%',
  'Institutional Ownership: 67.8% | Insider Ownership: 2.3% | Retail: 29.9%',
  'Short Interest: 4.2% | Days to Cover: 3.4 | Short Ratio: 0.8',
  'Options Flow: Call/Pall Ratio 1.8 | Put/Call Ratio 0.56 | Implied Move: ±8.4%',
  'Technical Consensus: Bullish 18 | Neutral 12 | Bearish 3',
  'Fundamental Consensus: Strong Buy 15 | Buy 8 | Hold 8 | Sell 2'
]

// Sector performance
const sectorData = [
  'Technology: +3.2% | P/E: 28.4 | Beta: 1.15 | Volatility: 22.3%',
  'Financials: +1.8% | P/E: 12.7 | Beta: 1.08 | Volatility: 18.9%',
  'Healthcare: +0.9% | P/E: 18.9 | Beta: 0.87 | Volatility: 16.4%',
  'Energy: -0.5% | P/E: 8.9 | Beta: 1.23 | Volatility: 24.7%',
  'Consumer Discretionary: +2.1% | P/E: 22.1 | Beta: 1.12 | Volatility: 20.1%',
  'Consumer Staples: +0.7% | P/E: 19.8 | Beta: 0.76 | Volatility: 14.2%',
  'Industrials: +1.4% | P/E: 16.7 | Beta: 1.05 | Volatility: 18.3%',
  'Materials: +0.3% | P/E: 14.2 | Beta: 1.18 | Volatility: 21.5%',
  'Real Estate: -1.2% | P/E: 15.6 | Beta: 0.89 | Volatility: 17.8%',
  'Utilities: -0.8% | P/E: 17.3 | Beta: 0.65 | Volatility: 13.4%',
  'Communication Services: +2.8% | P/E: 25.6 | Beta: 1.09 | Volatility: 19.7%',
  'Information Technology: +3.5% | P/E: 29.1 | Beta: 1.18 | Volatility: 23.1%'
]

// Lane management system for organized horizontal flow
class LaneManager {
  constructor() {
    // Define lane structure for organized horizontal flow
    this.lanes = [
      { y: 0, height: 120 },
      { y: 120, height: 120 },
      { y: 240, height: 120 },
      { y: 360, height: 120 },
      { y: 480, height: 120 },
      { y: 600, height: 120 }
    ]

    // Define element types and their properties
    this.elementTypes = [
      { type: 'ticker', count: 25, speed: 0.8 },
      { type: 'technical', count: 20, speed: 0.7 },
      { type: 'code', count: 15, speed: 0.6 },
      { type: 'volume', count: 20, speed: 0.9 },
      { type: 'candlestick', count: 15, speed: 0.1 },
      { type: 'trendline', count: 15, speed: 0.75 },
      { type: 'fibonacci', count: 12, speed: 0.45 },
      { type: 'index', count: 12, speed: 0.7 },
      { type: 'crypto', count: 12, speed: 0.6 },
      { type: 'news', count: 10, speed: 0.65 },
      { type: 'alert', count: 8, speed: 1.0 },
      { type: 'order', count: 10, speed: 0.55 },
      { type: 'portfolio', count: 8, speed: 0.5 },
      { type: 'risk', count: 6, speed: 0.4 },
      { type: 'earnings', count: 8, speed: 0.7 },
      { type: 'dividend', count: 6, speed: 0.35 },
      { type: 'analyst', count: 8, speed: 0.6 },
      { type: 'sector', count: 6, speed: 0.5 }
    ]
    
    // Initialize elements array
    this.elements = []
  }
  
  createElements(canvasWidth) {
    // Clear existing elements
    this.elements = []
    let elementId = 0
    
    // Create a mixed pool of all element types
    const allElementTypes = []
    this.elementTypes.forEach(typeConfig => {
      for (let i = 0; i < typeConfig.count; i++) {
        allElementTypes.push({
          type: typeConfig.type,
          baseSpeed: typeConfig.speed,
          index: i
        })
      }
    })
    
    // Shuffle the element types for randomness
    for (let i = allElementTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allElementTypes[i], allElementTypes[j]] = [allElementTypes[j], allElementTypes[i]]
    }
    
    // Distribute elements across lanes with randomization
    allElementTypes.forEach((elementType, globalIndex) => {
      const laneIndex = globalIndex % this.lanes.length
      const lane = this.lanes[laneIndex]
      
      // Randomize speed variation (±50%)
      const speedVariation = 0.5 + Math.random() * 1.0
      const actualSpeed = elementType.baseSpeed * speedVariation
      
      // Randomize starting position within lane
      const randomOffset = Math.random() * 200 - 100 // ±100px variation
      // Mix of elements starting on page and off-screen for continuous flow
      const startX = Math.random() < 0.7 ? 
        Math.random() * canvasWidth * 0.8 : // 70% start on page
        -100 - Math.random() * 200 // 30% start off-screen for immediate cycling
      
      // Randomize vertical position within lane
      const laneHeight = lane.height
      const randomYOffset = Math.random() * laneHeight * 0.6 - laneHeight * 0.3
      const y = lane.y + laneHeight / 2 + randomYOffset
      
      this.elements.push({
        id: elementId++,
        type: elementType.type,
        index: elementType.index,
        x: startX,
        y: y,
        speed: actualSpeed,
        lane: laneIndex
      })
    })
  }
}

// Renders a full-viewport canvas with drifting market "wave" lines.
// A spotlight follows the mouse/touch revealing the pattern with higher
// contrast. The canvas sits behind all content and ignores pointer
// events so normal UI interaction is unaffected.

function MarketBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const laneManager = useRef(new LaneManager())

  // Cache for chart data to prevent constant regeneration
  const chartDataCache = useRef(new Map())

  // Generate and cache chart data for each ticker
  useEffect(() => {
    mockMarketData.tickers.forEach((ticker, index) => {
      const cacheKey = `ticker-${index}`
      if (!chartDataCache.current.has(cacheKey)) {
        chartDataCache.current.set(cacheKey, generatePriceData(ticker.price, 0.03, 15))
      }
    })
  }, [])

  useEffect(() => {
    console.log('MarketBackground useEffect triggered')
    
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('❌ Canvas ref is null')
      return
    }
    
    console.log('✅ Canvas element found:', canvas)
    
    // Test if canvas is supported
    if (!canvas.getContext) {
      console.error('❌ Canvas not supported in this browser')
      return
    }
    
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('❌ Could not get 2D context')
      return
    }
    
    console.log('✅ 2D context obtained successfully')

    // Get hero section dimensions
    const getHeroDimensions = () => {
      const heroSection = document.querySelector('.hero')
      console.log('🔍 Looking for hero section:', heroSection)
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        console.log('✅ Hero section found:', rect)
        return {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        }
      }
      // Fallback to viewport if hero not found, accounting for header
      console.log('⚠️ Hero section not found, using viewport')
      const headerHeight = 80 // Approximate header height
      return {
        x: 0,
        y: headerHeight,
        width: window.innerWidth,
        height: window.innerHeight - headerHeight
      }
    }

    const resize = () => {
      const hero = getHeroDimensions()
      console.log(`📏 Hero dimensions: ${hero.width}x${hero.height} at (${hero.x}, ${hero.y})`)
      
      canvas.width = hero.width
      canvas.height = hero.height
      
      console.log(`📐 Canvas size set to: ${canvas.width}x${canvas.height}`)
      
      // Create elements after canvas is sized
      laneManager.current.createElements(canvas.width)
      console.log(`🎯 Created ${laneManager.current.elements.length} elements`)
    }

    // Initial resize
    resize()
    
    // Add resize listener
    window.addEventListener('resize', resize)
    
    // Animation loop
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      let visibleElements = 0
      
      // Update and draw all elements
      laneManager.current.elements.forEach(element => {
        // Update position
        element.x += element.speed
        
        // Check if element is visible
        if (element.x > canvas.width + 50) { // Reset sooner to reduce gap
          // Reset to start with new random properties off-screen left
          element.x = -100 - Math.random() * 200 // Start closer to viewport
          element.speed = element.speed * (0.8 + Math.random() * 0.4) // Vary speed on reset
          
          // Randomize vertical position on reset
          const lane = laneManager.current.lanes[element.lane]
          const laneHeight = lane.height
          const randomYOffset = Math.random() * laneHeight * 0.6 - laneHeight * 0.3
          element.y = lane.y + laneHeight / 2 + randomYOffset
        }
        
        // Only draw if element is in view
        if (element.x > -200 && element.x < canvas.width + 200) {
          visibleElements++
          const elementType = element.type
          const x = element.x
          const y = element.y
          
          // Draw based on element type
          switch (elementType) {
            case 'ticker':
              drawTicker(mockMarketData.tickers[element.index % mockMarketData.tickers.length], x, y, element.id)
              break
            case 'technical':
              drawTechnical(technicalData[element.index % technicalData.length], x, y)
              break
            case 'code':
              drawCode(codeSnippets[element.index % codeSnippets.length], x, y)
              break
            case 'volume':
              drawVolume(mockMarketData.tickers[element.index % mockMarketData.tickers.length], x, y)
              break
            case 'candlestick':
              drawCandlestick(candlestickData[element.index % candlestickData.length], x, y)
              break
            case 'trendline':
              drawTrendline(trendLines[element.index % trendLines.length], x, y)
              break
            case 'fibonacci':
              drawFibonacci(fibLevels[element.index % fibLevels.length], x, y)
              break
            case 'index':
              drawIndex(mockMarketData.indices[element.index % mockMarketData.indices.length], x, y)
              break
            case 'crypto':
              drawCrypto(mockMarketData.crypto[element.index % mockMarketData.crypto.length], x, y)
              break
            case 'news':
              drawNews(newsData[element.index % newsData.length], x, y)
              break
            case 'alert':
              drawAlert(alertData[element.index % alertData.length], x, y)
              break
            case 'order':
              drawOrder(orderData[element.index % orderData.length], x, y)
              break
            case 'portfolio':
              drawPortfolio(portfolioData[element.index % portfolioData.length], x, y)
              break
            case 'risk':
              drawRisk(riskData[element.index % riskData.length], x, y)
              break
            case 'earnings':
              drawEarnings(earningsData[element.index % earningsData.length], x, y)
              break
            case 'dividend':
              drawDividend(dividendData[element.index % dividendData.length], x, y)
              break
            case 'analyst':
              drawAnalyst(analystData[element.index % analystData.length], x, y)
              break
            case 'sector':
              drawSector(sectorData[element.index % sectorData.length], x, y)
              break
          }
        }
      })
      
      // Log every 60 frames (about once per second)
      if (Math.random() < 0.016) {
        console.log(`🎬 Animation frame: ${visibleElements} visible elements, ${laneManager.current.elements.length} total`)
        
        // Show some element positions for debugging
        const firstFew = laneManager.current.elements.slice(0, 5)
        firstFew.forEach((element, i) => {
          console.log(`Element ${i}: type=${element.type}, x=${element.x.toFixed(1)}, y=${element.y.toFixed(1)}, speed=${element.speed.toFixed(3)}`)
        })
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Helper functions for drawing different element types
    function drawTicker(ticker, x, y, index) {
      if (!ticker) return
      
      // Draw ticker symbol
      ctx.fillStyle = '#FF4D00'
      ctx.font = `bold ${Math.max(12, canvas.width * 0.012)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(ticker.symbol, x, y)
      
      // Draw price
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${Math.max(10, canvas.width * 0.01)}px monospace`
      ctx.fillText(`$${ticker.price.toFixed(2)}`, x, y + 20)
      
      // Draw change with color coding
      const changeColor = ticker.change >= 0 ? '#00FF88' : '#FF4444'
      ctx.fillStyle = changeColor
      ctx.font = `bold ${Math.max(9, canvas.width * 0.009)}px monospace`
      const changeText = `${ticker.change >= 0 ? '+' : ''}${ticker.change.toFixed(2)}`
      ctx.fillText(changeText, x, y + 38)
      
      // Draw mini price chart
      const chartData = chartDataCache.current.get(`ticker-${index}`)
      if (chartData) {
        const chartWidth = Math.max(40, canvas.width * 0.04)
        const chartHeight = Math.max(15, canvas.height * 0.015)
        const chartX = x + 80
        const chartY = y + 5
        
        ctx.strokeStyle = changeColor
        ctx.lineWidth = 1
        ctx.beginPath()
        
        const minPrice = Math.min(...chartData)
        const maxPrice = Math.max(...chartData)
        const priceRange = maxPrice - minPrice

        chartData.forEach((price, i) => {
          const cx = chartX + (i / (chartData.length - 1)) * chartWidth
          const cy = chartY + chartHeight - ((price - minPrice) / priceRange) * chartHeight
          if (i === 0) {
            ctx.moveTo(cx, cy)
          } else {
            ctx.lineTo(cx, cy)
          }
        })
        ctx.stroke()
      }
    }
    
    function drawTechnical(data, x, y) {
      if (!data) return
      ctx.fillStyle = '#00FFFF'
      ctx.font = `${Math.max(9, canvas.width * 0.009)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(data, x, y)
    }
    
    function drawCode(code, x, y) {
      if (!code) return
      ctx.fillStyle = '#FF6B6B'
      ctx.font = `${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(code, x, y)
    }
    
    function drawVolume(ticker, x, y) {
      if (!ticker) return
      const volume = parseInt(ticker.volume.replace('M', ''))
      const barHeight = (volume / 100) * Math.max(25, canvas.height * 0.03)
      const barWidth = Math.max(6, canvas.width * 0.006)
      
      ctx.fillStyle = '#FF4D00'
      ctx.fillRect(x, y - barHeight, barWidth, barHeight)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${Math.max(6, canvas.width * 0.006)}px monospace`
      ctx.textAlign = 'center'
      ctx.fillText(ticker.volume, x + barWidth/2, y + 15)
    }
    
    function drawCandlestick(candle, x, y) {
      if (!candle) return
      const scale = Math.max(1, canvas.height * 0.001)
      
      // Draw wick
      ctx.strokeStyle = candle.color
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + 7, y + (candle.high - candle.low) * scale)
      ctx.lineTo(x + 7, y)
      ctx.stroke()
      
      // Draw body
      ctx.fillStyle = candle.color
      const bodyHeight = Math.abs(candle.close - candle.open) * scale
      const bodyY = candle.close > candle.open ? y : y + bodyHeight
      ctx.fillRect(x + 4, bodyY, 6, bodyHeight)
    }
    
    function drawTrendline(line, x, y) {
      if (!line) return
      const lineLength = Math.max(150, canvas.width * 0.15)
      
      ctx.strokeStyle = line.color
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + lineLength, y + line.y2)
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    function drawFibonacci(level, x, y) {
      if (level === undefined) return
      const fibHeight = Math.max(60, canvas.height * 0.07)
      const fibY = y + level * fibHeight
      const lineLength = Math.max(40, canvas.width * 0.04)
      
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(x, fibY)
      ctx.lineTo(x + lineLength, fibY)
      ctx.stroke()
      
      ctx.fillStyle = '#FFD700'
      ctx.font = `${Math.max(6, canvas.width * 0.006)}px monospace`
      ctx.fillText(`${(level * 100).toFixed(1)}%`, x + lineLength + 5, fibY + 3)
      ctx.setLineDash([])
    }
    
    function drawIndex(index, x, y) {
      if (!index) return
      ctx.fillStyle = '#FFD700'
      ctx.font = `bold ${Math.max(9, canvas.width * 0.009)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(index.symbol, x, y)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.fillText(index.price.toFixed(2), x, y + 15)
      
      const changeColor = index.change >= 0 ? '#00FF88' : '#FF4444'
      ctx.fillStyle = changeColor
      ctx.font = `bold ${Math.max(7, canvas.width * 0.007)}px monospace`
      const changeText = `${index.change >= 0 ? '+' : ''}${index.change.toFixed(2)}`
      ctx.fillText(changeText, x, y + 30)
    }
    
    function drawCrypto(crypto, x, y) {
      if (!crypto) return
      ctx.fillStyle = '#FF6B6B'
      ctx.font = `bold ${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(crypto.symbol, x, y)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${Math.max(7, canvas.width * 0.007)}px monospace`
      ctx.fillText(crypto.price, x, y + 15)
      
      const changeColor = crypto.change.startsWith('+') ? '#00FF88' : '#FF4444'
      ctx.fillStyle = changeColor
      ctx.font = `bold ${Math.max(6, canvas.width * 0.006)}px monospace`
      ctx.fillText(crypto.change, x, y + 30)
    }
    
    function drawNews(news, x, y) {
      if (!news) return
      ctx.fillStyle = '#FFD700'
      ctx.font = `bold ${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText('📰', x, y)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `${Math.max(7, canvas.width * 0.007)}px monospace`
      ctx.fillText(news, x + 20, y)
    }
    
    function drawAlert(alert, x, y) {
      if (!alert) return
      ctx.fillStyle = '#FF4444'
      ctx.font = `bold ${Math.max(9, canvas.width * 0.009)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(alert, x, y)
    }
    
    function drawOrder(order, x, y) {
      if (!order) return
      ctx.fillStyle = '#00FFFF'
      ctx.font = `${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(order, x, y)
    }
    
    function drawPortfolio(portfolio, x, y) {
      if (!portfolio) return
      ctx.fillStyle = '#00FF88'
      ctx.font = `bold ${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(portfolio, x, y)
    }
    
    function drawRisk(risk, x, y) {
      if (!risk) return
      ctx.fillStyle = '#FF8800'
      ctx.font = `${Math.max(7, canvas.width * 0.007)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(risk, x, y)
    }
    
    function drawEarnings(earnings, x, y) {
      if (!earnings) return
      ctx.fillStyle = '#FF00FF'
      ctx.font = `${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(earnings, x, y)
    }
    
    function drawDividend(dividend, x, y) {
      if (!dividend) return
      ctx.fillStyle = '#00FF00'
      ctx.font = `${Math.max(7, canvas.width * 0.007)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(dividend, x, y)
    }
    
    function drawAnalyst(analyst, x, y) {
      if (!analyst) return
      ctx.fillStyle = '#0088FF'
      ctx.font = `${Math.max(7, canvas.width * 0.007)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(analyst, x, y)
    }
    
    function drawSector(sector, x, y) {
      if (!sector) return
      ctx.fillStyle = '#FF8800'
      ctx.font = `bold ${Math.max(8, canvas.width * 0.008)}px monospace`
      ctx.textAlign = 'left'
      ctx.fillText(sector, x, y)
    }
    
    console.log('🚀 Starting animation...')
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      console.log('🧹 Cleaning up MarketBackground')
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  console.log('🎨 MarketBackground component rendering')

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        zIndex: 1, // Above background but behind content
        backgroundColor: 'rgba(255, 77, 0, 0.03)', // Very subtle orange tint
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
      aria-hidden="true"
    />
  )
}

export default MarketBackground 