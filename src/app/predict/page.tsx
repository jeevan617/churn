import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Smartphone, ShoppingCart, Landmark, Layers, Gamepad2, ChevronRight, Brain } from 'lucide-react';

const DOMAINS = [
    { id: 'telecom', name: 'Telecom', desc: 'Mobile & broadband subscriber churn via contract, usage & service signals.', Icon: Smartphone, color: '#00f0ff', params: 13, accuracy: '89.3%' },
    { id: 'ecommerce', name: 'E-Commerce', desc: 'Predict shoppers who will stop purchasing using RFM & behavioural patterns.', Icon: ShoppingCart, color: '#ff007f', params: 12, accuracy: '86.7%' },
    { id: 'banking', name: 'Banking & Finance', desc: 'Identify at-risk banking customers from account activity & product portfolio.', Icon: Landmark, color: '#f59e0b', params: 12, accuracy: '91.2%' },
    { id: 'saas', name: 'SaaS / Subscription', desc: 'Catch churning software subscribers via product engagement & NPS signals.', Icon: Layers, color: '#b026ff', params: 12, accuracy: '88.4%' },
    { id: 'gaming', name: 'Gaming', desc: 'Flag lapsed players using session data, social graph & spending patterns.', Icon: Gamepad2, color: '#22c55e', params: 12, accuracy: '84.9%' },
];

export default async function PredictHubPage() {
    const cookieStore = await cookies();
    if (!cookieStore.get('token')) redirect('/login');

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 bg-[#050505]">
            <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(176,38,255,0.05) 0%, transparent 60%)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] text-[10px] font-mono text-gray-500 tracking-widest mb-5">
                        <Brain size={11} className="text-[var(--color-neon-blue)]" /> AI_MODEL_HUB · v2.1.0
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
                        Choose a <span className="text-gradient">Domain</span>
                    </h1>
                    <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto">
                        Each domain runs a specialized logistic regression model trained on industry-specific datasets. Select your vertical to begin.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {DOMAINS.map(({ id, name, desc, Icon, color, params, accuracy }) => (
                        <Link key={id} href={`/predict/${id}`}
                            className="group relative glass-panel rounded-2xl p-6 bg-[rgba(8,8,15,0.9)] border border-[rgba(255,255,255,0.06)] hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer"
                            style={{ '--c': color } as React.CSSProperties}>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{ background: `radial-gradient(circle at top left, ${color}12, transparent 65%)` }} />
                            <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 border transition-all group-hover:shadow-lg"
                                style={{ background: `${color}12`, borderColor: `${color}35`, color, boxShadow: `0 0 16px ${color}20` }}>
                                <Icon size={20} />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-base font-bold text-white mb-2 group-hover:text-[var(--c)] transition-colors">{name}</h2>
                                <p className="text-gray-500 text-xs leading-relaxed mb-5">{desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                                    <div className="flex gap-5">
                                        <div>
                                            <div className="text-[9px] font-mono text-gray-600 uppercase mb-0.5">Parameters</div>
                                            <div className="text-sm font-bold font-mono" style={{ color }}>{params}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono text-gray-600 uppercase mb-0.5">Accuracy</div>
                                            <div className="text-sm font-bold font-mono" style={{ color }}>{accuracy}</div>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="glass-panel rounded-2xl p-5 bg-[rgba(8,8,15,0.9)] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[{ v: '5', l: 'Domains Available' }, { v: '88.1%', l: 'Avg Accuracy' }, { v: '13', l: 'Max Parameters' }, { v: 'LogReg', l: 'Algorithm' }].map((s, i) => (
                        <div key={i}>
                            <div className="text-xl font-bold font-mono text-gradient">{s.v}</div>
                            <div className="text-[9px] font-mono text-gray-600 uppercase mt-1">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
