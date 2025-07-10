import React from 'react';
import { cardColorSchemes } from './cardData';

const NewsCard = ({ data, style }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#10b981';
      case 'negative':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };
  
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };
  
  const getImpactLevel = (impact) => {
    switch (impact) {
      case 'high':
        return { color: '#ef4444', text: 'High Impact' };
      case 'medium':
        return { color: '#f59e0b', text: 'Medium Impact' };
      default:
        return { color: '#6b7280', text: 'Low Impact' };
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      'monetary-policy': '#8b5cf6',
      'earnings': '#10b981',
      'commodities': '#f59e0b',
      'crypto': '#ff6b35',
      'economic-data': '#3b82f6',
      'technology': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };
  
  const truncateHeadline = (headline, maxLength = 80) => {
    if (headline.length <= maxLength) return headline;
    return headline.substring(0, maxLength) + '...';
  };
  
  return (
    <div 
      className="floating-card news-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="news-source">
            <span className="source-name">{data.source}</span>
            <span className="news-time">{data.time}</span>
          </div>
          <div className="impact-badge">
            {getImpactLevel(data.impact).text}
          </div>
        </div>
        
        {/* Headline */}
        <div className="headline-section">
          <h3 className="news-headline">
            {truncateHeadline(data.headline)}
          </h3>
          <div className="sentiment-indicator">
            <span 
              className="sentiment-icon"
              style={{ color: getSentimentColor(data.sentiment) }}
            >
              {getSentimentIcon(data.sentiment)}
            </span>
            <span 
              className="sentiment-text"
              style={{ color: getSentimentColor(data.sentiment) }}
            >
              {data.sentiment}
            </span>
          </div>
        </div>
        
        {/* Summary */}
        <div className="news-summary">
          {data.summary}
        </div>
        
        {/* Category & Related Tickers */}
        <div className="news-footer">
          <div className="category-badge">
            {data.category.replace('-', ' ').toUpperCase()}
          </div>
          <div className="related-tickers">
            {data.relatedTickers && data.relatedTickers.slice(0, 3).map((ticker, index) => (
              <span key={index} className="ticker-tag">
                {ticker}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 