import React from 'react';
import { cardColorSchemes } from './cardData';

const EconomicCard = ({ data, style }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return '#10b981';
      case 'down':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };
  
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };
  
  const getImpactLevel = (impact) => {
    switch (impact) {
      case 'high':
        return { color: '#ef4444', text: 'High Impact', intensity: 3 };
      case 'medium':
        return { color: '#f59e0b', text: 'Medium Impact', intensity: 2 };
      default:
        return { color: '#6b7280', text: 'Low Impact', intensity: 1 };
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      'monetary-policy': '#8b5cf6',
      'employment': '#10b981',
      'inflation': '#ef4444',
      'growth': '#3b82f6',
      'manufacturing': '#f59e0b',
      'sentiment': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };
  
  const formatNextRelease = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(date - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays} days`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  const getChangeDirection = (change) => {
    if (change.includes('+')) return 'positive';
    if (change.includes('-')) return 'negative';
    return 'neutral';
  };
  
  return (
    <div 
      className="floating-card economic-card"
      style={style}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="indicator-name">
            <span className="indicator-title">{data.indicator}</span>
            <span className="category-tag">
              {data.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          <div className="impact-indicator">
            <span className="impact-label">Impact:</span>
            <span 
              className="impact-value"
              style={{ color: getImpactLevel(data.impact).color }}
            >
              {getImpactLevel(data.impact).text}
            </span>
          </div>
        </div>
        
        {/* Current Value */}
        <div className="value-section">
          <div className="current-value">
            {data.value}
          </div>
          <div className="trend-info">
            <span 
              className="trend-icon"
              style={{ color: getTrendColor(data.trend) }}
            >
              {getTrendIcon(data.trend)}
            </span>
            <span 
              className={`change-value ${getChangeDirection(data.change)}`}
              style={{ color: getTrendColor(data.trend) }}
            >
              {data.change}
            </span>
          </div>
        </div>
        
        {/* Previous Value Comparison */}
        <div className="comparison-section">
          <div className="comparison-item">
            <span className="comparison-label">Previous</span>
            <span className="comparison-value">{data.previousValue}</span>
          </div>
          <div className="comparison-arrow">
            <span 
              className="arrow-icon"
              style={{ color: getTrendColor(data.trend) }}
            >
              {getTrendIcon(data.trend)}
            </span>
          </div>
          <div className="comparison-item">
            <span className="comparison-label">Current</span>
            <span className="comparison-value">{data.value}</span>
          </div>
        </div>
        
        {/* Description */}
        <div className="description-section">
          <p className="indicator-description">
            {data.description}
          </p>
        </div>
        
        {/* Next Release */}
        <div className="release-info">
          <span className="release-label">Next Release:</span>
          <span className="release-date">{formatNextRelease(data.nextRelease)}</span>
        </div>
      </div>
    </div>
  );
};

export default EconomicCard; 