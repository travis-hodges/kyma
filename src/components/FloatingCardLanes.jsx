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
  const lastUpdateTime = useRef(0);
  
  // Card dimensions - dynamic heights
  const CARD_WIDTH = 280;
  const MIN_CARD_HEIGHT = 320;
  const CARD_SPACING = 60; // Increased spacing
  const LANE_SPACING = 60; // Reduced for better fit
  
  // Animation settings - slower for smoother performance
  const ANIMATION_SPEED = 0.9; // Slightly faster for better flow
  const TARGET_FPS = 60;
  const FRAME_TIME = 1000 / TARGET_FPS;
  
  // Calculate responsive lane count and centering
  const calculateLaneConfig = useCallback(() => {
    if (!containerRef.current) return { count: 4, startX: 0 };
    
    const containerWidth = containerRef.current.offsetWidth;
    const totalLaneWidth = CARD_WIDTH + LANE_SPACING;
    let maxLanes = Math.floor(containerWidth / totalLaneWidth);
    
    // Responsive breakpoints
    if (containerWidth < 768) maxLanes = Math.min(maxLanes, 2); // Mobile
    else if (containerWidth < 1024) maxLanes = Math.min(maxLanes, 4); // Tablet
    else maxLanes = Math.min(maxLanes, 6); // Desktop
    
    // Calculate starting X position to center the lanes
    const totalWidth = maxLanes * CARD_WIDTH + (maxLanes - 1) * LANE_SPACING;
    const startX = (containerWidth - totalWidth) / 2;
    
    return { count: maxLanes, startX };
  }, []);
  
  // Get estimated card height based on type (for positioning, actual height will be auto)
  const getEstimatedCardHeight = (cardType) => {
    switch (cardType) {
      case 'stock': return MIN_CARD_HEIGHT;
      case 'crypto': return MIN_CARD_HEIGHT;
      case 'news': return MIN_CARD_HEIGHT + 60; // News cards need more space for content
      case 'economic': return MIN_CARD_HEIGHT + 80; // Economic cards need most space
      case 'options': return MIN_CARD_HEIGHT + 40; // Options cards need space for Greeks
      case 'forex': return MIN_CARD_HEIGHT + 20; // Forex cards need space for bid/ask
      case 'commodities': return MIN_CARD_HEIGHT + 30; // Commodities cards need space for contract info
      default: return MIN_CARD_HEIGHT;
    }
  };
  
  // Calculate how many cards needed to fill viewport
  const calculateCardsNeeded = useCallback((containerHeight) => {
    const avgCardHeight = MIN_CARD_HEIGHT + 40; // Average height considering different card types
    const totalSpaceNeeded = containerHeight + 400; // Extra buffer above/below viewport
    return Math.ceil(totalSpaceNeeded / (avgCardHeight + CARD_SPACING)) + 2; // Extra cards for smooth flow
  }, []);

  // Initialize lanes and queues
  const initializeLanes = useCallback(() => {
    const laneConfig = calculateLaneConfig();
    setLaneCount(laneConfig.count);
    
    const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
    const cardsPerLane = calculateCardsNeeded(containerHeight);
    
    // Initialize lane queues with random cards
    laneQueues.current = [];
    const newActiveLanes = [];
    
    for (let i = 0; i < laneConfig.count; i++) {
      const queueCards = getRandomCards(50).map(card => ({
        ...card,
        id: `${card.id}-${Date.now()}-${Math.random()}`,
        estimatedHeight: getEstimatedCardHeight(card.type)
      }));
      laneQueues.current.push(queueCards);
      newActiveLanes.push([]);
    }
    
    // Fill each lane with initial cards to cover entire viewport
    for (let laneIndex = 0; laneIndex < laneConfig.count; laneIndex++) {
      const direction = laneIndex % 2 === 0 ? 'down' : 'up';
      
      // Start some cards on-screen for immediate visibility
      const onScreenCards = Math.min(10, Math.floor(cardsPerLane * 0.6)); // 60% of cards start on screen
      let currentY;
      
      if (direction === 'down') {
        // For down direction, start from bottom of viewport and work up
        currentY = containerHeight + 100;
      } else {
        // For up direction, start from top of viewport and work down  
        currentY = -100;
      }
      
      for (let cardIndex = 0; cardIndex < cardsPerLane; cardIndex++) {
        if (laneQueues.current[laneIndex].length > 0) {
          const card = laneQueues.current[laneIndex].shift();
          const cardHeight = getEstimatedCardHeight(card.type);
          
          // Position cards to fill viewport first, then extend beyond
          if (cardIndex < onScreenCards) {
            // Place cards within viewport for immediate visibility
            if (direction === 'down') {
              currentY -= (cardHeight + CARD_SPACING);
            } else {
              currentY += (cardHeight + CARD_SPACING);
            }
          } else {
            // Place remaining cards off-screen
            if (direction === 'down') {
              currentY -= (cardHeight + CARD_SPACING);
            } else {
              currentY += (cardHeight + CARD_SPACING);
            }
          }
          
          newActiveLanes[laneIndex].push({
            ...card,
            x: laneConfig.startX + laneIndex * (CARD_WIDTH + LANE_SPACING),
            y: currentY,
            direction,
            speed: ANIMATION_SPEED, // Fixed speed for all cards
            laneIndex,
            estimatedHeight: cardHeight
          });
        }
      }
    }
    
    setActiveLanes(newActiveLanes);
  }, [calculateLaneConfig, calculateCardsNeeded]);
  
  // Animation loop with throttling
  const animate = useCallback((currentTime) => {
    if (!containerRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Throttle to target FPS
    if (currentTime - lastUpdateTime.current < FRAME_TIME) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastUpdateTime.current = currentTime;
    const containerHeight = containerRef.current.offsetHeight;
    let needsUpdate = false;
    
    setActiveLanes(currentLanes => {
      const newLanes = currentLanes.map(laneCards => {
        const updatedLane = [];
        
        laneCards.forEach(card => {
          // Move card
          const newY = card.direction === 'down' 
            ? card.y + card.speed 
            : card.y - card.speed;
          
          // Check if card has left the container
          const hasExited = card.direction === 'down' 
            ? newY > containerHeight + card.estimatedHeight
            : newY < -card.estimatedHeight;
          
          if (!hasExited) {
            // Keep card in lane
            updatedLane.push({
              ...card,
              y: newY
            });
          } else {
            // Card has exited, add to queue for later
            const shuffledCard = {
              ...card,
              id: `${card.id}-${Date.now()}-${Math.random()}`,
              estimatedHeight: getEstimatedCardHeight(card.type)
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
          
          // Check if we need more cards based on viewport coverage
          const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
          const minCards = calculateCardsNeeded(containerHeight);
          
          if (cardsInDirection.length < minCards) {
            const newCard = laneQueues.current[laneIndex].shift();
            const cardHeight = getEstimatedCardHeight(newCard.type);
            
            // Find the appropriate position for the new card
            let newY;
            if (direction === 'down') {
              // Find the topmost card (smallest Y value)
              const topmostCard = cardsInDirection.sort((a, b) => a.y - b.y)[0];
              newY = topmostCard ? topmostCard.y - cardHeight - CARD_SPACING : -cardHeight - CARD_SPACING;
            } else {
              // Find the bottommost card (largest Y value)
              const bottommostCard = cardsInDirection.sort((a, b) => b.y - a.y)[0];
              newY = bottommostCard ? bottommostCard.y + bottommostCard.estimatedHeight + CARD_SPACING : containerHeight + cardHeight + CARD_SPACING;
            }
            
            laneCards.push({
              ...newCard,
              x: laneConfig.startX + laneIndex * (CARD_WIDTH + LANE_SPACING),
              y: newY,
              direction,
              speed: ANIMATION_SPEED, // Fixed speed for all cards
              laneIndex,
              estimatedHeight: cardHeight
            });
          }
                 }
       });
       
       return newLanes;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [calculateLaneConfig, calculateCardsNeeded]);
  
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
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const laneConfig = calculateLaneConfig();
      if (laneConfig.count !== laneCount) {
        initializeLanes();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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