// Generate realistic market data for various card types
const generateChartData = (baseValue, points = 20, volatility = 0.1) => {
  const data = [];
  let value = baseValue;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * volatility * value;
    data.push(Math.max(0, value));
  }
  return data;
};

const generateCandlestickData = (count = 10) => {
  const data = [];
  let price = 100;
  for (let i = 0; i < count; i++) {
    const open = price;
    const close = price + (Math.random() - 0.5) * 5;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    data.push({ open, high, low, close });
    price = close;
  }
  return data;
};

const generateHeatmapData = () => {
  return Array.from({ length: 6 }, () => 
    Array.from({ length: 8 }, () => Math.random() * 100 - 50)
  );
};

// Expanded market card data with much more variety
export const marketCardData = [
  // PRICE DATA - Stocks
  {
    type: 'price',
    symbol: 'AAPL',
    price: '$185.92',
    change: 2.34,
    chartData: generateChartData(180, 15, 0.02),
    chartType: 'line',
    lane: 0,
    size: 'normal',
    glowEffect: true
  },
  {
    type: 'price',
    symbol: 'MSFT',
    price: '$378.85',
    change: -1.23,
    chartData: generateChartData(370, 15, 0.02),
    chartType: 'line',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'GOOGL',
    price: '$142.56',
    change: 0.87,
    chartData: generateChartData(140, 15, 0.03),
    chartType: 'line',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'NVDA',
    price: '$485.09',
    change: 12.34,
    chartData: generateChartData(450, 15, 0.05),
    chartType: 'line',
    lane: 3,
    size: 'normal',
    glowEffect: true
  },
  {
    type: 'price',
    symbol: 'TSLA',
    price: '$248.42',
    change: 5.67,
    chartData: generateChartData(240, 15, 0.08),
    chartType: 'line',
    lane: 4,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'META',
    price: '$334.92',
    change: -2.18,
    chartData: generateChartData(330, 15, 0.03),
    chartType: 'line',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'AMZN',
    price: '$145.24',
    change: -0.45,
    chartData: generateChartData(145, 15, 0.02),
    chartType: 'line',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'NFLX',
    price: '$485.09',
    change: 3.21,
    chartData: generateChartData(480, 15, 0.04),
    chartType: 'line',
    lane: 7,
    size: 'normal'
  },

  // CRYPTO DATA
  {
    type: 'crypto',
    label: 'BTC/USD',
    value: '$43,567',
    change: 2.34,
    chartData: generateChartData(42000, 20, 0.05),
    chartType: 'line',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'ETH/USD',
    value: '$2,345',
    change: 1.67,
    chartData: generateChartData(2300, 20, 0.06),
    chartType: 'line',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'SOL/USD',
    value: '$98.76',
    change: 5.43,
    chartData: generateChartData(90, 20, 0.1),
    chartType: 'line',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'ADA/USD',
    value: '$0.45',
    change: -0.23,
    chartData: generateChartData(0.4, 20, 0.08),
    chartType: 'line',
    lane: 3,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'ETH/BTC',
    value: '0.0542',
    change: -1.2,
    chartData: generateChartData(0.054, 20, 0.02),
    chartType: 'line',
    lane: 4,
    size: 'normal'
  },

  // TECHNICAL ANALYSIS
  {
    type: 'technical',
    label: 'RSI (14)',
    value: '67.3',
    subtitle: 'Overbought territory',
    status: 'WARNING',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'MACD Signal',
    value: '0.0234',
    subtitle: 'Bullish crossover',
    status: 'BUY',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'Bollinger Bands',
    value: '78.2%',
    subtitle: 'Near upper band',
    lane: 7,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'Ichimoku Cloud',
    value: 'BULLISH',
    subtitle: 'Above cloud',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'Williams %R',
    value: '-15.9',
    subtitle: 'Overbought signal',
    lane: 9,
    size: 'normal'
  },

  // VOLUME DATA
  {
    type: 'volume',
    label: 'Market Volume',
    value: '$847B',
    status: 'HIGH',
    chartData: generateChartData(800, 12, 0.1),
    chartType: 'bars',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'volume',
    label: 'Dark Pool Volume',
    value: '34.2M',
    status: 'ELEVATED',
    chartData: generateChartData(30, 12, 0.2),
    chartType: 'bars',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'volume',
    label: 'Options Volume',
    value: '2.3M',
    status: 'SPIKE',
    chartData: generateChartData(2, 12, 0.25),
    chartType: 'bars',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'volume',
    label: 'Futures Volume',
    value: '156K',
    chartData: generateChartData(150, 12, 0.15),
    chartType: 'bars',
    lane: 3,
    size: 'normal'
  },
  {
    type: 'volume',
    label: 'Block Trades',
    value: '234',
    status: 'ACTIVE',
    lane: 4,
    size: 'small'
  },

  // PORTFOLIO METRICS
  {
    type: 'portfolio',
    label: 'Portfolio Value',
    value: '$2.8M',
    change: 5.7,
    chartData: generateChartData(2500000, 20, 0.05),
    chartType: 'line',
    lane: 5,
    size: 'wide',
    glowEffect: true
  },
  {
    type: 'portfolio',
    label: 'Daily P&L',
    value: '+$45,230',
    change: 2.1,
    chartData: generateChartData(40000, 15, 0.1),
    chartType: 'line',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'portfolio',
    label: 'Monthly P&L',
    value: '+$124K',
    change: 5.7,
    chartData: generateChartData(100000, 30, 0.1),
    chartType: 'line',
    lane: 7,
    size: 'wide',
    glowEffect: true
  },
  {
    type: 'portfolio',
    label: 'Sharpe Ratio',
    value: '1.67',
    change: 0.05,
    subtitle: 'Risk-adjusted return',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'portfolio',
    label: 'Win Rate',
    value: '67%',
    change: 2.1,
    subtitle: 'This month',
    lane: 9,
    size: 'small'
  },

  // DERIVATIVES
  {
    type: 'derivatives',
    label: 'AAPL Options',
    value: '$5.67',
    subtitle: 'Jan 24 190 CALL',
    change: 12.4,
    chartData: generateChartData(5, 20, 0.15),
    chartType: 'line',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'derivatives',
    label: 'Gamma Exposure',
    value: '$2.4B',
    subtitle: 'Market maker hedging',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'derivatives',
    label: 'Put/Call Ratio',
    value: '0.67',
    subtitle: 'Bullish sentiment',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'derivatives',
    label: 'VIX Options',
    value: '$3.45',
    subtitle: 'Feb 20 CALL',
    change: -5.2,
    lane: 3,
    size: 'normal'
  },

  // FUTURES
  {
    type: 'futures',
    label: 'ES Mini',
    value: '4,567.50',
    change: 0.52,
    chartData: generateCandlestickData(12),
    chartType: 'candlestick',
    lane: 4,
    size: 'wide'
  },
  {
    type: 'futures',
    label: 'NQ Mini',
    value: '14,234.56',
    change: 0.87,
    chartData: generateCandlestickData(12),
    chartType: 'candlestick',
    lane: 5,
    size: 'wide'
  },
  {
    type: 'futures',
    label: 'RTY Mini',
    value: '1,892.34',
    change: 1.23,
    chartData: generateCandlestickData(12),
    chartType: 'candlestick',
    lane: 6,
    size: 'wide'
  },

  // BONDS & FIXED INCOME
  {
    type: 'bonds',
    label: '10Y Treasury',
    value: '4.23%',
    change: 0.05,
    chartData: generateChartData(4.2, 30, 0.02),
    chartType: 'line',
    lane: 7,
    size: 'normal'
  },
  {
    type: 'bonds',
    label: '30Y Treasury',
    value: '4.45%',
    change: 0.03,
    chartData: generateChartData(4.4, 30, 0.02),
    chartType: 'line',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'bonds',
    label: '2Y Treasury',
    value: '4.85%',
    change: 0.08,
    chartData: generateChartData(4.8, 30, 0.03),
    chartType: 'line',
    lane: 9,
    size: 'normal'
  },

  // COMMODITIES
  {
    type: 'commodities',
    label: 'Gold Futures',
    value: '$2,034',
    change: 0.8,
    chartData: generateChartData(2030, 15, 0.01),
    chartType: 'line',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'commodities',
    label: 'Silver Futures',
    value: '$24.56',
    change: 1.2,
    chartData: generateChartData(24, 15, 0.02),
    chartType: 'line',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'commodities',
    label: 'Crude Oil',
    value: '$78.45',
    change: -0.45,
    chartData: generateChartData(78, 15, 0.03),
    chartType: 'line',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'commodities',
    label: 'Natural Gas',
    value: '$2.67',
    change: 2.1,
    chartData: generateChartData(2.6, 15, 0.05),
    chartType: 'line',
    lane: 3,
    size: 'normal'
  },

  // FOREX
  {
    type: 'fx',
    label: 'EUR/USD',
    value: '1.0856',
    change: -0.12,
    chartData: generateChartData(1.085, 20, 0.005),
    chartType: 'line',
    lane: 4,
    size: 'normal'
  },
  {
    type: 'fx',
    label: 'GBP/USD',
    value: '1.2645',
    change: 0.23,
    chartData: generateChartData(1.26, 20, 0.005),
    chartType: 'line',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'fx',
    label: 'USD/JPY',
    value: '148.72',
    change: 0.45,
    chartData: generateChartData(148, 20, 0.01),
    chartType: 'line',
    lane: 6,
    size: 'normal'
  },

  // RISK METRICS
  {
    type: 'risk',
    label: 'VaR (99%)',
    value: '3.4%',
    subtitle: 'Tail risk exposure',
    lane: 7,
    size: 'normal'
  },
  {
    type: 'risk',
    label: 'Beta Exposure',
    value: '1.23',
    subtitle: 'vs S&P 500',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'risk',
    label: 'Max Drawdown',
    value: '8.5%',
    subtitle: 'Peak to trough',
    lane: 9,
    size: 'normal'
  },
  {
    type: 'risk',
    label: 'CVaR (95%)',
    value: '4.2%',
    subtitle: 'Conditional VaR',
    lane: 0,
    size: 'normal'
  },

  // VOLATILITY
  {
    type: 'volatility',
    label: 'VIX',
    value: '18.45',
    change: -2.34,
    chartData: generateChartData(20, 15, 0.1),
    chartType: 'line',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'volatility',
    label: 'Implied Vol',
    value: '28.4%',
    subtitle: 'Term structure',
    chartData: generateChartData(25, 10, 0.1),
    chartType: 'line',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'volatility',
    label: 'VVIX',
    value: '89.2',
    change: 3.4,
    chartData: generateChartData(85, 15, 0.05),
    chartType: 'line',
    lane: 3,
    size: 'normal'
  },

  // SIGNALS & AI
  {
    type: 'signals',
    label: 'AI Signals',
    value: '156',
    subtitle: 'Active predictions',
    lane: 4,
    size: 'normal',
    glowEffect: true
  },
  {
    type: 'signals',
    label: 'Trade Signals',
    value: '89',
    subtitle: 'Pending executions',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'signals',
    label: 'Risk Alerts',
    value: '23',
    subtitle: 'Portfolio warnings',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'signals',
    label: 'Momentum',
    value: 'STRONG',
    subtitle: 'Market direction',
    lane: 7,
    size: 'small'
  },

  // NEWS & EVENTS
  {
    type: 'news',
    label: 'Breaking News',
    headline: 'Fed announces 25bps rate hike, signals hawkish stance on inflation',
    time: '2m ago',
    source: 'Reuters',
    lane: 8,
    size: 'wide'
  },
  {
    type: 'news',
    label: 'Earnings Alert',
    headline: 'Apple Q1 earnings beat estimates, iPhone revenue up 6% YoY',
    time: '5m ago',
    source: 'Bloomberg',
    lane: 9,
    size: 'wide'
  },
  {
    type: 'news',
    label: 'Crypto News',
    headline: 'Bitcoin ETF sees record $2.4B inflow as institutional adoption accelerates',
    time: '1h ago',
    source: 'CoinDesk',
    lane: 0,
    size: 'wide'
  },
  {
    type: 'news',
    label: 'Fed Watch',
    headline: 'Fed officials signal pause in rate hikes, dovish pivot expected',
    time: '15m ago',
    source: 'MarketWatch',
    lane: 1,
    size: 'wide'
  },

  // CORRELATION & FLOW
  {
    type: 'correlation',
    label: 'Sector Correlation',
    value: '0.87',
    subtitle: 'Tech sector correlation',
    heatmapData: generateHeatmapData(),
    chartType: 'heatmap',
    lane: 2,
    size: 'wide'
  },
  {
    type: 'flow',
    label: 'Smart Money',
    value: '$567M',
    subtitle: 'Institutional flow',
    lane: 3,
    size: 'normal'
  },
  {
    type: 'flow',
    label: 'ETF Flows',
    value: '+$1.2B',
    subtitle: 'Net inflow today',
    change: 2.1,
    lane: 4,
    size: 'normal'
  },

  // MACRO INDICATORS
  {
    type: 'macro',
    label: 'DXY Index',
    value: '103.45',
    change: -0.23,
    chartData: generateChartData(103, 20, 0.01),
    chartType: 'line',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'macro',
    label: 'PCE Inflation',
    value: '2.4%',
    subtitle: 'Core YoY',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'macro',
    label: 'GDP Growth',
    value: '2.1%',
    subtitle: 'Annualized',
    lane: 7,
    size: 'normal'
  },

  // SENTIMENT
  {
    type: 'sentiment',
    label: 'Market Sentiment',
    value: 'BULLISH',
    subtitle: 'Fear & Greed: 72',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'sentiment',
    label: 'Put/Call Sentiment',
    value: 'BEARISH',
    subtitle: 'Ratio: 1.23',
    lane: 9,
    size: 'normal'
  },

  // LIQUIDITY & ORDER BOOK
  {
    type: 'orderbook',
    label: 'Order Flow',
    value: '2.3M',
    subtitle: 'Bid pressure',
    chartData: generateChartData(2, 15, 0.3),
    chartType: 'bars',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'liquidity',
    label: 'Market Depth',
    value: '$45.2M',
    subtitle: 'Top 10 levels',
    lane: 1,
    size: 'normal'
  },

  // GREEKS
  {
    type: 'greeks',
    label: 'Portfolio Greeks',
    value: 'Δ: 0.67',
    subtitle: 'Γ: 0.023, Θ: -0.045',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'greeks',
    label: 'Vega Exposure',
    value: '0.156',
    subtitle: 'Vol sensitivity',
    lane: 3,
    size: 'normal'
  },

  // MOMENTUM
  {
    type: 'momentum',
    label: 'Price Momentum',
    value: 'STRONG',
    subtitle: 'RSI: 89.2',
    lane: 4,
    size: 'normal'
  },

  // ARBITRAGE
  {
    type: 'arbitrage',
    label: 'Basis Spread',
    value: '0.12%',
    subtitle: 'Cash vs Futures',
    lane: 5,
    size: 'normal'
  },

  // YIELD CURVE
  {
    type: 'yield',
    label: 'Yield Curve',
    value: '2s10s: 42bp',
    subtitle: 'Steepening trend',
    lane: 6,
    size: 'normal'
  },

  // CREDIT
  {
    type: 'credit',
    label: 'Credit Spreads',
    value: '89bp',
    subtitle: 'IG corporate',
    lane: 7,
    size: 'normal'
  },

  // ALERTS
  {
    type: 'alerts',
    label: 'Price Alert',
    value: 'TRIGGERED',
    subtitle: 'TSLA > $250',
    lane: 8,
    size: 'small'
  },
  {
    type: 'alerts',
    label: 'Risk Alert',
    value: 'ELEVATED',
    subtitle: 'Correlation spike',
    lane: 9,
    size: 'small'
  },
  {
    type: 'alerts',
    label: 'Volume Alert',
    value: 'UNUSUAL',
    subtitle: 'NVDA volume spike',
    lane: 0,
    size: 'small'
  },

  // ADDITIONAL STOCKS
  {
    type: 'price',
    symbol: 'AMD',
    price: '$156.78',
    change: 4.21,
    chartData: generateChartData(150, 15, 0.04),
    chartType: 'line',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'INTC',
    price: '$42.15',
    change: -1.05,
    chartData: generateChartData(42, 15, 0.03),
    chartType: 'line',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'PYPL',
    price: '$62.34',
    change: 2.87,
    chartData: generateChartData(60, 15, 0.04),
    chartType: 'line',
    lane: 3,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'BABA',
    price: '$78.92',
    change: -0.56,
    chartData: generateChartData(79, 15, 0.05),
    chartType: 'line',
    lane: 4,
    size: 'normal'
  },
  {
    type: 'price',
    symbol: 'UBER',
    price: '$52.67',
    change: 1.89,
    chartData: generateChartData(51, 15, 0.06),
    chartType: 'line',
    lane: 5,
    size: 'normal'
  },

  // MORE CRYPTO
  {
    type: 'crypto',
    label: 'DOT/USD',
    value: '$6.78',
    change: 3.45,
    chartData: generateChartData(6.5, 20, 0.08),
    chartType: 'line',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'MATIC/USD',
    value: '$0.89',
    change: 2.12,
    chartData: generateChartData(0.85, 20, 0.09),
    chartType: 'line',
    lane: 7,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'LINK/USD',
    value: '$14.56',
    change: 1.67,
    chartData: generateChartData(14, 20, 0.07),
    chartType: 'line',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'crypto',
    label: 'AVAX/USD',
    value: '$23.45',
    change: 4.32,
    chartData: generateChartData(22, 20, 0.1),
    chartType: 'line',
    lane: 9,
    size: 'normal'
  },

  // MORE TECHNICAL INDICATORS
  {
    type: 'technical',
    label: 'Stochastic',
    value: '78.9',
    subtitle: 'Overbought zone',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'CCI',
    value: '145.6',
    subtitle: 'Strong momentum',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'ADX',
    value: '67.3',
    subtitle: 'Strong trend',
    lane: 2,
    size: 'normal'
  },
  {
    type: 'technical',
    label: 'ATR',
    value: '2.45',
    subtitle: 'High volatility',
    lane: 3,
    size: 'normal'
  },

  // MORE PORTFOLIO METRICS
  {
    type: 'portfolio',
    label: 'Total Return',
    value: '+23.4%',
    change: 1.2,
    subtitle: 'YTD performance',
    lane: 4,
    size: 'normal'
  },
  {
    type: 'portfolio',
    label: 'Alpha',
    value: '1.89',
    change: 0.15,
    subtitle: 'Risk-adjusted excess return',
    lane: 5,
    size: 'normal'
  },
  {
    type: 'portfolio',
    label: 'Beta',
    value: '1.23',
    change: 0.08,
    subtitle: 'Market sensitivity',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'portfolio',
    label: 'Tracking Error',
    value: '4.56%',
    subtitle: 'Benchmark deviation',
    lane: 7,
    size: 'normal'
  },

  // MORE VOLUME DATA
  {
    type: 'volume',
    label: 'Institutional Flow',
    value: '892M',
    status: 'HEAVY',
    chartData: generateChartData(800, 12, 0.15),
    chartType: 'bars',
    lane: 8,
    size: 'normal'
  },
  {
    type: 'volume',
    label: 'Retail Flow',
    value: '234M',
    status: 'MODERATE',
    chartData: generateChartData(200, 12, 0.2),
    chartType: 'bars',
    lane: 9,
    size: 'normal'
  },

  // MORE SENTIMENT
  {
    type: 'sentiment',
    label: 'Options Flow',
    value: 'BULLISH',
    subtitle: 'Call dominance',
    lane: 0,
    size: 'normal'
  },
  {
    type: 'sentiment',
    label: 'Insider Trading',
    value: 'NEUTRAL',
    subtitle: 'Balanced activity',
    lane: 1,
    size: 'normal'
  },
  {
    type: 'sentiment',
    label: 'Analyst Ratings',
    value: 'UPGRADE',
    subtitle: 'Strong buy signals',
    lane: 2,
    size: 'normal'
  },

  // MORE DERIVATIVES
  {
    type: 'derivatives',
    label: 'SPY Options',
    value: '$8.92',
    subtitle: 'Jan 24 450 CALL',
    change: 15.6,
    lane: 3,
    size: 'normal'
  },
  {
    type: 'derivatives',
    label: 'QQQ Options',
    value: '$12.45',
    subtitle: 'Feb 24 380 CALL',
    change: 8.9,
    lane: 4,
    size: 'normal'
  },
  {
    type: 'derivatives',
    label: 'IWM Options',
    value: '$4.67',
    subtitle: 'Mar 24 190 PUT',
    change: -3.2,
    lane: 5,
    size: 'normal'
  },

  // MORE MACRO DATA
  {
    type: 'macro',
    label: 'Unemployment',
    value: '3.7%',
    subtitle: 'Monthly rate',
    lane: 6,
    size: 'normal'
  },
  {
    type: 'macro',
    label: 'CPI',
    value: '3.2%',
    subtitle: 'YoY inflation',
    lane: 7,
    size: 'normal'
  },
  {
    type: 'macro',
    label: 'Consumer Confidence',
    value: '102.8',
    subtitle: 'Monthly index',
    lane: 8,
    size: 'normal'
  },

  // MORE ETFS
  {
    type: 'etf',
    label: 'VTI Flow',
    value: '+$892M',
    subtitle: 'Total market ETF',
    change: 1.2,
    lane: 9,
    size: 'normal'
  },
  {
    type: 'etf',
    label: 'QQQ Flow',
    value: '+$456M',
    subtitle: 'Tech ETF inflow',
    change: 2.1,
    lane: 0,
    size: 'normal'
  },
  {
    type: 'etf',
    label: 'IWM Flow',
    value: '-$234M',
    subtitle: 'Small cap outflow',
    change: -1.5,
    lane: 1,
    size: 'normal'
  }
];

