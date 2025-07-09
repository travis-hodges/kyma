import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  LineChart, 
  DollarSign,
  AlertCircle,
  Clock,
  Globe,
  Zap,
  Shield,
  Eye,
  Radio,
  Calculator,
  Target,
  Gauge,
  Layers,
  TrendingUpDown,
  PieChart,
  Banknote,
  Coins,
  BarChart2,
  GitBranch,
  Shuffle
} from 'lucide-react';

const MarketCard = ({ 
  type,
  symbol,
  label,
  value,
  price,
  change,
  chartData,
  chartType,
  heatmapData,
  subtitle,
  status,
  headline,
  time,
  source,
  size = 'normal', 
  lane = 0,
  glowEffect = false,
  className = '' 
}) => {
  
  // Create data object from props for backward compatibility
  const data = {
    type,
    symbol,
    label,
    value,
    price,
    change,
    chartData,
    chartType,
    heatmapData,
    subtitle,
    status,
    headline,
    time,
    source
  };
  const getSizeClasses = () => {
    switch (size) {
      case 'wide':
        return 'w-full h-auto min-h-[120px] max-w-sm';
      case 'tall':
        return 'w-full h-auto min-h-[140px] max-w-sm';
      case 'large':
        return 'w-full h-auto min-h-[130px] max-w-sm';
      case 'small':
        return 'w-full h-auto min-h-[80px] max-w-sm';
      default:
        return 'w-full h-auto min-h-[100px] max-w-sm';
    }
  };

  const getIcon = (type) => {
    const iconMap = {
      'price': TrendingUp,
      'volume': BarChart3,
      'portfolio': DollarSign,
      'signals': Activity,
      'news': Globe,
      'alerts': AlertCircle,
      'orders': Clock,
      'risk': Shield,
      'chart': LineChart,
      'live': Radio,
      'analysis': Eye,
      'volatility': Zap,
      'technical': Calculator,
      'derivatives': Target,
      'sentiment': Gauge,
      'correlation': Layers,
      'futures': TrendingUpDown,
      'crypto': Coins,
      'orderbook': BarChart2,
      'macro': Globe,
      'etf': PieChart,
      'bonds': Banknote,
      'commodities': Coins,
      'fx': Shuffle,
      'greeks': Calculator,
      'momentum': TrendingUp,
      'liquidity': Activity,
      'arbitrage': GitBranch,
      'yield': BarChart2,
      'flow': Activity,
      'credit': Banknote
    };
    const IconComponent = iconMap[type] || Activity;
    return <IconComponent className="w-4 h-4" />;
  };

  const getChangeColor = (change) => {
    if (!change) return 'text-zinc-400';
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-red-400';
    return 'text-zinc-400';
  };

  const getChangeIcon = (change) => {
    if (!change) return null;
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const formatChange = (change) => {
    if (!change) return '';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
  };

  const renderChart = () => {
    if (!data.chartData && !data.heatmapData) return null;
    
    if (data.chartType === 'line') {
      return (
        <div className="mt-4 h-12 flex items-end">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,77,0,0.8)" />
                <stop offset="100%" stopColor="rgba(255,77,0,0.4)" />
              </linearGradient>
            </defs>
            <path 
              d={data.chartData.reduce((path, point, index) => {
                const x = (index / (data.chartData.length - 1)) * 100;
                const y = 20 - (point / Math.max(...data.chartData)) * 20;
                return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
              }, '')}
              stroke="url(#lineGradient)" 
              strokeWidth="1.5" 
              fill="none"
              className="drop-shadow-sm"
            />
          </svg>
        </div>
      );
    }
    
    if (data.chartType === 'bars') {
      return (
        <div className="mt-4 h-12 flex items-end gap-0.5">
          {data.chartData.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-orange-500/50 to-orange-400/30 flex-1 min-w-[3px] rounded-t-sm"
              style={{ height: `${(value / Math.max(...data.chartData)) * 100}%` }}
            />
          ))}
        </div>
      );
    }

    if (data.chartType === 'candlestick') {
      return (
        <div className="mt-2 h-8 flex items-end gap-1">
          {data.chartData.slice(0, 8).map((candle, index) => (
            <div key={index} className="flex-1 flex justify-center">
              <div className="relative">
                {/* Wick */}
                <div
                  className="w-0.5 bg-zinc-400 mx-auto"
                  style={{
                    height: `${((candle.high - candle.low) / 10) * 32}px`,
                    marginBottom: `${((candle.low - 90) / 10) * 32}px`
                  }}
                />
                {/* Body */}
                <div
                  className={`w-2 absolute left-1/2 transform -translate-x-1/2 ${
                    candle.close > candle.open ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{
                    height: `${Math.abs((candle.close - candle.open) / 10) * 32}px`,
                    bottom: `${((Math.min(candle.open, candle.close) - 90) / 10) * 32}px`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (data.chartType === 'heatmap') {
      return (
        <div className="mt-2 h-8 grid grid-cols-8 gap-0.5">
          {data.heatmapData.flat().slice(0, 24).map((value, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-sm"
              style={{
                backgroundColor: value > 0 
                  ? `rgba(34, 197, 94, ${Math.abs(value) / 100})` 
                  : `rgba(239, 68, 68, ${Math.abs(value) / 100})`
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  const renderContent = () => {
    switch (data.type) {
      case 'price':
      case 'crypto':
      case 'futures':
      case 'bonds':
      case 'commodities':
      case 'fx':
      case 'etf':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.symbol}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${getChangeColor(data.change)}`}>
                {getChangeIcon(data.change)}
                {formatChange(data.change)}
              </div>
            </div>
            <div className="mt-3 mb-2">
              <div className="text-2xl font-bold text-white">{data.price || data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );
      
      case 'volume':
      case 'orderbook':
      case 'liquidity':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              {data.status && (
                <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-bold uppercase">
                  {data.status}
                </div>
              )}
            </div>
            <div className="mt-3 mb-2">
              <div className="text-2xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );
      
      case 'signals':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-orange-400 uppercase">LIVE</span>
              </div>
            </div>
            <div className="mt-3 mb-2">
              <div className="text-2xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
            <div className="mt-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-1 bg-orange-500/60 rounded-full"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animation: 'pulse 2s infinite'
                  }}
                />
              ))}
            </div>
          </>
        );
      
      case 'news':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              <div className="text-xs text-zinc-500">{data.time}</div>
            </div>
            <div className="mt-3 mb-2">
              <div className="text-sm font-semibold text-white leading-tight line-clamp-3">
                {data.headline}
              </div>
              {data.source && <div className="text-xs text-zinc-500 mt-2">{data.source}</div>}
            </div>
          </>
        );
      
      case 'portfolio':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${getChangeColor(data.change)}`}>
                {getChangeIcon(data.change)}
                {formatChange(data.change)}
              </div>
            </div>
            <div className="mt-3 mb-2">
              <div className="text-2xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );

      case 'technical':
      case 'derivatives':
      case 'greeks':
      case 'momentum':
      case 'arbitrage':
      case 'yield':
      case 'flow':
      case 'credit':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              {data.status && (
                <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                  data.status === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' :
                  data.status === 'SELL' ? 'bg-red-500/20 text-red-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {data.status}
                </div>
              )}
            </div>
            <div className="mt-3 mb-2">
              <div className="text-xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );

      case 'sentiment':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                data.value === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400' :
                data.value === 'BEARISH' ? 'bg-red-500/20 text-red-400' :
                'bg-zinc-500/20 text-zinc-400'
              }`}>
                {data.value}
              </div>
            </div>
            <div className="mt-3 mb-2">
              <div className="text-lg font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-2">{data.subtitle}</div>}
            </div>
          </>
        );

      case 'correlation':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-1">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );

      case 'volatility':
      case 'risk':
      case 'macro':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              {data.change && (
                <div className={`flex items-center gap-1 text-xs font-semibold ${getChangeColor(data.change)}`}>
                  {getChangeIcon(data.change)}
                  {formatChange(data.change)}
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-1">{data.subtitle}</div>}
            </div>
            {renderChart()}
          </>
        );

      case 'alerts':
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-red-400 uppercase">ALERT</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-1">{data.subtitle}</div>}
            </div>
          </>
        );
      
      default:
        return (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getIcon(data.type)}
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {data.label}
                </span>
              </div>
              {data.status && (
                <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-bold uppercase">
                  {data.status}
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-white">{data.value}</div>
              {data.subtitle && <div className="text-xs text-zinc-500 mt-1">{data.subtitle}</div>}
            </div>
          </>
        );
    }
  };

  return (
    <motion.div 
      className={`
        ${getSizeClasses()}
        bg-zinc-900/30 backdrop-blur-xl border border-zinc-700/40 rounded-lg p-4
        transition-all duration-300 hover:border-orange-500/60 hover:bg-zinc-900/40
        shadow-md shadow-orange-500/10 ring-1 ring-orange-500/8
        mx-auto
        ${className}
      `}
      style={{
        pointerEvents: 'none'
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default MarketCard; 