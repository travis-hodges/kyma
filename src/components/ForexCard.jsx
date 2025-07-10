import React from 'react';

const ForexCard = ({ data, style }) => {
  const formatPrice = (price, decimals = 4) => {
    return price.toFixed(decimals);
  };
  
  const getSessionColor = (session) => {
    const colors = {
      'London': '#10b981',
      'New York': '#3b82f6',
      'Tokyo': '#f59e0b',
      'Sydney': '#8b5cf6'
    };
    return colors[session] || '#6b7280';
  };
  
  const getFlag = (currency) => {
    const flags = {
      'USD': '🇺🇸',
      'EUR': '🇪🇺',
      'GBP': '🇬🇧',
      'JPY': '🇯🇵',
      'CHF': '🇨🇭',
      'AUD': '🇦🇺',
      'CAD': '🇨🇦'
    };
    return flags[currency] || '🏳️';
  };
  
  return (
    <div 
      className="floating-card forex-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="forex-pair">
            <div className="currency-symbols">
              <span className="base-currency">
                {getFlag(data.base)} {data.base}
              </span>
              <span className="pair-divider">/</span>
              <span className="quote-currency">
                {getFlag(data.quote)} {data.quote}
              </span>
            </div>
            <div 
              className="session-badge"
              style={{ 
                backgroundColor: `${getSessionColor(data.session)}20`, 
                color: getSessionColor(data.session),
                border: `1px solid ${getSessionColor(data.session)}40`
              }}
            >
              <span className="session-label">Session:</span>
              <span className="session-value">{data.session}</span>
            </div>
          </div>
        </div>
        
        {/* Current Price & Change */}
        <div className="price-section">
          <div className="current-price">
            {formatPrice(data.price)}
          </div>
          <div className={`price-change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            <span className="change-amount">
              {data.change >= 0 ? '+' : ''}{formatPrice(Math.abs(data.change))}
            </span>
            <span className="change-percent">
              ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        {/* Bid/Ask Spread */}
        <div className="bid-ask-section">
          <div className="bid-ask-grid">
            <div className="bid-item">
              <span className="label">Bid</span>
              <span className="value">{formatPrice(data.bid)}</span>
            </div>
            <div className="ask-item">
              <span className="label">Ask</span>
              <span className="value">{formatPrice(data.ask)}</span>
            </div>
          </div>
          <div className="spread-info">
            <span className="spread-label">Spread</span>
            <span className="spread-value">{formatPrice(data.spread)}</span>
          </div>
        </div>
        
        {/* 24h High/Low */}
        <div className="range-section">
          <div className="range-label">24h Range</div>
          <div className="range-bar">
            <div className="range-low">{formatPrice(data.low24h)}</div>
            <div className="range-high">{formatPrice(data.high24h)}</div>
          </div>
        </div>
        
        {/* Volume */}
        <div className="volume-section">
          <div className="volume-item">
            <span className="volume-label">24h Volume</span>
            <span className="volume-value">{data.volume24h}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexCard; 