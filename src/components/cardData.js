// Mock data for floating card system
export const cardData = {
  stocks: [
    {
      id: 'stock-1',
      ticker: 'AAPL',
      company: 'Apple Inc.',
      price: 175.43,
      change: +2.34,
      changePercent: +1.35,
      volume: '52.7M',
      marketCap: '2.75T',
      priceData: [172.1, 173.2, 174.8, 173.5, 175.1, 174.2, 175.43],
      sector: 'Technology',
      pe: 28.5
    },
    {
      id: 'stock-2',
      ticker: 'GOOGL',
      company: 'Alphabet Inc.',
      price: 138.21,
      change: -1.87,
      changePercent: -1.33,
      volume: '31.2M',
      marketCap: '1.74T',
      priceData: [140.8, 139.5, 138.9, 140.1, 139.2, 140.08, 138.21],
      sector: 'Technology',
      pe: 25.2
    },
    {
      id: 'stock-3',
      ticker: 'MSFT',
      company: 'Microsoft Corporation',
      price: 378.85,
      change: +4.21,
      changePercent: +1.12,
      volume: '28.9M',
      marketCap: '2.81T',
      priceData: [374.2, 375.8, 377.1, 376.3, 378.2, 374.64, 378.85],
      sector: 'Technology',
      pe: 32.1
    },
    {
      id: 'stock-4',
      ticker: 'NVDA',
      company: 'NVIDIA Corporation',
      price: 485.32,
      change: +12.45,
      changePercent: +2.63,
      volume: '45.8M',
      marketCap: '1.19T',
      priceData: [472.5, 478.2, 482.1, 479.8, 485.1, 472.87, 485.32],
      sector: 'Technology',
      pe: 65.4
    },
    {
      id: 'stock-5',
      ticker: 'TSLA',
      company: 'Tesla Inc.',
      price: 248.73,
      change: -5.82,
      changePercent: -2.29,
      volume: '67.3M',
      marketCap: '791.2B',
      priceData: [254.8, 251.2, 249.9, 252.1, 250.3, 254.55, 248.73],
      sector: 'Consumer Discretionary',
      pe: 78.2
    },
    {
      id: 'stock-6',
      ticker: 'AMZN',
      company: 'Amazon.com Inc.',
      price: 145.86,
      change: +0.92,
      changePercent: +0.63,
      volume: '41.7M',
      marketCap: '1.51T',
      priceData: [144.2, 145.1, 146.3, 145.8, 144.9, 144.94, 145.86],
      sector: 'Consumer Discretionary',
      pe: 50.8
    }
  ],
  
  crypto: [
    {
      id: 'crypto-1',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43247.82,
      change: +1284.37,
      changePercent: +3.06,
      volume24h: '18.7B',
      marketCap: '846.2B',
      priceData: [41963, 42145, 42834, 42156, 43021, 41963.45, 43247.82],
      rank: 1,
      supply: '19.58M BTC'
    },
    {
      id: 'crypto-2',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2543.91,
      change: -47.23,
      changePercent: -1.82,
      volume24h: '12.4B',
      marketCap: '305.7B',
      priceData: [2591, 2567, 2534, 2578, 2551, 2591.14, 2543.91],
      rank: 2,
      supply: '120.3M ETH'
    },
    {
      id: 'crypto-3',
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change: +3.72,
      changePercent: +3.93,
      volume24h: '2.8B',
      marketCap: '43.2B',
      priceData: [94.7, 96.2, 97.8, 95.1, 98.1, 94.73, 98.45],
      rank: 5,
      supply: '439.1M SOL'
    },
    {
      id: 'crypto-4',
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.4821,
      change: +0.0234,
      changePercent: +5.11,
      volume24h: '421.7M',
      marketCap: '17.1B',
      priceData: [0.4587, 0.4634, 0.4712, 0.4598, 0.4789, 0.4587, 0.4821],
      rank: 8,
      supply: '35.5B ADA'
    },
    {
      id: 'crypto-5',
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 37.82,
      change: -1.45,
      changePercent: -3.69,
      volume24h: '534.2M',
      marketCap: '14.3B',
      priceData: [39.27, 38.91, 37.54, 38.73, 37.98, 39.27, 37.82],
      rank: 11,
      supply: '378.1M AVAX'
    },
    {
      id: 'crypto-6',
      symbol: 'DOT',
      name: 'Polkadot',
      price: 7.23,
      change: +0.18,
      changePercent: +2.55,
      volume24h: '187.5M',
      marketCap: '9.4B',
      priceData: [7.05, 7.12, 7.31, 7.08, 7.26, 7.05, 7.23],
      rank: 14,
      supply: '1.3B DOT'
    }
  ],
  
  news: [
    {
      id: 'news-1',
      headline: 'Fed Signals Potential Rate Cuts in 2024',
      source: 'Reuters',
      time: '2 hours ago',
      sentiment: 'positive',
      impact: 'high',
      category: 'monetary-policy',
      summary: 'Federal Reserve officials hint at possible interest rate reductions amid cooling inflation data.',
      relatedTickers: ['SPY', 'QQQ', 'IWM']
    },
    {
      id: 'news-2',
      headline: 'Tech Earnings Beat Expectations',
      source: 'Bloomberg',
      time: '4 hours ago',
      sentiment: 'positive',
      impact: 'medium',
      category: 'earnings',
      summary: 'Major technology companies report stronger-than-expected quarterly results.',
      relatedTickers: ['AAPL', 'MSFT', 'GOOGL']
    },
    {
      id: 'news-3',
      headline: 'Oil Prices Surge on Supply Concerns',
      source: 'Wall Street Journal',
      time: '6 hours ago',
      sentiment: 'neutral',
      impact: 'high',
      category: 'commodities',
      summary: 'Crude oil futures climb amid geopolitical tensions and supply disruptions.',
      relatedTickers: ['XOM', 'CVX', 'COP']
    },
    {
      id: 'news-4',
      headline: 'Bitcoin ETF Sees Record Inflows',
      source: 'CoinDesk',
      time: '8 hours ago',
      sentiment: 'positive',
      impact: 'medium',
      category: 'crypto',
      summary: 'Spot Bitcoin ETFs attract unprecedented investor interest with $2.1B in daily inflows.',
      relatedTickers: ['BTC', 'ETH']
    },
    {
      id: 'news-5',
      headline: 'Manufacturing Data Shows Contraction',
      source: 'Financial Times',
      time: '12 hours ago',
      sentiment: 'negative',
      impact: 'medium',
      category: 'economic-data',
      summary: 'PMI index falls below 50, indicating manufacturing sector weakness.',
      relatedTickers: ['XLI', 'GE', 'CAT']
    },
    {
      id: 'news-6',
      headline: 'AI Stocks Rally on Breakthrough News',
      source: 'TechCrunch',
      time: '1 day ago',
      sentiment: 'positive',
      impact: 'high',
      category: 'technology',
      summary: 'Artificial intelligence companies surge following major technological advancement.',
      relatedTickers: ['NVDA', 'AMD', 'GOOGL']
    }
  ],
  
  economic: [
    {
      id: 'economic-1',
      indicator: 'Federal Funds Rate',
      value: '5.25%',
      previousValue: '5.00%',
      change: '+0.25%',
      trend: 'up',
      impact: 'high',
      nextRelease: 'Dec 13, 2024',
      description: 'The interest rate at which banks lend to each other overnight.',
      category: 'monetary-policy'
    },
    {
      id: 'economic-2',
      indicator: 'Unemployment Rate',
      value: '3.7%',
      previousValue: '3.8%',
      change: '-0.1%',
      trend: 'down',
      impact: 'high',
      nextRelease: 'Dec 6, 2024',
      description: 'Percentage of labor force that is unemployed but actively seeking work.',
      category: 'employment'
    },
    {
      id: 'economic-3',
      indicator: 'CPI (YoY)',
      value: '3.2%',
      previousValue: '3.7%',
      change: '-0.5%',
      trend: 'down',
      impact: 'high',
      nextRelease: 'Dec 12, 2024',
      description: 'Consumer Price Index measures inflation in consumer goods and services.',
      category: 'inflation'
    },
    {
      id: 'economic-4',
      indicator: 'GDP Growth (QoQ)',
      value: '2.1%',
      previousValue: '2.4%',
      change: '-0.3%',
      trend: 'down',
      impact: 'high',
      nextRelease: 'Dec 21, 2024',
      description: 'Quarterly change in Gross Domestic Product, annualized.',
      category: 'growth'
    },
    {
      id: 'economic-5',
      indicator: 'PMI Manufacturing',
      value: '48.7',
      previousValue: '49.2',
      change: '-0.5',
      trend: 'down',
      impact: 'medium',
      nextRelease: 'Dec 2, 2024',
      description: 'Manufacturing Purchasing Managers Index, below 50 indicates contraction.',
      category: 'manufacturing'
    },
    {
      id: 'economic-6',
      indicator: 'Consumer Confidence',
      value: '102.8',
      previousValue: '99.1',
      change: '+3.7',
      trend: 'up',
      impact: 'medium',
      nextRelease: 'Dec 27, 2024',
      description: 'Index measuring consumer optimism about economic conditions.',
      category: 'sentiment'
    }
  ],
  
  options: [
    {
      id: 'option-1',
      symbol: 'AAPL $180 Call',
      underlying: 'AAPL',
      type: 'call',
      strike: 180,
      expiry: '2024-12-20',
      premium: 3.45,
      change: +0.12,
      changePercent: +3.6,
      volume: '12.4K',
      openInterest: '45.2K',
      impliedVolatility: 28.5,
      delta: 0.65,
      gamma: 0.02,
      theta: -0.08,
      vega: 0.15
    },
    {
      id: 'option-2',
      symbol: 'SPY $450 Put',
      underlying: 'SPY',
      type: 'put',
      strike: 450,
      expiry: '2024-12-15',
      premium: 2.78,
      change: -0.23,
      changePercent: -7.6,
      volume: '28.7K',
      openInterest: '67.1K',
      impliedVolatility: 22.3,
      delta: -0.42,
      gamma: 0.015,
      theta: -0.06,
      vega: 0.12
    },
    {
      id: 'option-3',
      symbol: 'NVDA $500 Call',
      underlying: 'NVDA',
      type: 'call',
      strike: 500,
      expiry: '2024-12-27',
      premium: 8.20,
      change: +1.45,
      changePercent: +21.5,
      volume: '34.2K',
      openInterest: '23.8K',
      impliedVolatility: 45.7,
      delta: 0.78,
      gamma: 0.008,
      theta: -0.12,
      vega: 0.22
    },
    {
      id: 'option-4',
      symbol: 'TSLA $250 Put',
      underlying: 'TSLA',
      type: 'put',
      strike: 250,
      expiry: '2024-12-13',
      premium: 4.65,
      change: +0.87,
      changePercent: +23.0,
      volume: '19.6K',
      openInterest: '31.4K',
      impliedVolatility: 52.1,
      delta: -0.55,
      gamma: 0.012,
      theta: -0.15,
      vega: 0.18
    }
  ],
  
  forex: [
    {
      id: 'forex-1',
      pair: 'EUR/USD',
      base: 'EUR',
      quote: 'USD',
      price: 1.0876,
      change: +0.0023,
      changePercent: +0.21,
      bid: 1.0875,
      ask: 1.0877,
      spread: 0.0002,
      volume24h: '145.2B',
      high24h: 1.0891,
      low24h: 1.0834,
      session: 'London'
    },
    {
      id: 'forex-2',
      pair: 'GBP/JPY',
      base: 'GBP',
      quote: 'JPY',
      price: 189.45,
      change: -1.23,
      changePercent: -0.65,
      bid: 189.42,
      ask: 189.48,
      spread: 0.06,
      volume24h: '67.8B',
      high24h: 191.23,
      low24h: 188.76,
      session: 'Tokyo'
    },
    {
      id: 'forex-3',
      pair: 'USD/CHF',
      base: 'USD',
      quote: 'CHF',
      price: 0.8734,
      change: +0.0045,
      changePercent: +0.52,
      bid: 0.8732,
      ask: 0.8736,
      spread: 0.0004,
      volume24h: '89.3B',
      high24h: 0.8756,
      low24h: 0.8701,
      session: 'New York'
    },
    {
      id: 'forex-4',
      pair: 'AUD/CAD',
      base: 'AUD',
      quote: 'CAD',
      price: 0.9123,
      change: -0.0087,
      changePercent: -0.94,
      bid: 0.9121,
      ask: 0.9125,
      spread: 0.0004,
      volume24h: '23.7B',
      high24h: 0.9187,
      low24h: 0.9098,
      session: 'Sydney'
    }
  ],
  
  commodities: [
    {
      id: 'commodity-1',
      name: 'Gold',
      symbol: 'XAU/USD',
      price: 2047.35,
      change: +12.45,
      changePercent: +0.61,
      unit: 'USD/oz',
      volume: '67.2K lots',
      high24h: 2052.80,
      low24h: 2031.20,
      openInterest: '234.5K',
      contract: 'Dec 2024',
      exchange: 'COMEX'
    },
    {
      id: 'commodity-2',
      name: 'Crude Oil WTI',
      symbol: 'CL',
      price: 73.28,
      change: -1.87,
      changePercent: -2.49,
      unit: 'USD/barrel',
      volume: '145.8K lots',
      high24h: 75.92,
      low24h: 72.45,
      openInterest: '567.3K',
      contract: 'Jan 2025',
      exchange: 'NYMEX'
    },
    {
      id: 'commodity-3',
      name: 'Silver',
      symbol: 'XAG/USD',
      price: 24.87,
      change: +0.78,
      changePercent: +3.24,
      unit: 'USD/oz',
      volume: '23.4K lots',
      high24h: 25.12,
      low24h: 23.95,
      openInterest: '89.7K',
      contract: 'Dec 2024',
      exchange: 'COMEX'
    },
    {
      id: 'commodity-4',
      name: 'Natural Gas',
      symbol: 'NG',
      price: 2.847,
      change: +0.124,
      changePercent: +4.55,
      unit: 'USD/mmBtu',
      volume: '89.1K lots',
      high24h: 2.892,
      low24h: 2.701,
      openInterest: '456.2K',
      contract: 'Jan 2025',
      exchange: 'NYMEX'
    },
    {
      id: 'commodity-5',
      name: 'Copper',
      symbol: 'HG',
      price: 3.854,
      change: -0.067,
      changePercent: -1.71,
      unit: 'USD/lb',
      volume: '34.7K lots',
      high24h: 3.921,
      low24h: 3.832,
      openInterest: '167.8K',
      contract: 'Mar 2025',
      exchange: 'COMEX'
    }
  ]
};

