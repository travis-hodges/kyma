import React, { useEffect, useRef } from 'react';

const MissionNeuralNetwork = ({ 
  intensity = 'medium',
  color = 'orange',
  customColor = null,
  baseOpacity = 0.3,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);

  // Color configuration
  const getColor = () => {
    if (customColor) return customColor;
    
    switch (color) {
      case 'blue':
        return 'rgba(59, 130, 246, ';
      case 'white':
        return 'rgba(255, 255, 255, ';
      case 'green':
        return 'rgba(34, 197, 94, ';
      case 'purple':
        return 'rgba(147, 51, 234, ';
      default:
        return 'rgba(255, 77, 0, '; // orange
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    const colorPrefix = getColor();

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Create spiral/vortex pattern with neural connections
    const drawSpiralNetwork = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw multiple spiral arms
      const spiralCount = 3;
      const nodesPerSpiral = 25;
      
      for (let spiral = 0; spiral < spiralCount; spiral++) {
        const spiralOffset = (spiral * 2 * Math.PI) / spiralCount;
        const nodes = [];
        
        // Generate nodes along spiral path
        for (let i = 0; i < nodesPerSpiral; i++) {
          const t = i / nodesPerSpiral;
          const angle = spiralOffset + t * 4 * Math.PI + time * 0.01;
          const radius = t * Math.min(width, height) * 0.35;
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          // Add some organic movement
          const wobbleX = Math.sin(time * 0.02 + i * 0.1) * 10;
          const wobbleY = Math.cos(time * 0.015 + i * 0.15) * 8;
          
          nodes.push({
            x: x + wobbleX,
            y: y + wobbleY,
            size: 2 + Math.sin(time * 0.03 + i * 0.2) * 1.5,
            opacity: baseOpacity * (0.4 + Math.sin(time * 0.02 + i * 0.1) * 0.3)
          });
        }
        
        // Draw connections between consecutive nodes
        for (let i = 0; i < nodes.length - 1; i++) {
          const node1 = nodes[i];
          const node2 = nodes[i + 1];
          const opacity = (node1.opacity + node2.opacity) / 2;
          
          ctx.strokeStyle = `${colorPrefix}${opacity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();
        }
        
        // Draw cross-connections to other spirals for complexity
        if (spiral < spiralCount - 1) {
          const nextSpiralOffset = ((spiral + 1) * 2 * Math.PI) / spiralCount;
          
          for (let i = 0; i < nodesPerSpiral; i += 3) {
            const t = i / nodesPerSpiral;
            const angle1 = spiralOffset + t * 4 * Math.PI + time * 0.01;
            const angle2 = nextSpiralOffset + t * 4 * Math.PI + time * 0.01;
            const radius = t * Math.min(width, height) * 0.35;
            
            const x1 = centerX + Math.cos(angle1) * radius;
            const y1 = centerY + Math.sin(angle1) * radius;
            const x2 = centerX + Math.cos(angle2) * radius;
            const y2 = centerY + Math.sin(angle2) * radius;
            
            const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            if (distance < 150) {
              const opacity = baseOpacity * (1 - distance / 150) * 0.3;
              ctx.strokeStyle = `${colorPrefix}${opacity})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
        
        // Draw nodes
        nodes.forEach(node => {
          // Node glow effect
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * 3
          );
          gradient.addColorStop(0, `${colorPrefix}${node.opacity * 0.8})`);
          gradient.addColorStop(1, `${colorPrefix}0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Node core
          ctx.fillStyle = `${colorPrefix}${node.opacity})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      
      // Add central pulsing core
      const coreOpacity = baseOpacity * (0.6 + Math.sin(time * 0.05) * 0.4);
      const coreSize = 8 + Math.sin(time * 0.03) * 4;
      
      // Core glow
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreSize * 4
      );
      coreGradient.addColorStop(0, `${colorPrefix}${coreOpacity * 0.9})`);
      coreGradient.addColorStop(1, `${colorPrefix}0)`);
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Core center
      ctx.fillStyle = `${colorPrefix}${coreOpacity})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      time += 1;
      drawSpiralNetwork();
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
  }, [intensity, color, customColor, baseOpacity]);

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

export default MissionNeuralNetwork; 