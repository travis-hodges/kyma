import React, { useEffect, useRef } from 'react';

const MarketBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    let nodeLifespan = 0; // Track time for node lifecycle
    const nodeLifespanDuration = 300; // Frames before a node gets replaced (about 5 seconds at 60fps)
    const nodeReplacementRate = 0.02; // Probability of replacing a node each frame

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeNodes();
    };

    const initializeNodes = () => {
      const { width, height } = canvas;
      nodes = [];
      
      // Create nodes based on screen size
      const nodeCount = Math.floor((width * height) / 15000); // Responsive node count
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createNode(width, height));
      }
    };

    const createNode = (width, height) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        age: 0, // Track how long this node has existed
        fadeIn: true // Start with fade-in effect
      };
    };

    const updateNodes = () => {
      const { width, height } = canvas;
      
      // Update node lifespan
      nodeLifespan++;
      
      // Gradually replace nodes
      nodes.forEach((node, index) => {
        // Update age
        node.age++;
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
        
        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
        
        // Add slight randomness to movement
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;
        
        // Limit velocity
        const maxVel = 0.8;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));
        
        // Handle fade-in effect for new nodes
        if (node.fadeIn && node.age < 30) {
          node.opacity = (node.age / 30) * (Math.random() * 0.8 + 0.2);
        } else {
          node.fadeIn = false;
          node.opacity = Math.random() * 0.8 + 0.2;
        }
      });
      
      // Randomly replace old nodes with new ones
      if (Math.random() < nodeReplacementRate && nodes.length > 0) {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        nodes[randomIndex] = createNode(width, height);
      }
      
      // Ensure we maintain the target number of nodes
      const targetNodeCount = Math.floor((width * height) / 15000);
      if (nodes.length < targetNodeCount) {
        nodes.push(createNode(width, height));
      } else if (nodes.length > targetNodeCount) {
        nodes.pop(); // Remove the oldest node
      }
    };

    const drawConnections = () => {
      const connectionDistance = 280; // Increased for more connections at further distance
      const baseOpacity = 0.6; // Increased opacity for brighter, more visible lines
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = baseOpacity * (1 - distance / connectionDistance);
            const lineWidth = 1.5 - (distance / connectionDistance) * 0.8; // Thicker lines for better visibility
            
            ctx.strokeStyle = `rgba(255, 77, 0, ${opacity})`;
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
        ctx.fillStyle = `rgba(255, 77, 0, ${node.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowColor = 'rgba(255, 77, 0, 0.3)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update node positions
      updateNodes();
      
      // Draw connections first (behind nodes)
      drawConnections();
      
      // Draw nodes on top
      drawNodes();
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'transparent',
        zIndex: 1
      }}
    />
  );
};

export default MarketBackground; 