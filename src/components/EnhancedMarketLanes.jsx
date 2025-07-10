import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedMarketCard from './EnhancedMarketCard';
import { getEnhancedCardsForLanes } from './EnhancedMarketData';

const EnhancedMarketLanes = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef(null);

  // Advanced responsive lane configuration with better spacing
  const getLaneConfiguration = useCallback(() => {
    const { width, height } = windowSize;
    
    // Enhanced configuration with much better spacing
    let laneCount, cardWidth, cardSpacing, laneSpacing, speed;
    
    if (width >= 1920) {
      // 4K and ultra-wide
      laneCount = 8;
      cardWidth = 300;
      cardSpacing = 32; // Increased spacing
      laneSpacing = 24;
      speed = 0.3;
    } else if (width >= 1536) {
      // 2xl
      laneCount = 7;
      cardWidth = 280;
      cardSpacing = 28;
      laneSpacing = 20;
      speed = 0.35;
    } else if (width >= 1280) {
      // xl
      laneCount = 6;
      cardWidth = 260;
      cardSpacing = 24;
      laneSpacing = 18;
      speed = 0.4;
    } else if (width >= 1024) {
      // lg
      laneCount = 5;
      cardWidth = 240;
      cardSpacing = 20;
      laneSpacing = 16;
      speed = 0.45;
    } else if (width >= 768) {
      // md
      laneCount = 4;
      cardWidth = 220;
      cardSpacing = 18;
      laneSpacing = 14;
      speed = 0.5;
    } else if (width >= 640) {
      // sm
      laneCount = 3;
      cardWidth = 200;
      cardSpacing = 16;
      laneSpacing = 12;
      speed = 0.55;
          } else {
        // mobile
        laneCount = 2;
        cardWidth = 180;
        cardSpacing = 14;
        laneSpacing = 10;
        speed = 0.6;
      }
    
    return {
      laneCount,
      cardWidth,
      cardSpacing,
      laneSpacing,
      speed,
      visibleHeight: height + 600, // Much larger buffer
      cardHeight: 200 // Increased card height for better proportions
    };
  }, [windowSize]);

  const config = useMemo(() => getLaneConfiguration(), [getLaneConfiguration]);

  // Enhanced card data with MUCH better infinite scrolling
  const enhancedCardData = useMemo(() => {
    if (!isInitialized) return [];
    
    const baseCards = getEnhancedCardsForLanes(config.laneCount);
    
    return baseCards.map((laneCards, laneIndex) => {
      // Ensure we have enough unique cards per lane
      const enhancedCards = laneCards.map((card, cardIndex) => {
        const isPriority = Math.random() < 0.3; // 30% high priority
        const isMedium = Math.random() < 0.4; // 40% medium priority
        const hasGlow = Math.random() < 0.25; // 25% glow effect
        
        return {
          ...card,
          id: `lane-${laneIndex}-card-${cardIndex}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          priority: isPriority ? 'high' : isMedium ? 'medium' : 'normal',
          glowEffect: hasGlow || card.priority === 'high',
          laneIndex,
          cardIndex,
          animated: true,
          size: card.size || 'normal'
        };
      });
      
      // Create MUCH longer infinite stream to prevent running out
      const stream = [];
      const minStreamLength = Math.max(100, Math.ceil((config.visibleHeight * 4) / config.cardHeight)); // 4x buffer
      const repetitions = Math.ceil(minStreamLength / enhancedCards.length);
      
      for (let i = 0; i < repetitions; i++) {
        enhancedCards.forEach((card, cardIndex) => {
          // Add some variety to repeated cards
          const variation = Math.random() * 0.1 - 0.05; // ±5% variation
          const modifiedCard = {
            ...card,
            id: `${card.id}-rep-${i}-${cardIndex}`,
            streamIndex: i,
            totalIndex: stream.length,
            change: card.change ? card.change + variation : variation
          };
          stream.push(modifiedCard);
        });
      }
      
      const totalHeight = stream.length * (config.cardHeight + config.cardSpacing);
      
      return {
        cards: stream,
        direction: laneIndex % 2 === 0 ? 'up' : 'down',
        speed: config.speed + (laneIndex * 0.03) + (Math.random() * 0.05 - 0.025), // More varied speeds
        offset: Math.random() * config.cardHeight * 2, // Larger offset variation
        laneIndex,
        totalHeight
      };
    });
  }, [config, isInitialized]);

  // Handle window resize with debouncing
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Initialization sequence
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Render individual lane with much better optimization
  const renderLane = useCallback((laneData, laneIndex) => {
    const { cards, direction, speed, offset, totalHeight } = laneData;
    const { cardWidth, cardSpacing, laneSpacing, cardHeight } = config;
    
    const isUpward = direction === 'up';
    // Much longer animation duration to ensure smooth, continuous scrolling
    const animationDuration = (totalHeight / speed) / 4; // Slower for smoother effect
    
    return (
      <div
        key={`lane-${laneIndex}`}
        className="relative overflow-hidden flex-shrink-0"
        style={{
          width: cardWidth,
          height: '100vh',
          marginRight: laneIndex < enhancedCardData.length - 1 ? laneSpacing : 0
        }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full will-change-transform"
          initial={{ y: isUpward ? offset : -offset }}
          animate={{
            y: isUpward 
              ? [offset, offset - totalHeight] 
              : [-offset, -offset + totalHeight]
          }}
          transition={{
            duration: animationDuration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <div 
            className="flex flex-col"
            style={{ gap: cardSpacing }}
          >
            {cards.map((card, cardIndex) => (
              <div
                key={`${card.id}-${cardIndex}`}
                className="flex-shrink-0 px-3" // Much better padding
                style={{ height: cardHeight }}
              >
                <EnhancedMarketCard
                  {...card}
                  animated={!isLoading}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }, [config, isLoading, enhancedCardData.length]);

  // Enhanced loading state
  if (isLoading || !isInitialized) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-orange-400/30 border-t-orange-400 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 w-10 h-10 border-3 border-orange-300/20 border-b-orange-300 rounded-full"
            />
          </div>
          <div className="text-center">
            <motion.h3
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-xl font-bold"
            >
              Initializing Market Feed
            </motion.h3>
            <motion.p
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-zinc-400 text-sm mt-3"
            >
              Loading {config.laneCount} data streams with enhanced metrics...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Enhanced gradient overlays for better edge blending */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-zinc-900 via-zinc-900/98 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-900 via-zinc-900/98 to-transparent z-20 pointer-events-none" />
      
      {/* Main lanes container with better spacing */}
      <div className="flex justify-center items-start h-full pt-24">
        <div className="flex items-start gap-0 max-w-full overflow-hidden px-8">
          <AnimatePresence mode="wait">
            {enhancedCardData.length > 0 && enhancedCardData.map((laneData, laneIndex) => (
              <motion.div
                key={`lane-container-${laneIndex}`}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ 
                  delay: laneIndex * 0.1, 
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {renderLane(laneData, laneIndex)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced side fade effects with better gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-transparent z-15 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-zinc-900 via-zinc-900/90 to-transparent z-15 pointer-events-none" />
    </div>
  );
};

export default EnhancedMarketLanes; 