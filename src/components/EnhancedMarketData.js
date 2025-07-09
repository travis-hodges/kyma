// Enhanced market data generation with realistic financial metrics
const generateRealisticChartData = (baseValue, points = 20, volatility = 0.1, trend = 0) => {
  const data = [];
  let value = baseValue;
  
  for (let i = 0; i < points; i++) {
    // Add trend and volatility
    const trendAdjustment = trend * (i / points);
    const volatilityAdjustment = (Math.random() - 0.5) * volatility * value;
    const meanReversion = (baseValue - value) * 0.1; // Mean reversion tendency
    
    value += trendAdjustment + volatilityAdjustment + meanReversion;
    value = Math.max(0, value); // Ensure non-negative
    data.push(value);
  }
  
  return data;
};

const generateCandlestickData = (count = 12, basePrice = 100) => {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < count; i++) {
    const open = price;
    const volatility = 0.02 + Math.random() * 0.03; // 2-5% volatility
    const direction = Math.random() < 0.55 ? 1 : -1; // Slight bullish bias
    
    const close = open * (1 + direction * volatility);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    data.push({ open, high, low, close });
    price = close;
  }
  
  return data;
};

const generateVolumeData = (count = 15) => {
  const baseVolume = 1000000;
  return Array.from({ length: count }, (_, i) => {
    const cyclicalFactor = Math.sin((i / count) * Math.PI * 2) * 0.3;
    const randomFactor = (Math.random() - 0.5) * 0.5;
    return baseVolume * (1 + cyclicalFactor + randomFactor);
  });
};

const generateCorrelationMatrix = (size = 5) => {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = (Math.random() - 0.5) * 2;
      }
    }
  }
  return matrix;
};

// Real-time market data simulation
const getMarketTime = () => {
  const now = new Date();
  const marketOpen = new Date(now);
  marketOpen.setHours(9, 30, 0, 0); // 9:30 AM
  const marketClose = new Date(now);
  marketClose.setHours(16, 0, 0, 0); // 4:00 PM
  
  const isMarketOpen = now >= marketOpen && now <= marketClose;
  const timeUntilClose = marketClose - now;
  
  return {
    isOpen: isMarketOpen,
    timeUntilClose: Math.max(0, timeUntilClose),
    currentTime: now.toLocaleTimeString()
  };
};

// Enhanced financial metrics
const generateFinancialMetrics = () => {
  const metrics = {
    vix: 15 + Math.random() * 25, // VIX typically 15-40
    vwap: 250 + Math.random() * 50,
    rsi: 30 + Math.random() * 40,
    macd: (Math.random() - 0.5) * 2,
    beta: 0.5 + Math.random() * 1.5,
    sharpe: Math.random() * 3,
    sortino: Math.random() * 4,
    maxDrawdown: -(Math.random() * 20),
    alpha: (Math.random() - 0.5) * 10,
    informationRatio: (Math.random() - 0.5) * 2
  };
  
  return metrics;
};

// News sentiment analysis
const generateSentimentData = () => {
  const sentiments = ['BULLISH', 'BEARISH', 'NEUTRAL', 'VOLATILE'];
  const confidence = Math.random() * 100;
  
  return {
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    confidence: confidence,
    trend: Math.random() > 0.5 ? 'IMPROVING' : 'DECLINING',
    sources: Math.floor(Math.random() * 50) + 10
  };
};

