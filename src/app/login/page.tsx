"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            const data = await res.json();
            setError(data.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#050505] to-[#120a1f]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-purple)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 glass-panel rounded-2xl border border-[var(--color-dark-border)] z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <Activity size={48} className="text-[var(--color-neon-blue)] mb-4" />
                    <h1 className="text-3xl font-bold tracking-widest text-[#fff] text-center">SYSTEM_LOGIN</h1>
                    <p className="text-gray-400 text-sm mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-6 border border-red-500/50 text-sm text-center">
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email Operator"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.1)] text-white px-10 py-3 rounded-lg focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all font-mono placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Security Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.1)] text-white px-10 py-3 rounded-lg focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all font-mono placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] rounded-lg text-white font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] transition-all flex justify-center items-center gap-2"
                    >
                        Authenticate <Activity size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm font-mono">
                    <p>Don&apos;t have credentials? <Link href="/signup" className="text-[var(--color-neon-blue)] hover:text-white transition-colors">Request Access</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
