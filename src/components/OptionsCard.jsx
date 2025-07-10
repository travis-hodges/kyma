import React from 'react';

const OptionsCard = ({ data, style }) => {
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  const formatGreek = (value, places = 2) => {
    return value.toFixed(places);
  };
  
  const formatExpiry = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getTypeColor = (type) => {
    return type === 'call' ? '#10b981' : '#ef4444';
  };
  
  return (
    <div 
      className="floating-card options-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="option-symbol">
            <span className="symbol-name">{data.symbol}</span>
            <span className="underlying-name">{data.underlying}</span>
          </div>
          <div 
            className="type-badge"
            style={{ 
              backgroundColor: `${getTypeColor(data.type)}20`, 
              color: getTypeColor(data.type),
              border: `1px solid ${getTypeColor(data.type)}40`
            }}
          >
            {data.type.toUpperCase()}
          </div>
        </div>
        
        {/* Premium & Change */}
        <div className="price-section">
          <div className="current-premium">
            {formatPrice(data.premium)}
          </div>
          <div className={`price-change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            <span className="change-amount">
              {data.change >= 0 ? '+' : ''}{formatPrice(Math.abs(data.change))}
            </span>
            <span className="change-percent">
              ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(1)}%)
            </span>
          </div>
        </div>
        
        {/* Strike & Expiry */}
        <div className="option-details">
          <div className="detail-item">
            <span className="detail-label">Strike</span>
            <span className="detail-value">{formatPrice(data.strike)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Expires</span>
            <span className="detail-value">{formatExpiry(data.expiry)}</span>
          </div>
        </div>
        
        {/* Greeks */}
        <div className="greeks-section">
          <div className="greeks-grid">
            <div className="greek-item">
              <span className="greek-label">Δ</span>
              <span className="greek-value">{formatGreek(data.delta)}</span>
            </div>
            <div className="greek-item">
              <span className="greek-label">Γ</span>
              <span className="greek-value">{formatGreek(data.gamma, 3)}</span>
            </div>
            <div className="greek-item">
              <span className="greek-label">Θ</span>
              <span className="greek-value">{formatGreek(data.theta)}</span>
            </div>
            <div className="greek-item">
              <span className="greek-label">ν</span>
              <span className="greek-value">{formatGreek(data.vega)}</span>
            </div>
          </div>
        </div>
        
        {/* Volume & IV */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Volume</span>
            <span className="stat-value">{data.volume}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Open Int</span>
            <span className="stat-value">{data.openInterest}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">IV</span>
            <span className="stat-value">{data.impliedVolatility.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsCard; 