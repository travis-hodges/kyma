"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  Database,
  LineChart,
  Shield,
  Globe,
  Brain,
  Activity,
  Zap,
} from "lucide-react";
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

interface InteractiveGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  dotSize = 8,
  gap = 12,
  baseColor = '#1e293b',
  activeColor = '#64748b',
  proximity = 100,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const centresRef = useRef<{ el: HTMLDivElement; x: number; y: number }[]>([]);

  const buildGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    dotsRef.current = [];
    centresRef.current = [];
    const { width: w, height: h } = container.getBoundingClientRect();
    const cols = Math.floor((w + gap) / (dotSize + gap));
    const rows = Math.floor((h + gap) / (dotSize + gap));
    const total = cols * rows;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.borderRadius = '50%';
      dot.style.willChange = 'transform, background-color';
      gsap.set(dot, { x: 0, y: 0, backgroundColor: baseColor });
      frag.appendChild(dot);
      dotsRef.current.push(dot);
    }
    container.appendChild(frag);
    requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      centresRef.current = dotsRef.current.map(el => {
        const r = el.getBoundingClientRect();
        return {
          el,
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2
        };
      });
    });
  }, [dotSize, gap, baseColor]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      requestAnimationFrame(() => {
        centresRef.current.forEach(({ el, x, y }) => {
          const d = Math.hypot(x - mx, y - my);
          const t = Math.max(0, 1 - d / proximity);
          gsap.to(el, {
            backgroundColor: gsap.utils.interpolate(baseColor, activeColor, t),
            duration: 0.1
          });
        });
      });
    };
    container.addEventListener('pointermove', handler);
    return () => container.removeEventListener('pointermove', handler);
  }, [baseColor, activeColor, proximity]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        transition: 'opacity 0.3s',
        opacity: 0,
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export type BentoItem = {
  title: string;
  meta: string;
  description: string;
  icon: React.ReactNode;
  status: string;
  tags: string[];
  colSpan?: number;
  hasInteractiveGrid?: boolean;
  gradient?: string;
  glowRgba: string;
};

export interface BentoGridProps {
  items?: BentoItem[];
}

