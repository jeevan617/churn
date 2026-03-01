"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);
        } else {
            const data = await res.json();
            setError(data.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#050505] to-[#0a121f]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-blue)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 glass-panel rounded-2xl border border-[var(--color-dark-border)] z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <UserPlus size={48} className="text-[var(--color-neon-purple)] mb-4" />
                    <h1 className="text-3xl font-bold tracking-widest text-[#fff] text-center">INIT_USER</h1>
                    <p className="text-gray-400 text-sm mt-2 font-mono">CREATE SYSTEM CREDENTIALS</p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-6 border border-red-500/50 text-sm text-center">
                        {error}
                    </motion.div>
                )}

                {success && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-6 border border-green-500/50 text-sm text-center">
                        {success}
                    </motion.div>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Designation"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.1)] text-white px-10 py-3 rounded-lg focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all font-mono placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Comm Link (Email)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.1)] text-white px-10 py-3 rounded-lg focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all font-mono placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Set Security Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.1)] text-white px-10 py-3 rounded-lg focus:outline-none focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)] transition-all font-mono placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg text-white font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex justify-center items-center gap-2"
                    >
                        Generate Identity <Activity size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm font-mono">
                    <p>Already registered? <Link href="/login" className="text-[var(--color-neon-purple)] hover:text-white transition-colors">Authenticate</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
