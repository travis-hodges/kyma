import React, { useEffect, useRef } from 'react';

const NeuralNetwork = ({ 
  intensity = 'medium', // 'low', 'medium', 'high'
  color = 'orange', // 'orange', 'blue', 'white', 'custom'
  customColor = null,
  connectionDistance = 280,
  baseOpacity = 0.6,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);

  // Configuration based on intensity
  const getConfig = () => {
    switch (intensity) {
      case 'low':
        return {
          nodeCount: 0.3, // 30% of normal density
          opacity: baseOpacity * 0.4,
          connectionDistance: connectionDistance * 0.7,
          maxVelocity: 0.4,
          replacementRate: 0.01
        };
      case 'medium':
        return {
          nodeCount: 0.6, // 60% of normal density
          opacity: baseOpacity * 0.7,
          connectionDistance: connectionDistance * 0.85,
          maxVelocity: 0.6,
          replacementRate: 0.015
        };
      case 'high':
        return {
          nodeCount: 1, // Full density
          opacity: baseOpacity,
          connectionDistance: connectionDistance,
          maxVelocity: 0.8,
          replacementRate: 0.02
        };
      default:
        return {
          nodeCount: 0.6,
          opacity: baseOpacity * 0.7,
          connectionDistance: connectionDistance * 0.85,
          maxVelocity: 0.6,
          replacementRate: 0.015
        };
    }
  };

  // Color configuration
  const getColor = () => {
    if (customColor) return customColor;
    
    switch (color) {
      case 'blue':
        return 'rgba(59, 130, 246, '; // blue-500
      case 'white':
        return 'rgba(255, 255, 255, ';
      case 'green':
        return 'rgba(34, 197, 94, '; // emerald-500
      case 'purple':
        return 'rgba(147, 51, 234, '; // violet-600
      default:
        return 'rgba(255, 77, 0, '; // orange
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    let nodeLifespan = 0;
    const config = getConfig();
    const colorPrefix = getColor();

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeNodes();
    };

    const createNode = (width, height) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.maxVelocity,
        vy: (Math.random() - 0.5) * config.maxVelocity,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        age: 0,
        fadeIn: true
      };
    };

    const initializeNodes = () => {
      const { width, height } = canvas;
      nodes = [];
      
      const nodeCount = Math.floor((width * height) / 15000 * config.nodeCount);
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createNode(width, height));
      }
    };

    const updateNodes = () => {
      const { width, height } = canvas;
      
      nodeLifespan++;
      
      nodes.forEach((node, index) => {
        node.age++;
        
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
        
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
        
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;
        
        const maxVel = config.maxVelocity;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));
        
        if (node.fadeIn && node.age < 30) {
          node.opacity = (node.age / 30) * (Math.random() * 0.8 + 0.2);
        } else {
          node.fadeIn = false;
          node.opacity = Math.random() * 0.8 + 0.2;
        }
      });
      
      if (Math.random() < config.replacementRate && nodes.length > 0) {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        nodes[randomIndex] = createNode(width, height);
      }
      
      const targetNodeCount = Math.floor((width * height) / 15000 * config.nodeCount);
      if (nodes.length < targetNodeCount) {
        nodes.push(createNode(width, height));
      } else if (nodes.length > targetNodeCount) {
        nodes.pop();
      }
    };

    const drawConnections = () => {
      const connectionDistance = config.connectionDistance;
      const baseOpacity = config.opacity;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = baseOpacity * (1 - distance / connectionDistance);
            const lineWidth = 1.5 - (distance / connectionDistance) * 0.8;
            
            ctx.strokeStyle = `${colorPrefix}${opacity})`;
            ctx.lineWidth = Math.max(0.5, lineWidth);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      nodes.forEach(node => {
        ctx.fillStyle = `${colorPrefix}${node.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = `${colorPrefix}0.3)`;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      const { width, height } = canvas;
      
      ctx.clearRect(0, 0, width, height);
      
      updateNodes();
      drawConnections();
      drawNodes();
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, color, customColor, connectionDistance, baseOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        background: 'transparent',
        zIndex: 1,
        ...style
      }}
    />
  );
};

export default NeuralNetwork; 