// Helper function to get random items from each category
export const getRandomCards = (count = 20) => {
  const allCards = [];
  
  // Add type identifier to each card
  cardData.stocks.forEach(card => allCards.push({...card, type: 'stock'}));
  cardData.crypto.forEach(card => allCards.push({...card, type: 'crypto'}));
  cardData.news.forEach(card => allCards.push({...card, type: 'news'}));
  cardData.economic.forEach(card => allCards.push({...card, type: 'economic'}));
  cardData.options.forEach(card => allCards.push({...card, type: 'options'}));
  cardData.forex.forEach(card => allCards.push({...card, type: 'forex'}));
  cardData.commodities.forEach(card => allCards.push({...card, type: 'commodities'}));
  
  // Shuffle and return requested count
  const shuffled = allCards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get cards by type
export const getCardsByType = (type) => {
  if (!cardData[type]) return [];
  return cardData[type].map(card => ({...card, type}));
};

// Color schemes for each card type
export const cardColorSchemes = {
  stock: {
    primary: 'rgba(52, 211, 153, 0.6)',
    secondary: 'rgba(52, 211, 153, 0.2)',
    accent: 'rgb(52, 211, 153)',
    glow: 'rgba(52, 211, 153, 0.4)'
  },
  crypto: {
    primary: 'rgba(255, 165, 0, 0.6)',
    secondary: 'rgba(255, 165, 0, 0.2)',
    accent: 'rgb(255, 165, 0)',
    glow: 'rgba(255, 165, 0, 0.4)'
  },
  news: {
    primary: 'rgba(59, 130, 246, 0.6)',
    secondary: 'rgba(59, 130, 246, 0.2)',
    accent: 'rgb(59, 130, 246)',
    glow: 'rgba(59, 130, 246, 0.4)'
  },
  economic: {
    primary: 'rgba(168, 85, 247, 0.6)',
    secondary: 'rgba(168, 85, 247, 0.2)',
    accent: 'rgb(168, 85, 247)',
    glow: 'rgba(168, 85, 247, 0.4)'
  }
}; 