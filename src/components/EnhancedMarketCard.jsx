import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Shuffle,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const EnhancedMarketCard = ({ 
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
  priority = 'normal',
  animated = true,
  glowEffect = false,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const [animationDelay, setAnimationDelay] = useState(0);

  // Intersection Observer for smooth entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationDelay(Math.random() * 0.3);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      'credit': Banknote,
      'sector': PieChart,
      'economic': Globe,
      'options': Target,
      'breadth': BarChart3
    };
    const IconComponent = iconMap[type] || Activity;
    return <IconComponent className="w-4 h-4" />;
  };

  const getTypeColors = (type) => {
    const colorMap = {
      'price': { bg: 'from-emerald-500/10 to-green-500/5', border: 'border-emerald-500/20', icon: 'bg-emerald-500/20 text-emerald-400' },
      'crypto': { bg: 'from-orange-500/10 to-yellow-500/5', border: 'border-orange-500/20', icon: 'bg-orange-500/20 text-orange-400' },
      'technical': { bg: 'from-purple-500/10 to-violet-500/5', border: 'border-purple-500/20', icon: 'bg-purple-500/20 text-purple-400' },
      'news': { bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/20', icon: 'bg-blue-500/20 text-blue-400' },
      'bonds': { bg: 'from-indigo-500/10 to-blue-500/5', border: 'border-indigo-500/20', icon: 'bg-indigo-500/20 text-indigo-400' },
      'commodities': { bg: 'from-amber-500/10 to-orange-500/5', border: 'border-amber-500/20', icon: 'bg-amber-500/20 text-amber-400' },
      'fx': { bg: 'from-teal-500/10 to-cyan-500/5', border: 'border-teal-500/20', icon: 'bg-teal-500/20 text-teal-400' },
      'futures': { bg: 'from-pink-500/10 to-rose-500/5', border: 'border-pink-500/20', icon: 'bg-pink-500/20 text-pink-400' },
      'options': { bg: 'from-lime-500/10 to-green-500/5', border: 'border-lime-500/20', icon: 'bg-lime-500/20 text-lime-400' },
      'volatility': { bg: 'from-red-500/10 to-orange-500/5', border: 'border-red-500/20', icon: 'bg-red-500/20 text-red-400' },
      'sector': { bg: 'from-slate-500/10 to-gray-500/5', border: 'border-slate-500/20', icon: 'bg-slate-500/20 text-slate-400' },
      'economic': { bg: 'from-violet-500/10 to-purple-500/5', border: 'border-violet-500/20', icon: 'bg-violet-500/20 text-violet-400' },
      'breadth': { bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/20', icon: 'bg-emerald-500/20 text-emerald-400' }
    };
    return colorMap[type] || { bg: 'from-zinc-500/10 to-gray-500/5', border: 'border-zinc-500/20', icon: 'bg-zinc-500/20 text-zinc-400' };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'BUY': return 'text-emerald-300 bg-emerald-500/20';
      case 'SELL': return 'text-red-300 bg-red-500/20';
      case 'HOLD': return 'text-yellow-300 bg-yellow-500/20';
      case 'WARNING': return 'text-orange-300 bg-orange-500/20';
      default: return 'text-blue-300 bg-blue-500/20';
    }
  };

  const getChangeColor = (change) => {
    if (!change) return 'text-zinc-400';
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-red-400';
    return 'text-zinc-400';
  };

  const getChangeIcon = (change) => {
    if (!change) return <Minus className="w-3 h-3" />;
    if (change > 0) return <ArrowUp className="w-3 h-3" />;
    if (change < 0) return <ArrowDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const formatChange = (change) => {
    if (!change) return '0.00%';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
  };

  const typeColors = getTypeColors(type);

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return 'min-h-[200px] w-full';
      case 'wide':
        return 'min-h-[140px] w-full';
      case 'tall':
        return 'min-h-[180px] w-full';
      case 'small':
        return 'min-h-[120px] w-full';
      default:
        return 'min-h-[160px] w-full';
    }
  };

  const renderAdvancedChart = () => {
    if (!chartData && !heatmapData) return null;
    
    if (chartType === 'line') {
      const maxValue = Math.max(...chartData);
      const minValue = Math.min(...chartData);
      const range = maxValue - minValue || 1;
      
      return (
        <div className="mt-4 h-16 relative overflow-hidden rounded-lg bg-black/20 p-3">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${type}-${symbol || label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={change > 0 ? "rgba(52,211,153,0.8)" : "rgba(248,113,113,0.8)"} />
                <stop offset="100%" stopColor={change > 0 ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"} />
              </linearGradient>
              <linearGradient id={`fill-${type}-${symbol || label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={change > 0 ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"} />
                <stop offset="100%" stopColor={change > 0 ? "rgba(52,211,153,0.05)" : "rgba(248,113,113,0.05)"} />
              </linearGradient>
            </defs>
            <path 
              d={chartData.reduce((path, point, index) => {
                const x = (index / (chartData.length - 1)) * 100;
                const y = 35 - ((point - minValue) / range) * 30;
                return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
              }, '')}
              stroke={`url(#gradient-${type}-${symbol || label})`}
              strokeWidth="2" 
              fill="none"
              className="drop-shadow-sm"
            />
            <path 
              d={chartData.reduce((path, point, index) => {
                const x = (index / (chartData.length - 1)) * 100;
                const y = 35 - ((point - minValue) / range) * 30;
                return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
              }, '') + ` L 100 35 L 0 35 Z`}
              fill={`url(#fill-${type}-${symbol || label})`}
            />
          </svg>
        </div>
      );
    }

    if (chartType === 'bars') {
      return (
        <div className="mt-4 h-14 flex items-end gap-1 px-3 py-2 bg-black/20 rounded-lg">
          {chartData.slice(0, 12).map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(value / Math.max(...chartData)) * 100}%` }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="bg-gradient-to-t from-orange-500/80 to-orange-400/50 flex-1 min-w-[2px] rounded-t-sm"
            />
          ))}
        </div>
      );
    }

    if (chartType === 'sparkline') {
      return (
        <div className="mt-3 h-10 flex items-center px-3 py-1 bg-black/20 rounded-lg">
          <svg viewBox="0 0 60 20" className="w-full h-full">
            <path 
              d={chartData.slice(0, 12).reduce((path, point, index) => {
                const x = (index / 11) * 60;
                const y = 15 - (point / Math.max(...chartData)) * 10;
                return path + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
              }, '')}
              stroke={change > 0 ? "#10b981" : "#ef4444"}
              strokeWidth="2" 
              fill="none"
              className="drop-shadow-sm"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (type === 'price' || type === 'crypto') {
      return (
        <div className="flex flex-col h-full justify-between p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${typeColors.icon}`}>
                {getIcon(type)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-wide">{symbol || label}</span>
                <span className="text-xs text-zinc-400 capitalize">{type}</span>
              </div>
            </div>
            {glowEffect && (
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"
              />
            )}
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <span className="text-lg font-bold text-white truncate">{price || value}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(change)}`}>
              {getChangeIcon(change)}
              <span>{formatChange(change)}</span>
            </div>
          </div>

          {renderAdvancedChart()}
        </div>
      );
    }

    if (type === 'news') {
      return (
        <div className="flex flex-col h-full justify-between p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${typeColors.icon}`}>
              {getIcon(type)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400">{time}</span>
              <span className="text-xs text-zinc-500">{source}</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-white leading-relaxed line-clamp-3">{headline}</h4>
        </div>
      );
    }

    if (type === 'technical') {
      return (
        <div className="flex flex-col h-full justify-between p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${typeColors.icon}`}>
                {getIcon(type)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white truncate">{label}</span>
                <span className="text-xs text-zinc-400">Technical</span>
              </div>
            </div>
            {status && (
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                {status}
              </span>
            )}
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <span className="text-lg font-bold text-white">{value}</span>
          </div>

          {subtitle && (
            <p className="text-xs text-zinc-400 mb-4 line-clamp-2">{subtitle}</p>
          )}

          {renderAdvancedChart()}
        </div>
      );
    }

    // Default content for other types
    return (
      <div className="flex flex-col h-full justify-between p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${typeColors.icon}`}>
              {getIcon(type)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white truncate">{label || symbol}</span>
              <span className="text-xs text-zinc-400 capitalize">{type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <span className="text-lg font-bold text-white truncate">{value || price}</span>
          {change && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(change)}`}>
              {getChangeIcon(change)}
              <span>{formatChange(change)}</span>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-zinc-400 mb-4 line-clamp-2">{subtitle}</p>
        )}

        {renderAdvancedChart()}
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      initial={animated ? { opacity: 0, y: 20, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: animationDelay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-type={type}
      className={`
        enhanced-market-card
        relative ${getSizeStyles()} rounded-xl
        ${isHovered ? 'shadow-2xl' : ''}
        cursor-pointer transition-all duration-300
        overflow-hidden
        ${className}
      `}
          >
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {renderContent()}
        </div>

        {/* Priority indicator */}
        {priority === 'high' && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50 z-20"
          />
        )}
      </motion.div>
  );
};

export default EnhancedMarketCard; 