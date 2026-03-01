"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, LogOut, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => res.json())
            .then((data) => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            });
    }, [pathname]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login';
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Devs', path: '/devs' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-b border-[var(--color-dark-border)] px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <Zap className="text-[var(--color-neon-blue)] group-hover:text-[var(--color-neon-purple)] transition-colors" />
                    <span className="text-xl font-bold tracking-widest text-[#fff]">CHURN.AI</span>
                </Link>
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`relative text-sm uppercase tracking-wide transition-colors hover:text-[var(--color-neon-blue)] ${pathname === link.path ? 'text-[var(--color-neon-blue)] font-bold' : 'text-gray-400'
                                }`}
                        >
                            {link.name}
                            {pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 h-[2px] -bottom-2 bg-[var(--color-neon-blue)]"
                                />
                            )}
                        </Link>
                    ))}

                    <div className="w-[1px] h-6 bg-[var(--color-dark-border)] mx-2"></div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                                <LogOut size={14} /> LOGOUT
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                                LOGIN
                            </Link>
                            <Link href="/signup" className="text-sm px-4 py-2 rounded-md btn-neon font-bold flex items-center gap-1">
                                SIGNUP <ChevronRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
