import React, { useEffect, useRef } from 'react';
import { cardColorSchemes } from './cardData';

const StockCard = ({ data, style }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.priceData) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw price chart
    const prices = data.priceData;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice;
    
    if (priceRange === 0) return;
    
    const stepX = width / (prices.length - 1);
    const padding = 5;
    
    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, data.change >= 0 ? '#10b981' : '#ef4444');
    gradient.addColorStop(1, data.change >= 0 ? '#10b98140' : '#ef444440');
    
    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = data.change >= 0 ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    prices.forEach((price, index) => {
      const x = index * stepX;
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Fill area under line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
  }, [data.priceData, data.change]);
  
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    }
    return `$${price.toFixed(2)}`;
  };
  
  const formatMarketCap = (marketCap) => {
    if (marketCap.includes('T')) {
      return marketCap;
    }
    if (marketCap.includes('B')) {
      return marketCap;
    }
    return marketCap;
  };
  
  return (
    <div 
      className="floating-card stock-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="stock-ticker">
            <span className="ticker-symbol">{data.ticker}</span>
            <span className="company-name">{data.company}</span>
          </div>
          <div className="sector-badge">
            {data.sector}
          </div>
        </div>
        
        {/* Price Info */}
        <div className="price-section">
          <div className="current-price">
            {formatPrice(data.price)}
          </div>
          <div className={`price-change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            <span className="change-amount">
              {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
            </span>
            <span className="change-percent">
              ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        {/* Mini Chart */}
        <div className="chart-container">
          <canvas 
            ref={canvasRef}
            width={160}
            height={40}
            className="price-chart"
          />
        </div>
        
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Volume</span>
            <span className="stat-value">{data.volume}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">{formatMarketCap(data.marketCap)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">P/E</span>
            <span className="stat-value">{data.pe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard; 