import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ShieldAlert, Users, Activity, Target, MessageSquare } from 'lucide-react';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    const token = tokenCookie?.value;

    if (!token) {
        redirect('/login');
    }

    let isCEO = false;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'crazy-super-secret-key-for-churn-dashboard') as any;
        if (decoded.email === 'ceo@churn.ai') {
            isCEO = true;
        }
    } catch (e) {}

    // Fetch real time feedback data from SQL
    let recentFeedbacks: { id: number; employee_name: string; message: string; created_at: string }[] = [];
    if (isCEO) {
        try {
            const stmt = db.prepare('SELECT id, employee_name, message, created_at FROM feedbacks ORDER BY created_at DESC LIMIT 7');
            recentFeedbacks = stmt.all() as { id: number, employee_name: string, message: string, created_at: string }[];
        } catch (e) {
            console.error("Failed to load feedbacks", e);
        }
    }

    // Fetch real time stats
    const userCountRow = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    const churnPredRow = db.prepare(`SELECT COUNT(*) as count FROM predictions WHERE risk_level IN ('HIGH', 'CRITICAL')`).get() as { count: number };
    const allPredRow = db.prepare(`SELECT COUNT(*) as count FROM predictions`).get() as { count: number };

    const activeUsersValue = userCountRow.count.toLocaleString();
    const predictedChurnValue = churnPredRow.count.toLocaleString();
    let retentionValue = '100%';
    if (allPredRow.count > 0) {
        const retained = allPredRow.count - churnPredRow.count;
        retentionValue = ((retained / allPredRow.count) * 100).toFixed(1) + '%';
    }

    const stats = [
        { label: 'Active Users', value: activeUsersValue, icon: Users, color: 'text-[var(--color-neon-blue)]' },
        { label: 'Predicted Churn', value: predictedChurnValue, icon: ShieldAlert, color: 'text-red-400' },
        { label: 'Retention Rate', value: retentionValue, icon: Target, color: 'text-[var(--color-neon-purple)]' },
        { label: 'System Health', value: 'Optimal', icon: Activity, color: 'text-green-400' },
    ];

    // Chart Distribution
    const recentScoresQuery = db.prepare('SELECT score FROM predictions ORDER BY created_at DESC LIMIT 15').all() as { score: number }[];
    const realScores = recentScoresQuery.reverse().map(r => r.score);
    const chartBars = Array.from({ length: 15 }).map((_, i) => {
        const idx = i - (15 - realScores.length);
        return idx >= 0 ? realScores[idx] : 0;
    });

    return (
        <div className="min-h-screen pt-24 px-6 relative bg-[#050505]">
            {/* Dynamic background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-neon-purple)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-neon-blue)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 border-b border-[var(--color-dark-border)] pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold tracking-widest text-[#fff] mb-2 flex items-center gap-3">
                            <Activity className="text-[var(--color-neon-blue)]" /> COMMAND_CENTER
                        </h1>
                        <p className="text-gray-400 font-mono text-sm max-w-xl">
                            Real-time predictive analytics matrix monitoring user behavioral anomalies and churn vectors.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-[var(--color-neon-blue)] font-mono text-xs flex items-center gap-2 justify-end">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-blue)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-neon-blue)]"></span>
                            </span>
                            LIVE_DATA_FEED
                        </div>
                        <div className="text-gray-500 font-mono text-xs mt-1">{new Date().toLocaleDateString()}</div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-neon-purple)] transition-all duration-300 group cursor-default relative overflow-hidden bg-[rgba(10,10,15,0.8)]"
                            >
                                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500 text-white">
                                    <Icon size={120} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-[#000] border border-[#222] ${stat.color} shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:border-current transition-colors z-10 relative`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-gray-500 text-xs font-mono">SYS_VAR_{index + 1}</div>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-gray-400 text-xs font-mono tracking-wider mb-1 uppercase">{stat.label}</div>
                                    <div className="text-3xl font-bold tracking-wider text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dummy Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 glass-panel p-6 rounded-xl min-h-[400px] flex flex-col bg-[rgba(10,10,15,0.8)] border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                        <h3 className="text-white font-mono text-sm mb-6 flex items-center gap-2 relative z-10">
                            <Activity size={16} className="text-[var(--color-neon-blue)]" />
                            CHURN_PROBABILITY_DISTRIBUTION [LAST_30_DAYS]
                        </h3>

                        <div className="flex-1 relative rounded-lg bg-black/50 border border-white/5 overflow-hidden p-6 flex items-end gap-3 z-10">
                            {/* Real-time bars */}
                            {chartBars.map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end gap-2 group relative h-full">
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[var(--color-neon-purple)] transition-opacity bg-[#050505] p-1 rounded border border-[#333] z-20 whitespace-nowrap">
                                        V_{h}
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-t-sm opacity-60 group-hover:opacity-100 transition-all cursor-crosshair relative overflow-hidden"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]"></div>
                                    </div>
                                </div>
                            ))}

                            {/* Vertical Guide Lines */}
                            <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.05] pointer-events-none border-l border-dashed" />
                            <div className="absolute inset-y-0 left-2/4 w-[1px] bg-white/[0.05] pointer-events-none border-l border-dashed" />
                            <div className="absolute inset-y-0 left-3/4 w-[1px] bg-white/[0.05] pointer-events-none border-l border-dashed" />
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl flex flex-col bg-[rgba(10,10,15,0.8)] border-[rgba(255,255,255,0.05)]">
                        {isCEO ? (
                            <>
                                <h3 className="text-white font-mono text-sm mb-6 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-[var(--color-neon-purple)]" />
                                    LIVE_EMPLOYEE_FEEDBACK
                                </h3>

                                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                                    {recentFeedbacks.length === 0 ? (
                                        <div className="text-gray-500 font-mono text-xs text-center py-10 border border-dashed border-white/5 rounded">NO_FEEDBACK_DETECTED</div>
                                    ) : recentFeedbacks.map((item, i) => (
                                        <div key={i} className="flex relative flex-col gap-2 p-3 border border-[rgba(255,255,255,0.05)] rounded bg-[#050505] hover:border-[var(--color-neon-purple)] hover:bg-[#0a0a0f] hover:shadow-[0_0_10px_rgba(176,38,255,0.2)] transition-all cursor-crosshair group overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-neon-purple)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="flex justify-between items-start">
                                                <div className="font-mono text-sm text-[var(--color-neon-blue)] group-hover:text-white transition-colors">{item.employee_name}</div>
                                                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 font-light truncate">
                                                {item.message}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-white font-mono text-sm mb-6 flex items-center gap-2">
                                    <Target size={16} className="text-[var(--color-neon-purple)]" />
                                    CRITICAL_TARGETS_LIST
                                </h3>

                                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                                    {[
                                        { id: 'USR-8992', risk: '98%', status: 'CRITICAL', trend: '+5%' },
                                        { id: 'USR-1244', risk: '92%', status: 'CRITICAL', trend: '+2%' },
                                        { id: 'USR-5531', risk: '88%', status: 'HIGH', trend: '-1%' },
                                        { id: 'USR-9012', risk: '85%', status: 'HIGH', trend: '+4%' },
                                        { id: 'USR-3321', risk: '81%', status: 'HIGH', trend: '0%' },
                                        { id: 'USR-7765', risk: '76%', status: 'MODERATE', trend: '-3%' },
                                        { id: 'USR-4423', risk: '72%', status: 'MODERATE', trend: '-5%' },
                                    ].map((target, i) => (
                                        <div key={i} className="flex relative items-center justify-between p-3 border border-[rgba(255,255,255,0.05)] rounded bg-[#050505] hover:border-[var(--color-neon-purple)] hover:bg-[#0a0a0f] hover:shadow-[0_0_10px_rgba(176,38,255,0.2)] transition-all cursor-crosshair group overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-neon-purple)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div>
                                                <div className="font-mono text-sm text-[var(--color-neon-blue)] group-hover:text-white transition-colors">{target.id}</div>
                                                <div className="text-[10px] text-gray-500 font-mono mt-1 flex items-center gap-1">
                                                    <Activity size={10} /> TREND: <span className={target.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'}>{target.trend}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${target.status === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                                                        target.status === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' :
                                                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                                                    }`}>
                                                    LVL_{target.risk}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
