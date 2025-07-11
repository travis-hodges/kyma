import React, { useState, useEffect, useRef, useCallback } from 'react';
import StockCard from './StockCard';
import CryptoCard from './CryptoCard';
import NewsCard from './NewsCard';
import EconomicCard from './EconomicCard';
import OptionsCard from './OptionsCard';
import ForexCard from './ForexCard';
import CommoditiesCard from './CommoditiesCard';
import { getRandomCards } from './cardData';

const FloatingCardLanes = () => {
  const [activeLanes, setActiveLanes] = useState([]);
  const [laneCount, setLaneCount] = useState(4);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const laneQueues = useRef([]);
  const isPageVisible = useRef(true);
  const lastUpdateTime = useRef(0);
  
  // Card dimensions - dynamic heights
  const CARD_WIDTH = 280;
  const MIN_CARD_HEIGHT = 320;
  const CARD_SPACING = 60; // Increased spacing
  const LANE_SPACING = 60; // Reduced for better fit
  
  // Animation settings - PERFECTLY consistent movement
  const ANIMATION_SPEED = 3.0; // Exactly 3 pixels per frame for faster movement
  
  // Calculate responsive lane count and centering
  const calculateLaneConfig = useCallback(() => {
    if (!containerRef.current) return { count: 6, startX: 0 };
    
    const containerWidth = containerRef.current.offsetWidth;
    const totalLaneWidth = CARD_WIDTH + LANE_SPACING;
    let maxLanes = Math.floor(containerWidth / totalLaneWidth);
    
    // Allow more lanes, even if some are partially off-screen
    if (containerWidth < 768) maxLanes = Math.max(maxLanes, 3); // Mobile - at least 3 lanes
    else if (containerWidth < 1024) maxLanes = Math.max(maxLanes, 5); // Tablet - at least 5 lanes
    else maxLanes = Math.max(maxLanes, 8); // Desktop - at least 8 lanes
    
    // Calculate starting X position to center the lanes
    const totalWidth = maxLanes * CARD_WIDTH + (maxLanes - 1) * LANE_SPACING;
    const startX = (containerWidth - totalWidth) / 2;
    
    return { count: maxLanes, startX };
  }, []);
  
  // Constants for consistent spacing
  const CONSISTENT_CARD_HEIGHT = MIN_CARD_HEIGHT + 40;
  const TOTAL_CARD_SPACE = CONSISTENT_CARD_HEIGHT + CARD_SPACING;
  
  // Calculate how many cards needed to fill viewport (with performance optimization)
  const calculateCardsNeeded = useCallback((containerHeight) => {
    // Calculate cards needed to cover the entire viewport plus buffer
    const viewportCards = Math.ceil(containerHeight / TOTAL_CARD_SPACE);
    const bufferCards = Math.ceil(800 / TOTAL_CARD_SPACE); // 800px buffer
    const baseCards = viewportCards + bufferCards + 6; // Extra cards for smooth flow
    
    // Reduce card count on lower-end devices or when tab is not visible
    if (!isPageVisible.current) {
      return Math.max(12, Math.floor(baseCards * 0.6)); // 60% of cards when not visible
    }
    
    // Check for low-end devices (reduced performance mode)
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || 
                          navigator.deviceMemory <= 4 ||
                          window.innerWidth < 768;
    
    if (isLowEndDevice) {
      return Math.max(15, Math.floor(baseCards * 0.7)); // 70% of cards on low-end devices
    }
    
    return baseCards;
  }, [TOTAL_CARD_SPACE]);

  // Initialize lanes and queues with FULL viewport coverage
  const initializeLanes = useCallback(() => {
    const laneConfig = calculateLaneConfig();
    setLaneCount(laneConfig.count);
    
    const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
    
    // Initialize lane queues with random cards
    laneQueues.current = [];
    const newActiveLanes = [];
    
    for (let i = 0; i < laneConfig.count; i++) {
      const queueCards = getRandomCards(300).map(card => ({
        ...card,
        id: `${card.id}-${Date.now()}-${Math.random()}`,
        estimatedHeight: CONSISTENT_CARD_HEIGHT
      }));
      laneQueues.current.push(queueCards);
      newActiveLanes.push([]);
    }
    
    // NEW STRATEGY: Fill each lane to completely cover viewport PLUS drift distance
    for (let laneIndex = 0; laneIndex < laneConfig.count; laneIndex++) {
      const direction = laneIndex % 2 === 0 ? 'down' : 'up';
      
      // Calculate how many cards we need to fill the ENTIRE viewport plus drift distance
      const cardsToFillViewport = Math.ceil(containerHeight / TOTAL_CARD_SPACE);
      const driftDistance = containerHeight + CONSISTENT_CARD_HEIGHT; // Distance cards need to drift to fully exit
      const cardsForDrift = Math.ceil(driftDistance / TOTAL_CARD_SPACE);
      const totalCardsNeeded = cardsToFillViewport + cardsForDrift + 8; // Extra buffer
      
      let currentY;
      
      if (direction === 'down') {
        // Start cards so they fill the viewport immediately
        currentY = 0; // Start at top of viewport
      } else {
        // Start cards so they fill the viewport immediately
        currentY = containerHeight - CONSISTENT_CARD_HEIGHT; // Start at bottom of viewport
      }
      
      // Fill the lane with cards using PERFECT spacing
      for (let cardIndex = 0; cardIndex < totalCardsNeeded; cardIndex++) {
        if (laneQueues.current[laneIndex].length > 0) {
          const card = laneQueues.current[laneIndex].shift();
          
          newActiveLanes[laneIndex].push({
            ...card,
            x: laneConfig.startX + laneIndex * (CARD_WIDTH + LANE_SPACING),
            y: currentY,
            direction,
            laneIndex,
            estimatedHeight: CONSISTENT_CARD_HEIGHT
          });
          
          // Move to next position with PERFECT spacing
          if (direction === 'down') {
            currentY += TOTAL_CARD_SPACE;
          } else {
            currentY -= TOTAL_CARD_SPACE;
          }
        }
      }
    }
    
    setActiveLanes(newActiveLanes);
    
    // Debug: Log initialization info
    const cardsToFillViewport = Math.ceil(containerHeight / TOTAL_CARD_SPACE);
    const driftDistance = containerHeight + CONSISTENT_CARD_HEIGHT;
    const cardsForDrift = Math.ceil(driftDistance / TOTAL_CARD_SPACE);
    const totalCardsNeeded = cardsToFillViewport + cardsForDrift + 8;
    console.log(`Initialized ${laneConfig.count} lanes with ${totalCardsNeeded} cards each`);
    console.log(`Container height: ${containerHeight}px, Card space: ${TOTAL_CARD_SPACE}px`);
    console.log(`Cards to fill viewport: ${cardsToFillViewport}, Cards for drift: ${cardsForDrift}`);
  }, [calculateLaneConfig, CONSISTENT_CARD_HEIGHT, TOTAL_CARD_SPACE]);
  
  // Animation loop with smooth consistent movement and performance optimizations
  const animate = useCallback((currentTime) => {
    if (!containerRef.current || !isPageVisible.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Ensure consistent frame timing for perfect spacing
    if (currentTime - lastUpdateTime.current < 16) { // ~60fps
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastUpdateTime.current = currentTime;
    
    const containerHeight = containerRef.current.offsetHeight;
    let needsUpdate = false;
    let hasVisibleCards = false;
    
    setActiveLanes(currentLanes => {
      const newLanes = currentLanes.map(laneCards => {
        const updatedLane = [];
        
        laneCards.forEach(card => {
          // Move card with consistent speed
          const newY = card.direction === 'down' 
            ? card.y + ANIMATION_SPEED 
            : card.y - ANIMATION_SPEED;
          
          // Check if card has FULLY exited the container (ENTIRE card must be completely off-screen)
          const cardBottom = newY + CONSISTENT_CARD_HEIGHT;
          const cardTop = newY;
          const hasExited = card.direction === 'down' 
            ? cardBottom > containerHeight // BOTTOM of card is below viewport (last part to exit)
            : cardTop < 0; // TOP of card is above viewport (last part to exit)
          
          // Check if card is visible (for performance optimization)
          const isVisible = cardBottom > 0 && cardTop < containerHeight;
          if (isVisible) hasVisibleCards = true;
          
          if (!hasExited) {
            // Keep card in lane with updated position
            updatedLane.push({
              ...card,
              y: newY
            });
          } else {
            // Card has exited, add to queue for later
            const shuffledCard = {
              ...card,
              id: `${card.id}-${Date.now()}-${Math.random()}`,
              estimatedHeight: CONSISTENT_CARD_HEIGHT
            };
            laneQueues.current[card.laneIndex].push(shuffledCard);
            needsUpdate = true;
          }
        });
        
        return updatedLane;
      });
      
      // Add new cards to lanes that need them
      const laneConfig = calculateLaneConfig();
      
      newLanes.forEach((laneCards, laneIndex) => {
        if (laneQueues.current[laneIndex].length > 0) {
          const direction = laneIndex % 2 === 0 ? 'down' : 'up';
          const cardsInDirection = laneCards.filter(c => c.direction === direction);
          
          // Check if we need more cards based on viewport coverage PLUS drift distance
          const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
          const cardsToFillViewport = Math.ceil(containerHeight / TOTAL_CARD_SPACE);
          const driftDistance = containerHeight + CONSISTENT_CARD_HEIGHT;
          const cardsForDrift = Math.ceil(driftDistance / TOTAL_CARD_SPACE);
          const minCards = cardsToFillViewport + cardsForDrift + 4; // Ensure proper coverage
          
          // Ensure we maintain proper spacing by checking if gaps exist
          if (cardsInDirection.length < minCards) {
            const newCard = laneQueues.current[laneIndex].shift();
            
            // Find the appropriate position for the new card using PERFECT spacing
            let newY;
            if (direction === 'down') {
              // Find the topmost card (smallest Y value) and place new card above it
              const sortedCards = cardsInDirection.sort((a, b) => a.y - b.y);
              const topmostCard = sortedCards[0];
              newY = topmostCard ? topmostCard.y - TOTAL_CARD_SPACE : 0;
            } else {
              // Find the bottommost card (largest Y value) and place new card below it
              const sortedCards = cardsInDirection.sort((a, b) => b.y - a.y);
              const bottommostCard = sortedCards[0];
              newY = bottommostCard ? bottommostCard.y + TOTAL_CARD_SPACE : containerHeight - CONSISTENT_CARD_HEIGHT;
            }
            
            laneCards.push({
              ...newCard,
              x: laneConfig.startX + laneIndex * (CARD_WIDTH + LANE_SPACING),
              y: newY,
              direction,
              laneIndex,
              estimatedHeight: CONSISTENT_CARD_HEIGHT
            });
          }
                 }
       });
       
       return newLanes;
    });
    
    // Performance optimization: Only continue animation if there are visible cards or we need updates
    if (hasVisibleCards || needsUpdate) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Pause animation when no cards are visible (e.g., tab is not active)
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 200); // Check again in 200ms to reduce CPU usage
    }
  }, [calculateLaneConfig, calculateCardsNeeded, CONSISTENT_CARD_HEIGHT, TOTAL_CARD_SPACE, ANIMATION_SPEED]);
  
  // Start animation
  useEffect(() => {
    initializeLanes();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeLanes, animate]);
  
  // Handle resize and visibility changes for performance
  useEffect(() => {
    const handleResize = () => {
      const laneConfig = calculateLaneConfig();
      if (laneConfig.count !== laneCount) {
        initializeLanes();
      }
    };
    
    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden;
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [calculateLaneConfig, laneCount, initializeLanes]);
  
  // Render card based on type
  const renderCard = (cardData) => {
    const cardProps = {
      data: cardData,
      style: {
        position: 'absolute',
        left: cardData.x,
        top: cardData.y,
        width: CARD_WIDTH,
        zIndex: 10,
        transform: `translate3d(0, 0, 0)`, // Force hardware acceleration
        willChange: 'transform'
      }
    };
    
    switch (cardData.type) {
      case 'stock':
        return <StockCard key={cardData.id} {...cardProps} />;
      case 'crypto':
        return <CryptoCard key={cardData.id} {...cardProps} />;
      case 'news':
        return <NewsCard key={cardData.id} {...cardProps} />;
      case 'economic':
        return <EconomicCard key={cardData.id} {...cardProps} />;
      case 'options':
        return <OptionsCard key={cardData.id} {...cardProps} />;
      case 'forex':
        return <ForexCard key={cardData.id} {...cardProps} />;
      case 'commodities':
        return <CommoditiesCard key={cardData.id} {...cardProps} />;
      default:
        return null;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="floating-card-lanes"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Render all active cards */}
      {activeLanes.flat().map(cardData => renderCard(cardData))}
    </div>
  );
};

export default FloatingCardLanes; 