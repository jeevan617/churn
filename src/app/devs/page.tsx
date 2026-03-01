"use client";

import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

export default function DevsPage() {
    const devs = [
        {
            name: "KARTHIK M",
            role: "Lead Architect & Security",
            status: "ONLINE",
            contact: "karthik.m@churn.ai",
            skills: ["System Design", "Cryptography", "Predictive Modeling", "WebGL"],
            key: "PRIMARY_OPERATOR"
        },
        {
            name: "UNKNOWN ENTITY",
            role: "AI Consultant",
            status: "CLASSIFIED",
            contact: "redacted@sys.local",
            skills: ["Neural Networks", "Anomaly Detection", "Deep Learning Base"],
            key: "GHOST_IN_THE_SHELL"
        }
    ];

    return (
        <div className="min-h-screen pt-24 px-6 relative bg-[#050505] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-neon-blue)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(176,38,255,0.1)] border border-[rgba(176,38,255,0.2)] text-[var(--color-neon-purple)] text-xs font-mono mb-6 mx-auto">
                        <Terminal size={12} />
                        PERSONNEL_RECORDS
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-[#fff] mb-6 font-mono uppercase">
                        Development Team
                    </h1>
                    <p className="text-gray-400 font-mono text-xs tracking-wider">
                        [ AUTHORIZED ACCESS LOGGED: {new Date().toISOString()} ]
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {devs.map((dev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="glass-panel relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-neon-blue)] group bg-black/50"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)] opacity-10 blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-neon-blue)] opacity-10 blur-3xl pointer-events-none" />

                            <div className="h-1 w-full bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] opacity-50 group-hover:opacity-100 transition-opacity" />

                            <div className="p-8 relative z-10">
                                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white tracking-wider font-mono mb-2">{dev.name}</h2>
                                        <p className="text-[var(--color-neon-blue)] font-mono text-xs uppercase bg-blue-900/20 px-2 py-1 inline-block rounded">{dev.role}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded border text-[10px] font-mono flex items-center gap-2 ${dev.status === 'ONLINE' ? 'bg-green-500/10 text-green-500 border-green-500/30' : 'bg-red-500/10 text-red-500 border-red-500/30'
                                        }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${dev.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        {dev.status}
                                    </div>
                                </div>

                                <div className="space-y-4 font-mono text-sm border-l border-white/10 pl-4">
                                    <div>
                                        <span className="text-gray-600 text-xs block mb-1">DESIGNATION_KEY:</span>
                                        <span className="text-gray-300 tracking-wider text-xs">{dev.key}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-xs block mb-1">COMM_LINK:</span>
                                        <a href={`mailto:${dev.contact}`} className="text-gray-400 hover:text-[var(--color-neon-purple)] transition-colors text-xs flex items-center gap-2">
                                            <Mail size={12} /> {dev.contact}
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-xs block mb-2">OPERATIONAL_SKILLS:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {dev.skills.map((skill, j) => (
                                                <span key={j} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
