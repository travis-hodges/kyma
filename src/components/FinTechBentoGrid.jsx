"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import {
    TrendingUp,
    BarChart3,
    Database,
    Cpu,
    Activity,
    Zap,
    Brain,
    Shield,
    Globe,
    Server,
    LineChart,
    PieChart
} from "lucide-react";
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

// Interactive Grid Component
const InteractiveGrid = ({
    dotSize = 8,
    gap = 12,
    baseColor = '#1e293b',
    activeColor = '#64748b',
    proximity = 100,
    className,
}) => {
    const containerRef = useRef(null);
    const dotsRef = useRef([]);
    const centresRef = useRef([]);

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

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.style.width = `${dotSize}px`;
            dot.style.height = `${dotSize}px`;
            dot.style.borderRadius = '50%';
            dot.style.willChange = 'transform, background-color';

            gsap.set(dot, { x: 0, y: 0, backgroundColor: baseColor });
            fragment.appendChild(dot);
            dotsRef.current.push(dot);
        }
        container.appendChild(fragment);

        requestAnimationFrame(() => {
            const containerRect = container.getBoundingClientRect();
            centresRef.current = dotsRef.current.map(el => {
                const r = el.getBoundingClientRect();
                return {
                    el,
                    x: r.left - containerRect.left + r.width / 2,
                    y: r.top - containerRect.top + r.height / 2,
                };
            });
        });
    }, [dotSize, gap, baseColor]);

    useEffect(() => {
        buildGrid();
        const container = containerRef.current;
        if (!container) return;
        const ro = new window.ResizeObserver(buildGrid);
        ro.observe(container);
        return () => ro.disconnect();
    }, [buildGrid]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onPointerMove = (e) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            requestAnimationFrame(() => {
                centresRef.current.forEach(({ el, x, y }) => {
                    const dist = Math.hypot(x - mouseX, y - mouseY);
                    const interp = Math.max(0, 1 - dist / proximity);
                    gsap.to(el, {
                        backgroundColor: gsap.utils.interpolate(
                            baseColor,
                            activeColor,
                            interp
                        ),
                        duration: 0.1,
                    });
                });
            });
        };

        container.addEventListener('pointermove', onPointerMove);
        return () => {
            container.removeEventListener('pointermove', onPointerMove);
        };
    }, [baseColor, activeColor, proximity]);

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${dotSize}px)`,
        gridAutoRows: `${dotSize}px`,
        gap: `${gap}px`,
        placeContent: 'center',
        placeItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    };

    return (
        <div className={`absolute inset-0 overflow-hidden ${className || ''}`}>
            <div ref={containerRef} style={gridContainerStyle} />
        </div>
    );
};

// Bento Grid Component
const fintechItems = [
    {
        title: "Real-Time Market Analytics",
        meta: "Live Data",
        description: "Process millions of market data points with AI-powered insights and predictive modeling for trading decisions",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Analytics", "AI", "Trading"],
        colSpan: 2,
        hasPersistentHover: true,
        hasInteractiveGrid: true,
        gradient: "from-blue-500/10 via-cyan-500/5 to-transparent"
    },
    {
        title: "Risk Assessment Engine",
        meta: "99.9% Accuracy",
        description: "Advanced algorithms analyze portfolio risk and market volatility in real-time",
        icon: <Shield className="w-4 h-4 text-emerald-500" />,
        status: "Active",
        tags: ["Risk", "Security", "ML"],
        gradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    },
    {
        title: "High-Frequency Data Processing",
        meta: "1M+ TPS",
        description: "Ultra-low latency infrastructure processing market data at microsecond speeds",
        icon: <Zap className="w-4 h-4 text-yellow-500" />,
        tags: ["Performance", "Infrastructure"],
        colSpan: 2,
        gradient: "from-yellow-500/10 via-orange-500/5 to-transparent"
    },
    {
        title: "Algorithmic Trading Hub",
        meta: "24/7 Active",
        description: "Automated trading strategies powered by machine learning and quantitative analysis",
        icon: <Brain className="w-4 h-4 text-purple-500" />,
        status: "Trading",
        tags: ["Algorithms", "Automation"],
        gradient: "from-purple-500/10 via-violet-500/5 to-transparent"
    },
    {
        title: "Global Market Coverage",
        meta: "150+ Exchanges",
        description: "Comprehensive data feeds from major financial markets worldwide",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        status: "Connected",
        tags: ["Global", "Markets"],
        gradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
        title: "Quantum Computing Research",
        meta: "Beta Phase",
        description: "Next-generation portfolio optimization using quantum algorithms",
        icon: <Cpu className="w-4 h-4 text-pink-500" />,
        status: "Research",
        tags: ["Quantum", "Innovation"],
        gradient: "from-pink-500/10 via-rose-500/5 to-transparent"
    }
];

function BentoGrid({ items = fintechItems }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden transition-all duration-500",
                        "border border-border bg-background",
                        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        {
                            "shadow-[0_8px_30px_rgba(0,0,0,0.12)] -translate-y-1":
                                item.hasPersistentHover,
                            "dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)]":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    {/* Interactive Grid Background */}
                    {item.hasInteractiveGrid && (
                        <div className="absolute inset-0 opacity-30">
                            <InteractiveGrid
                                dotSize={6}
                                gap={16}
                                baseColor="rgb(148 163 184 / 0.3)"
                                activeColor="rgb(59 130 246 / 0.6)"
                                proximity={120}
                            />
                        </div>
                    )}

                    {/* Gradient Background */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-muted/50 to-transparent'}`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:8px_8px]" />
                    </div>

                    <div className="relative flex flex-col space-y-4 h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border/50 group-hover:border-border transition-all duration-300">
                                {item.icon}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm",
                                    "bg-background/80 border border-border/50 text-foreground/80",
                                    "transition-all duration-300 group-hover:bg-background/90 group-hover:border-border"
                                )}
                            >
                                {item.status || "Active"}
                            </span>
                        </div>

                        <div className="space-y-3 flex-1">
                            <h3 className="font-semibold text-foreground tracking-tight text-lg">
                                {item.title}
                                <span className="ml-2 text-sm text-muted-foreground font-normal">
                                    {item.meta}
                                </span>
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-md bg-background/60 backdrop-blur-sm border border-border/30 text-muted-foreground transition-all duration-200 hover:bg-background/80 hover:border-border/50"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.cta || "Explore →"}
                            </span>
                        </div>
                    </div>

                    {/* Enhanced border effect */}
                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-transparent",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            "transition-opacity duration-500"
                        )}
                    />
                </div>
            ))}
        </div>
    );
}

export default function FinTechBentoGrid() {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Financial Data Intelligence Platform
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Advanced analytics and AI-powered insights for modern financial markets
                </p>
            </div>
            <BentoGrid items={fintechItems} />
        </div>
    );
} 