// Enhanced function to get cards for specific lanes with better distribution
export const getCardsForLanes = (numLanes = 6) => {
  const laneCards = {};
  
  // Initialize lanes
  for (let i = 0; i < numLanes; i++) {
    laneCards[i] = [];
  }
  
  // Distribute cards across available lanes ensuring all lanes get content
  marketCardData.forEach((card, index) => {
    const targetLane = index % numLanes; // Simple round-robin distribution
    laneCards[targetLane].push({
      ...card,
      id: `card-${index}` // Add unique ID for animations
    });
  });
  
  // Ensure all lanes have at least 5 cards by redistributing if needed
  const allCards = [...marketCardData];
  Object.keys(laneCards).forEach(laneIndex => {
    const lane = parseInt(laneIndex);
    while (laneCards[lane].length < 5) {
      const cardToAdd = allCards[laneCards[lane].length % allCards.length];
      laneCards[lane].push({
        ...cardToAdd,
        id: `card-${lane}-filler-${laneCards[lane].length}`
      });
    }
  });
  
  // Shuffle each lane to prevent repetitive patterns
  Object.keys(laneCards).forEach(lane => {
    laneCards[lane] = laneCards[lane].sort(() => Math.random() - 0.5);
  });
  
  return laneCards;
};

// Function to get cards by type
export const getCardsByType = (type) => {
  return marketCardData.filter(card => card.type === type);
};

// Function to get random cards for testing
export const getRandomCards = (count = 10) => {
  const shuffled = [...marketCardData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 