import React, { useRef, useEffect, useCallback } from 'react';
import {
  Target,
  Zap,
  Eye,
  TrendingUp,
  Clock,
  Brain,
  DollarSign,
  BarChart3,
  Users,
  Shield,
  Lightbulb,
  Gauge
} from "lucide-react";

// Interactive particle system for mission cards
const MissionParticles = ({ className = '', particleCount = 20 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          life: Math.random() * 100 + 50
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 77, 0, ${particle.opacity})`;
        ctx.fill();
        
        // Reset particle when life expires
        if (particle.life <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            life: Math.random() * 100 + 50
          };
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`mission-particles ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

// Mission-focused bento items
const missionItems = [
  {
    title: "Market Speed Problem",
    subtitle: "The Challenge",
    description: "Markets move in milliseconds, but traditional analysis takes hours. By the time you spot the opportunity, it's gone.",
    icon: <Clock />,
    problem: "Traditional Analysis",
    solution: "Real-Time Intelligence",
    cardClass: "problem-card span-2",
    hasParticles: false
  },
  {
    title: "Information Overload",
    subtitle: "The Noise",
    description: "Drowning in data streams, news feeds, and market signals. What matters? What doesn't?",
    icon: <Eye />,
    problem: "Data Chaos",
    solution: "Focused Insights",
    cardClass: "overload-card",
    hasParticles: false
  },
  {
    title: "Emotion-Driven Trading",
    subtitle: "The Human Factor",
    description: "Fear and greed corrupt judgment. Discipline breaks down when money is on the line.",
    icon: <Brain />,
    problem: "Emotional Bias",
    solution: "AI-Driven Logic",
    cardClass: "emotion-card",
    hasParticles: false
  },
  {
    title: "Kyma's Mission",
    subtitle: "Our Solution",
    description: "Transform overwhelming market complexity into clear, actionable intelligence that moves faster than human thought.",
    icon: <Target />,
    problem: "Complex Markets",
    solution: "Simple Actions",
    cardClass: "solution-card span-2",
    hasParticles: true
  },
  {
    title: "Speed & Precision",
    subtitle: "How We Solve It",
    description: "AI processes millions of data points in microseconds, delivering insights before markets react.",
    icon: <Zap />,
    problem: "Slow Analysis",
    solution: "Instant Intelligence",
    metrics: "0.001s Response Time",
    cardClass: "speed-card",
    hasParticles: false
  },
  {
    title: "Context-Aware Intelligence",
    subtitle: "Smart Filtering",
    description: "Not just data analysis—understanding what matters to your specific portfolio and goals.",
    icon: <Lightbulb />,
    problem: "Generic Data",
    solution: "Personal Insights",
    metrics: "Portfolio-Specific",
    cardClass: "context-card",
    hasParticles: false
  },
  {
    title: "Objective Decision Making",
    subtitle: "Beyond Human Limits",
    description: "Eliminate emotional bias with systematic, data-driven trading decisions that execute with unwavering discipline.",
    icon: <Gauge />,
    problem: "Emotional Trading",
    solution: "Systematic Logic",
    metrics: "100% Objective",
    cardClass: "objective-card",
    hasParticles: false
  }
];

const MissionBentoGrid = () => {
  return (
    <div className="mission-bento">
      <div className="mission-bento-content">
        {/* Header Section */}
        <div className="mission-bento-header">
          <div className="mission-bento-tag">
            <Target className="mission-bento-tag-icon" />
            <span className="mission-bento-tag-text">
              Mission & Vision
            </span>
          </div>
          
          <h1 className="mission-bento-title">
            The Problems We{' '}
            <span className="mission-bento-title-highlight">
              Solve
            </span>
          </h1>
          
          <p className="mission-bento-subtitle">
            Financial markets are broken by speed, complexity, and human emotion. 
            We fix them with AI that thinks faster than markets move.
          </p>
        </div>

        {/* Mission Bento Grid */}
        <div className="mission-bento-grid">
          {missionItems.map((item, index) => (
            <div
              key={index}
              className={`mission-bento-card ${item.cardClass}`}
            >
              {/* Background Gradient */}
              <div className="mission-bento-card-gradient" />
              
              {/* Particles for special cards */}
              {item.hasParticles && (
                <MissionParticles particleCount={15} />
              )}
              
              {/* Content */}
              <div className="mission-bento-card-content">
                {/* Header */}
                <div className="mission-bento-card-header">
                  <div className="mission-bento-card-icon-section">
                    <div className="mission-bento-card-icon">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mission-bento-card-title">
                        {item.title}
                      </h3>
                      <p className="mission-bento-card-subtitle">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`mission-bento-card-badge ${
                    item.cardClass.includes('problem') || item.cardClass.includes('overload') || item.cardClass.includes('emotion') 
                      ? 'problem-badge' 
                      : 'solution-badge'
                  }`}>
                    {item.cardClass.includes('problem') || item.cardClass.includes('overload') || item.cardClass.includes('emotion') 
                      ? 'Problem' 
                      : 'Solution'}
                  </div>
                </div>
                
                {/* Description */}
                <p className="mission-bento-card-description">
                  {item.description}
                </p>
                
                {/* Bottom Section */}
                <div className="mission-bento-card-footer">
                  <div>
                    <div className="mission-bento-card-transform">
                      {item.cardClass.includes('problem') || item.cardClass.includes('overload') || item.cardClass.includes('emotion') 
                        ? 'Current State' 
                        : 'Our Approach'}
                    </div>
                    <div className="mission-bento-card-transform-text">
                      {item.problem} → {item.solution}
                    </div>
                  </div>
                  
                  {item.metrics && (
                    <div className="mission-bento-card-metrics">
                      <div className="mission-bento-card-metrics-label">
                        Performance
                      </div>
                      <div className="mission-bento-card-metrics-value">
                        {item.metrics}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mission-bento-cta">
          <div className="mission-bento-cta-card">
            <h2 className="mission-bento-cta-title">
              Ready to Move Faster Than Markets?
            </h2>
            <p className="mission-bento-cta-subtitle">
              Join traders who've eliminated hesitation and maximized precision with AI-driven intelligence.
            </p>
            <div className="mission-bento-cta-features">
              <div className="mission-bento-cta-feature">
                <DollarSign />
                <span>Profitable Signals</span>
              </div>
              <div className="mission-bento-cta-feature">
                <Shield />
                <span>Risk Management</span>
              </div>
              <div className="mission-bento-cta-feature">
                <Users />
                <span>Elite Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionBentoGrid; 