// Enhanced card data with sophisticated metrics
export const enhancedMarketData = [
  // Major Tech Stocks
  {
    type: 'price',
    symbol: 'AAPL',
    price: '$193.89',
    change: 2.47,
    volume: '89.2M',
    marketCap: '$2.89T',
    pe: 28.4,
    chartData: generateRealisticChartData(190, 18, 0.025, 0.5),
    chartType: 'line',
    priority: 'high',
    size: 'normal',
    sector: 'Technology',
    beta: 1.24,
    dayRange: '$190.12 - $195.44'
  },
  
  {
    type: 'price',
    symbol: 'MSFT',
    price: '$384.52',
    change: -0.89,
    volume: '31.4M',
    marketCap: '$2.85T',
    pe: 35.2,
    chartData: generateRealisticChartData(385, 18, 0.02, -0.2),
    chartType: 'line',
    priority: 'high',
    size: 'normal',
    sector: 'Technology',
    beta: 0.89,
    dayRange: '$381.22 - $387.91'
  },
  
  {
    type: 'price',
    symbol: 'NVDA',
    price: '$498.67',
    change: 8.34,
    volume: '156.7M',
    marketCap: '$1.23T',
    pe: 63.8,
    chartData: generateRealisticChartData(480, 18, 0.045, 2.1),
    chartType: 'line',
    priority: 'high',
    size: 'normal',
    sector: 'Technology',
    beta: 1.68,
    dayRange: '$485.33 - $502.11',
    glowEffect: true
  },
  
  // Crypto Markets
  {
    type: 'crypto',
    symbol: 'BTC/USD',
    price: '$43,267',
    change: 3.21,
    volume: '$28.4B',
    marketCap: '$847B',
    chartData: generateRealisticChartData(42000, 20, 0.035, 1.2),
    chartType: 'line',
    priority: 'high',
    size: 'normal',
    dominance: '48.7%',
    fearGreed: 67
  },
  
  {
    type: 'crypto',
    symbol: 'ETH/USD',
    price: '$2,389',
    change: 4.67,
    volume: '$14.2B',
    marketCap: '$287B',
    chartData: generateRealisticChartData(2300, 20, 0.04, 1.8),
    chartType: 'line',
    priority: 'medium',
    size: 'normal',
    gasPrice: '23 gwei',
    stakingAPY: '4.2%'
  },
  
  // Technical Indicators
  {
    type: 'technical',
    label: 'VIX',
    value: '19.47',
    change: -2.3,
    subtitle: 'Fear & Greed Index',
    status: 'NEUTRAL',
    chartData: generateRealisticChartData(20, 15, 0.15, -0.5),
    chartType: 'line',
    priority: 'medium',
    size: 'normal',
    description: 'Market volatility'
  },
  
  {
    type: 'technical',
    label: 'RSI (14)',
    value: '67.3',
    subtitle: 'Overbought territory',
    status: 'WARNING',
    chartData: generateRealisticChartData(67, 12, 0.05, 0.1),
    chartType: 'sparkline',
    priority: 'normal',
    size: 'normal'
  },
  
  {
    type: 'technical',
    label: 'MACD',
    value: '0.234',
    subtitle: 'Bullish crossover',
    status: 'BUY',
    chartData: generateRealisticChartData(0.2, 15, 0.3, 0.05),
    chartType: 'line',
    priority: 'medium',
    size: 'normal'
  },
  
  // Options Flow
  {
    type: 'options',
    label: 'Call/Put Ratio',
    value: '1.34',
    subtitle: 'Bullish sentiment',
    change: 0.12,
    chartData: generateRealisticChartData(1.3, 10, 0.1, 0.02),
    chartType: 'bars',
    priority: 'normal',
    size: 'normal'
  },
  
  {
    type: 'options',
    label: 'Gamma Exposure',
    value: '$2.4B',
    subtitle: 'Positive gamma',
    change: 5.7,
    chartData: generateRealisticChartData(2.2, 12, 0.2, 0.1),
    chartType: 'line',
    priority: 'high',
    size: 'normal'
  },
  
  // Sector Performance
  {
    type: 'sector',
    label: 'Technology',
    value: '+1.89%',
    change: 1.89,
    chartData: generateRealisticChartData(100, 15, 0.02, 0.3),
    chartType: 'line',
    priority: 'normal',
    size: 'normal',
    leaders: ['AAPL', 'MSFT', 'NVDA']
  },
  
  {
    type: 'sector',
    label: 'Healthcare',
    value: '-0.45%',
    change: -0.45,
    chartData: generateRealisticChartData(100, 15, 0.015, -0.1),
    chartType: 'line',
    priority: 'normal',
    size: 'normal',
    leaders: ['JNJ', 'PFE', 'UNH']
  },
  
  // Economic Indicators
  {
    type: 'economic',
    label: 'Fed Funds Rate',
    value: '5.25%',
    subtitle: 'Next meeting: Jan 31',
    chartData: generateRealisticChartData(5.25, 10, 0.001, 0),
    chartType: 'line',
    priority: 'high',
    size: 'normal',
    nextMeeting: '2024-01-31'
  },
  
  {
    type: 'economic',
    label: 'CPI (YoY)',
    value: '3.2%',
    subtitle: 'Core: 3.8%',
    change: -0.2,
    chartData: generateRealisticChartData(3.2, 12, 0.02, -0.05),
    chartType: 'line',
    priority: 'high',
    size: 'normal'
  },
  
  // News & Sentiment
  {
    type: 'news',
    headline: 'Fed signals potential rate cuts in 2024',
    time: '2 hours ago',
    source: 'Reuters',
    sentiment: 'BULLISH',
    impact: 'HIGH',
    priority: 'high',
    size: 'normal'
  },
  
  {
    type: 'news',
    headline: 'Tech earnings season kicks off with mixed results',
    time: '4 hours ago',
    source: 'Bloomberg',
    sentiment: 'NEUTRAL',
    impact: 'MEDIUM',
    priority: 'medium',
    size: 'normal'
  },
  
  // Futures & Commodities
  {
    type: 'futures',
    symbol: 'ES1!',
    label: 'S&P 500 Futures',
    value: '4,847.50',
    change: 0.23,
    chartData: generateRealisticChartData(4840, 16, 0.01, 0.05),
    chartType: 'line',
    priority: 'high',
    size: 'normal'
  },
  
  {
    type: 'commodities',
    symbol: 'GC1!',
    label: 'Gold',
    value: '$2,043.20',
    change: -0.34,
    chartData: generateRealisticChartData(2045, 14, 0.008, -0.02),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  },
  
  {
    type: 'commodities',
    symbol: 'CL1!',
    label: 'Crude Oil',
    value: '$78.45',
    change: 1.23,
    chartData: generateRealisticChartData(77, 15, 0.025, 0.2),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  },
  
  // FX Markets
  {
    type: 'fx',
    symbol: 'EUR/USD',
    value: '1.0856',
    change: 0.15,
    chartData: generateRealisticChartData(1.085, 18, 0.002, 0.0002),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  },
  
  {
    type: 'fx',
    symbol: 'GBP/USD',
    value: '1.2734',
    change: -0.08,
    chartData: generateRealisticChartData(1.274, 18, 0.003, -0.0001),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  },
  
  // Market Breadth
  {
    type: 'breadth',
    label: 'Advance/Decline',
    value: '2.3:1',
    subtitle: 'Bullish breadth',
    chartData: generateRealisticChartData(2.3, 12, 0.1, 0.02),
    chartType: 'bars',
    priority: 'normal',
    size: 'normal'
  },
  
  {
    type: 'breadth',
    label: 'New Highs/Lows',
    value: '234/67',
    subtitle: 'Healthy market',
    chartData: generateRealisticChartData(3.5, 10, 0.2, 0.05),
    chartType: 'bars',
    priority: 'normal',
    size: 'normal'
  },
  
  // Volatility Indicators
  {
    type: 'volatility',
    label: 'VVIX',
    value: '89.23',
    subtitle: 'Vol of Vol',
    change: -3.4,
    chartData: generateRealisticChartData(90, 14, 0.05, -0.2),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  },
  
  // Fixed Income
  {
    type: 'bonds',
    symbol: 'TNX',
    label: '10Y Treasury',
    value: '4.267%',
    change: 0.023,
    chartData: generateRealisticChartData(4.25, 16, 0.002, 0.001),
    chartType: 'line',
    priority: 'high',
    size: 'normal'
  },
  
  {
    type: 'bonds',
    symbol: 'DXY',
    label: 'Dollar Index',
    value: '103.45',
    change: -0.12,
    chartData: generateRealisticChartData(103.5, 15, 0.005, -0.01),
    chartType: 'line',
    priority: 'normal',
    size: 'normal'
  }
];

