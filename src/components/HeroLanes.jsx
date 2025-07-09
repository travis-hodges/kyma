import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MarketCard from './MarketCard';
import { getCardsForLanes } from './marketData';

const HeroLanes = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Responsive lane configuration
  const getLaneCount = () => {
    if (windowSize.width >= 1536) return 10; // 2xl - more columns
    if (windowSize.width >= 1280) return 9;  // xl
    if (windowSize.width >= 1024) return 8;  // lg
    if (windowSize.width >= 768) return 6;   // md
    if (windowSize.width >= 640) return 4;   // sm
    return 3; // mobile
  };

  const laneCount = getLaneCount();
  const baseLaneCards = getCardsForLanes(laneCount);

  // Create static infinite streams for each lane (no dynamic updates)
  const laneStreams = useRef({});
  
  // Initialize streams once
  if (Object.keys(laneStreams.current).length === 0) {
    for (let i = 0; i < laneCount; i++) {
      const cards = baseLaneCards[i] || [];
      // Create a long static stream by repeating cards multiple times
      const stream = [];
             for (let repeat = 0; repeat < 30; repeat++) { // More repetitions for seamless flow
         cards.forEach((card, cardIndex) => {
           stream.push({
             ...card,
             id: `lane-${i}-repeat-${repeat}-card-${cardIndex}`
           });
         });
       }
      laneStreams.current[i] = stream;
    }
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // No dynamic card updates - static streams only

  const getLaneWidth = () => {
    // Optimized lane widths for card content
    if (windowSize.width >= 1280) return 'w-72'; // xl 
    if (windowSize.width >= 1024) return 'w-64'; // lg 
    if (windowSize.width >= 768) return 'w-56';  // md 
    return 'w-48'; // sm and mobile
  };

  const renderLane = (laneIndex) => {
    const cards = laneStreams.current[laneIndex] || [];
    if (cards.length === 0) return null;

    const isUpward = laneIndex % 2 === 0;
    const baseSpeed = 120; // Much slower, more relaxed speed
    const speedVariation = laneIndex * 10;
    const duration = baseSpeed + speedVariation;

    // Calculate total height for seamless loop
    const cardHeight = 120;
    const gap = 32; // Increased gap for better spacing
    const totalHeight = cards.length * (cardHeight + gap);

    return (
      <div 
        key={laneIndex}
        className={`${getLaneWidth()} flex-shrink-0 relative overflow-hidden`}
        style={{ 
          height: '100vh',
          opacity: 0.95
        }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full"
          animate={{
            y: isUpward ? [0, -totalHeight] : [0, totalHeight]
          }}
          transition={{
            duration: duration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <div className="flex flex-col gap-8 pb-8">
            {cards.map((card) => (
              <div 
                key={card.id}
                className="px-2 flex-shrink-0"
              >
                <MarketCard 
                  {...card}
                  size={card.size || 'normal'} 
                  glowEffect={true}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlays for seamless looping effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent z-10 pointer-events-none" />
      
      {/* Horizontal lanes container */}
      <div className="flex justify-center items-start h-full pt-24">
        <div className="flex gap-1 md:gap-2 lg:gap-3 max-w-full mx-auto px-4">
          {Array.from({ length: laneCount }, (_, index) => renderLane(index))}
        </div>
      </div>

      {/* Side gradients for edge fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroLanes; 