import React from 'react';

const CommoditiesCard = ({ data, style }) => {
  const formatPrice = (price) => {
    return price.toFixed(2);
  };
  
  const getCommodityIcon = (symbol) => {
    const icons = {
      'XAU/USD': '🥇',
      'XAG/USD': '🥈',
      'CL': '🛢️',
      'NG': '🔥',
      'HG': '🔶'
    };
    return icons[symbol] || '📈';
  };
  
  const getCommodityColor = (name) => {
    const colors = {
      'Gold': '#ffd700',
      'Silver': '#c0c0c0',
      'Crude Oil WTI': '#1a1a1a',
      'Natural Gas': '#3b82f6',
      'Copper': '#cd7f32'
    };
    return colors[name] || '#f59e0b';
  };
  
  return (
    <div 
      className="floating-card commodities-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="commodity-info">
            <div className="commodity-symbol">
              <span className="icon">{getCommodityIcon(data.symbol)}</span>
              <span className="name">{data.name}</span>
            </div>
            <div className="exchange-info">
              <span className="exchange">{data.exchange}</span>
            </div>
          </div>
        </div>
        
        {/* Price & Change */}
        <div className="price-section">
          <div className="current-price">
            {data.unit.startsWith('USD') ? '$' : ''}{formatPrice(data.price)}
          </div>
          <div className="price-unit">{data.unit}</div>
          <div className={`price-change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            <span className="change-amount">
              {data.change >= 0 ? '+' : ''}{formatPrice(Math.abs(data.change))}
            </span>
            <span className="change-percent">
              ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        {/* Contract Info */}
        <div className="contract-section">
          <div className="contract-item">
            <span className="contract-label">Contract</span>
            <span className="contract-value">{data.contract}</span>
          </div>
          <div className="symbol-display">
            <span className="symbol-label">Symbol</span>
            <span className="symbol-value">{data.symbol}</span>
          </div>
        </div>
        
        {/* 24h High/Low */}
        <div className="range-section">
          <div className="range-label">24h Range</div>
          <div className="range-display">
            <div className="range-item">
              <span className="range-type">Low</span>
              <span className="range-value">{formatPrice(data.low24h)}</span>
            </div>
            <div className="range-bar">
              <div 
                className="range-fill"
                style={{ 
                  background: `linear-gradient(90deg, ${getCommodityColor(data.name)}40 0%, ${getCommodityColor(data.name)} 100%)`
                }}
              ></div>
            </div>
            <div className="range-item">
              <span className="range-type">High</span>
              <span className="range-value">{formatPrice(data.high24h)}</span>
            </div>
          </div>
        </div>
        
        {/* Volume & Open Interest */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Volume</span>
            <span className="stat-value">{data.volume}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Open Interest</span>
            <span className="stat-value">{data.openInterest}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommoditiesCard; 