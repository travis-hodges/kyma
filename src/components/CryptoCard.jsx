import React, { useEffect, useRef } from 'react';
import { cardColorSchemes } from './cardData';

const CryptoCard = ({ data, style }) => {
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
    gradient.addColorStop(0, data.change >= 0 ? '#ffa500' : '#ff6b6b');
    gradient.addColorStop(1, data.change >= 0 ? '#ffa50040' : '#ff6b6b40');
    
    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = data.change >= 0 ? '#ffa500' : '#ff6b6b';
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
    if (price < 1) {
      return `$${price.toFixed(4)}`;
    }
    return `$${price.toFixed(2)}`;
  };
  
  const formatVolume = (volume) => {
    return volume;
  };
  
  const formatMarketCap = (marketCap) => {
    return marketCap;
  };
  
  return (
    <div 
      className="floating-card crypto-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="crypto-symbol">
            <span className="symbol-name">{data.symbol}</span>
            <span className="crypto-name">{data.name}</span>
          </div>
          <div className="rank-badge">
            <span className="rank-label">Rank</span>
            <span className="rank-value">#{data.rank}</span>
          </div>
        </div>
        
        {/* Price Info */}
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
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">{formatVolume(data.volume24h)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">{formatMarketCap(data.marketCap)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Supply</span>
            <span className="stat-value">{data.supply}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard; 