"use client";

import { motion } from 'framer-motion';
import { Terminal, Database } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 px-6 relative bg-[#050505] overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-neon-purple)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-neon-blue)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 border-b border-[var(--color-dark-border)] pb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] text-[var(--color-neon-blue)] text-xs font-mono mb-6">
                        <Terminal size={12} />
                        SYSTEM_OVERVIEW_DOC
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-[#fff] mb-6 font-mono uppercase">
                        Project Architecture
                    </h1>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl">
                        A high-performance anomaly detection system engineered to predict user attrition vectors before they actualize. Utilizing advanced probabilistic models wrapped in a reactive telemetry interface.
                    </p>
                </motion.div>

                <div className="space-y-8 cursor-default">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group glass-panel p-8 rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-neon-blue)] bg-[rgba(10,10,15,0.8)] relative overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[var(--color-neon-blue)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h2 className="text-xl font-bold text-white mb-4 font-mono flex items-center gap-3">
                            <span className="text-[var(--color-neon-blue)]">01.</span> CORE_OBJECTIVE
                        </h2>
                        <p className="text-gray-400 font-mono text-sm leading-relaxed pl-8 border-l border-[rgba(255,255,255,0.1)]">
                            The primary directive is to eliminate reactive retention strategies. By aggregating user interaction data, session duration variances, and feature adoption rates, the system computes a precise Churn Probability Index (CPI) for every active node in real-time.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="group glass-panel p-8 rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-neon-purple)] bg-[rgba(10,10,15,0.8)] relative overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[var(--color-neon-purple)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <h2 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-3">
                            <span className="text-[var(--color-neon-purple)]">02.</span> INFRASTRUCTURE_STACK
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                            {[
                                { name: 'NEXT.JS', desc: 'React Framework V15' },
                                { name: 'TAILWIND CSS', desc: 'Utility-first Styling' },
                                { name: 'FRAMER MOTION', desc: 'Physics-based Animations' },
                                { name: 'BETTER-SQLITE3', desc: 'Synchronous DB Layer' },
                                { name: 'JWT + BCRYPT', desc: 'Cryptographic Auth Protocol' },
                                { name: 'SPLINE', desc: '3D WebGL Neural Matrix Render' },
                            ].map((tech, i) => (
                                <div key={i} className="flex flex-col p-3 border border-[rgba(255,255,255,0.05)] rounded bg-[#050505] group-hover:border-[rgba(176,38,255,0.2)] transition-colors">
                                    <span className="text-[var(--color-neon-blue)] text-xs font-mono mb-1">{tech.name}</span>
                                    <span className="text-gray-500 text-[10px] font-mono">{tech.desc}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
