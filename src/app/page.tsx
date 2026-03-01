"use client";

import { motion } from 'framer-motion';
import { Terminal, Bot, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto">
        <Spline scene="/radial_pattern.spline" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,15,0.5)] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-blue)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-neon-blue)]"></span>
            </span>
            <span className="text-xs font-mono tracking-wider text-gray-300">SYSTEM V2.0 ONLINE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] font-sans">
            PREDICTIVE <br className="hidden md:block" />
            <span className="text-gradient drop-shadow-[0_0_40px_rgba(176,38,255,0.5)]">CHURN ANALYSIS</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-mono leading-relaxed">
            Locate and neutralize user attrition vectors before they execute. Advanced probabilistic telemetry engine active.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/dashboard"
              className="relative group px-8 py-4 bg-transparent rounded-lg font-bold tracking-widest uppercase overflow-hidden w-full sm:w-auto text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 text-white group-hover:text-[var(--color-neon-blue)] transition-colors duration-300 flex items-center justify-center gap-2">
                <Terminal size={18} /> INITIALIZE DASHBOARD
              </span>
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-lg font-bold tracking-widest uppercase border border-[rgba(255,255,255,0.2)] text-white hover:border-[var(--color-neon-blue)] hover:bg-[rgba(0,240,255,0.05)] transition-all w-full sm:w-auto text-sm flex items-center justify-center gap-2"
            >
              <BrainCircuit size={18} /> SYSTEM_DOCS
            </Link>
          </div>
        </motion.div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-10 inset-x-0 w-full flex justify-center gap-12 text-gray-500 font-mono text-xs hidden md:flex"
        >
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Bot size={16} className="text-[var(--color-neon-blue)]" /> NEURAL_NET_SYNCED
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Terminal size={16} className="text-[var(--color-neon-purple)]" /> TERMINAL_ACCESS_GRANTED
          </div>
        </motion.div>
      </main>

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-0"></div>
    </div>
  );
}