// Smart card distribution system
export const getEnhancedCardsForLanes = (numLanes = 6) => {
  const shuffled = [...enhancedMarketData].sort(() => Math.random() - 0.5);
  const lanes = Array(numLanes).fill().map(() => []);
  
  // Distribute cards with priority balancing
  shuffled.forEach((card, index) => {
    const laneIndex = index % numLanes;
    lanes[laneIndex].push(card);
  });
  
  // Ensure each lane has minimum cards
  const minCardsPerLane = Math.max(8, Math.floor(shuffled.length / numLanes));
  lanes.forEach((lane, laneIndex) => {
    while (lane.length < minCardsPerLane) {
      const randomCard = shuffled[Math.floor(Math.random() * shuffled.length)];
      lane.push({
        ...randomCard,
        id: `${randomCard.symbol || randomCard.label}-${Date.now()}-${Math.random()}`
      });
    }
  });
  
  return lanes;
};

// Real-time data simulation
export const getRealtimeUpdate = () => {
  const marketTime = getMarketTime();
  const metrics = generateFinancialMetrics();
  const sentiment = generateSentimentData();
  
  return {
    timestamp: new Date().toISOString(),
    marketTime,
    metrics,
    sentiment,
    activeSymbols: enhancedMarketData.filter(card => card.priority === 'high').length
  };
};

// Performance analytics
export const getMarketPerformance = () => {
  return {
    topGainers: enhancedMarketData
      .filter(card => card.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 5),
    topLosers: enhancedMarketData
      .filter(card => card.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 5),
    mostActive: enhancedMarketData
      .filter(card => card.volume)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
  };
};

export { enhancedMarketData as default }; 