const defaultItems: BentoItem[] = [
  {
    title: "Adaptive Portfolio Signal Processing",
    meta: "LLM-Powered Insights",
    description: "AI-driven analysis aligns market events with your portfolio.",
    icon: <TrendingUp style={{ width: '1rem', height: '1rem', color: '#60a5fa' }} />, 
    status: "Live Signals",
    tags: ["Portfolio Context", "LLM Integration"],
    colSpan: 2,
    hasInteractiveGrid: true,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(6,182,212,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(59,130,246,0.2)"
  },
  {
    title: "Contextual News Synthesis",
    meta: "Real-Time Feeds",
    description: "Curates news relevant to your holdings.",
    icon: <Database style={{ width: '1rem', height: '1rem', color: '#4ade80' }} />, 
    status: "Curated Updates",
    tags: ["News Aggregation", "Asset Context"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(20,184,166,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(16,185,129,0.2)"
  },
  {
    title: "Volatility Trend Metrics",
    meta: "High-Frequency Data",
    description: "Actionable volatility indicators from live data.",
    icon: <LineChart style={{ width: '1rem', height: '1rem', color: '#fbbf24' }} />, 
    status: "Trend Signals",
    tags: ["Volatility Analysis", "Real-Time Metrics"],
    colSpan: 2,
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.1) 0%, rgba(251,146,60,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(234,179,8,0.2)"
  },
  {
    title: "Semantic Risk Assessment",
    meta: "Contextual Modeling",
    description: "Context-aware risk evaluations.",
    icon: <Shield style={{ width: '1rem', height: '1rem', color: '#c084fc' }} />, 
    status: "Risk Insights",
    tags: ["Risk Analytics", "Semantic Depth"],
    gradient: "linear-gradient(135deg, rgba(192,38,211,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(192,38,211,0.2)"
  },
  {
    title: "Correlation Mapping",
    meta: "Multi-Asset Analysis",
    description: "Reveals inter-market links.",
    icon: <Globe style={{ width: '1rem', height: '1rem', color: '#38bdf8' }} />, 
    status: "Correlation Map",
    tags: ["Diversification", "Graph Insights"],
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(56,189,248,0.2)"
  },
  {
    title: "Scenario Generator",
    meta: "Strategic Modeling",
    description: "LLM-driven market scenarios.",
    icon: <Brain style={{ width: '1rem', height: '1rem', color: '#ec4899' }} />, 
    status: "Scenario Engine",
    tags: ["Scenario Planning", "AI Modeling"],
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(244,63,94,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(236,72,153,0.2)"
  },
  {
    title: "Insight Pipeline",
    meta: "Unified Distribution",
    description: "Streams insights to your channels.",
    icon: <Activity style={{ width: '1rem', height: '1rem', color: '#818cf8' }} />, 
    status: "Live Feed",
    tags: ["Multi-Channel Delivery", "Automated Alerts"],
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
    glowRgba: "rgba(129,140,248,0.2)"
  }
];

const BentoGrid: React.FC<BentoGridProps> = ({ items = defaultItems }) => {
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)',
      gap: '1.5rem',
      padding: '1.5rem',
      maxWidth: '80rem',
      margin: '0 auto'
    }}>
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          position: 'relative',
          padding: '1.5rem',
          borderRadius: '1rem',
          overflow: 'hidden',
          backgroundColor: 'rgba(24, 24, 27, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 15px rgba(255, 77, 0, 0.2)',
          transition: 'all 0.7s ease',
          cursor: 'pointer',
          gridColumn: item.colSpan === 2 && !isMobile ? 'span 2' : 'span 1',
          minHeight: '200px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 77, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 77, 0, 0.2)';
        }}
      >
        {item.hasInteractiveGrid && (
          <InteractiveGrid
            dotSize={6}
            gap={16}
            baseColor="rgba(148,163,184,0.2)"
            activeColor="rgba(59,130,246,0.4)"
            proximity={120}
            className="kyma-interactive-grid"
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: item.gradient,
            opacity: 0.2,
            transition: 'opacity 0.3s',
          }}
          className="kyma-gradient-overlay"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
          opacity: 0.1,
          transition: 'opacity 0.3s',
        }} />
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          color: 'white',
          zIndex: 1
        }}>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#27272a',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid transparent'
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.375rem 0.75rem',
                backgroundColor: '#27272a',
                border: '1px solid transparent',
                borderRadius: '9999px',
                color: '#d4d4d8'
              }}>
                {item.status}
              </span>
            </div>
            <h3 style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              {item.title} <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#a1a1aa' }}>{item.meta}</span>
            </h3>
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#a1a1aa',
              lineHeight: '1.5'
            }}>
              {item.description}
            </p>
          </div>
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {item.tags.map((t, idx) => (
              <span key={idx} style={{
                padding: '0.25rem 0.625rem',
                fontSize: '0.75rem',
                backgroundColor: '#27272a',
                border: '1px solid transparent',
                borderRadius: '0.375rem',
                color: '#d4d4d8'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
    </div>
  );
};

export default function KymaBentoGrid() {
  return (
    <div className="capabilities">
      <div className="capabilities-content">
        {/* Header Section */}
        <div className="capabilities-header">
          <div className="capabilities-tag">
            <Zap className="capabilities-tag-icon" />
            <span className="capabilities-tag-text">
              Intelligence Engine
            </span>
          </div>
          
          <h1 className="capabilities-title">
            Kyma AI-Enhanced{' '}
            <span className="capabilities-title-highlight">
              Portfolio Intelligence
            </span>
          </h1>
          
          <p className="capabilities-subtitle">
            Layered LLM-driven analysis synthesizing market signals and portfolio context into unified user insights
          </p>
        </div>

        {/* Capabilities Bento Grid */}
        <BentoGrid />
      </div>
    </div>
  );
}
