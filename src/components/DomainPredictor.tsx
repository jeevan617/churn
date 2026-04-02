'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, ChevronRight, RotateCcw, TrendingUp, TrendingDown, Zap, ShieldCheck, AlertTriangle, Activity, X } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────
export type FieldDef =
    | { type: 'slider'; key: string; label: string; min: number; max: number; unit?: string; default: number; color?: string }
    | { type: 'toggle'; key: string; label: string; default: boolean }
    | { type: 'select'; key: string; label: string; options: { value: string; label: string }[]; default: string }
    | { type: 'number'; key: string; label: string; default: number; min?: number; max?: number };

export interface SectionDef { title: string; icon: React.ReactNode; fields: FieldDef[]; }

export interface DomainConfig {
    domain: string;
    title: string;
    subtitle: string;
    primaryColor: string;
    secondaryColor: string;
    sections: SectionDef[];
}

interface PredictionResult { probability: number; score: number; riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'; factors: { name: string; impact: number; direction: 'positive' | 'negative' }[]; }

const RISK = {
    LOW: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.4)', label: 'Low Risk', icon: ShieldCheck },
    MODERATE: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.4)', label: 'Moderate Risk', icon: Activity },
    HIGH: { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.4)', label: 'High Risk', icon: AlertTriangle },
    CRITICAL: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.4)', label: 'Critical Risk', icon: AlertTriangle },
};

const RECO: Record<string, string> = {
    CRITICAL: '🔴 Immediate intervention required. Offer a personalized retention package with priority support and loyalty incentives.',
    HIGH: '🟠 Launch a proactive retention campaign. Consider upgrading plans with discounts and enhanced service bundles.',
    MODERATE: '🟡 Monitor and engage proactively. A satisfaction survey and targeted outreach can address pain points early.',
    LOW: '🟢 Customer is stable. Maintain standard engagement and explore cross-sell opportunities to deepen the relationship.',
};

// ── Gauge ─────────────────────────────────────────────────────────
function Gauge({ score }: { score: number }) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const cx = 110, cy = 110, r = 80, start = -210, arc = 240;
    const end = start + (score / 100) * arc;
    const mkPath = (s: number, e: number, radius: number) => {
        const p1 = { x: cx + radius * Math.cos(toRad(s)), y: cy + radius * Math.sin(toRad(s)) };
        const p2 = { x: cx + radius * Math.cos(toRad(e)), y: cy + radius * Math.sin(toRad(e)) };
        return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${e - s > 180 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
    };
    const color = score >= 75 ? '#ef4444' : score >= 50 ? '#f97316' : score >= 25 ? '#f59e0b' : '#22c55e';
    return (
        <svg viewBox="0 0 220 160" className="w-full max-w-[260px] mx-auto">
            <path d={mkPath(start, start + arc, r)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" strokeLinecap="round" />
            <path d={mkPath(start, end, r)} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
            {[0, 25, 50, 75, 100].map(v => {
                const a = start + (v / 100) * arc;
                return <line key={v} x1={cx + (r - 20) * Math.cos(toRad(a))} y1={cy + (r - 20) * Math.sin(toRad(a))} x2={cx + (r - 10) * Math.cos(toRad(a))} y2={cy + (r - 10) * Math.sin(toRad(a))} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />;
            })}
            <text x={cx} y={cy + 8} textAnchor="middle" fill={color} fontSize="34" fontWeight="800" fontFamily="monospace">{score}</text>
            <text x={cx} y={cy + 24} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">CHURN SCORE</text>
        </svg>
    );
}

// ── Field Renderers ───────────────────────────────────────────────
function SliderF({ f, value, onChange, primary }: { f: Extract<FieldDef, { type: 'slider' }>, value: number, onChange: (v: number) => void, primary: string }) {
    const pct = ((value - f.min) / (f.max - f.min)) * 100;
    return (
        <div>
            <label className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5 tracking-wider">
                <span>{f.label}</span>
                <span style={{ color: primary }}>{f.unit === '$' ? `$${value.toLocaleString()}` : `${value}${f.unit ?? ''}`}</span>
            </label>
            <input type="range" min={f.min} max={f.max} value={value} onChange={e => onChange(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${primary} ${pct}%, #1a1a2e ${pct}%)` }} />
            <div className="flex justify-between text-[9px] text-gray-700 font-mono mt-0.5">
                <span>{f.unit === '$' ? `$${f.min}` : f.min}</span>
                <span>{f.unit === '$' ? `$${f.max.toLocaleString()}` : f.max}{f.unit && f.unit !== '$' ? f.unit : ''}</span>
            </div>
        </div>
    );
}

function ToggleF({ f, value, onChange }: { f: FieldDef, value: boolean, onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-[11px] font-mono text-gray-400 group-hover:text-gray-200 transition-colors tracking-wider">{(f as any).label}</span>
            <button type="button" onClick={() => onChange(!value)}
                className={`relative w-9 h-5 rounded-full transition-all duration-300 ${value ? 'bg-[var(--color-neon-blue)]' : 'bg-[#1a1a2e]'}`}
                style={{ boxShadow: value ? '0 0 8px rgba(0,240,255,0.5)' : 'none' }}>
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${value ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
        </label>
    );
}

function SelectF({ f, value, onChange }: { f: FieldDef, value: string, onChange: (v: string) => void }) {
    const sf = f as Extract<FieldDef, { type: 'select' }>;
    return (
        <div>
            <label className="block text-[11px] font-mono text-gray-400 mb-2 tracking-wider">{sf.label}</label>
            <div className="flex gap-2 flex-wrap">
                {sf.options.map(o => (
                    <button key={o.value} type="button" onClick={() => onChange(o.value)}
                        className={`py-1.5 px-3 rounded-lg text-[11px] font-mono border transition-all duration-200 ${value === o.value ? 'border-[var(--color-neon-blue)] bg-[rgba(0,240,255,0.08)] text-[var(--color-neon-blue)]' : 'border-[rgba(255,255,255,0.07)] text-gray-600 hover:text-gray-300 hover:border-gray-500'
                            }`}>
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Main Widget ───────────────────────────────────────────────────
export default function DomainPredictor({ config }: { config: DomainConfig }) {
    const router = useRouter();
    const initState = () => {
        const s: Record<string, unknown> = {};
        config.sections.forEach(sec => sec.fields.forEach(f => { s[f.key] = f.default; }));
        return s;
    };
    const [form, setForm] = useState<Record<string, unknown>>(initState);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDoc, setShowDoc] = useState(false);

    const setField = useCallback((key: string, val: unknown) => setForm(p => ({ ...p, [key]: val })), []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            // Artificial delay to show parsing animation
            await new Promise((resolve) => setTimeout(resolve, 5000));
            
            const res = await fetch('/api/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain: config.domain, ...form }) });
            if (res.status === 401) { router.push('/login'); return; }
            const data = await res.json();
            if (data.success) setResult(data); else setError(data.error || 'Prediction failed');
        } catch { setError('Network error. Please try again.'); }
        finally { setLoading(false); }
    };

    const risk = result ? RISK[result.riskLevel] : null;

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 bg-[#050505]">
            <div className="fixed top-0 left-1/3 w-[600px] h-[500px] rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${config.primaryColor}08 0%, transparent 70%)` }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <a href="/predict" className="text-[11px] font-mono text-gray-600 hover:text-gray-400 transition-colors mb-3 block">← ALL DOMAINS</a>
                        <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
                            <Brain size={32} style={{ color: config.primaryColor }} />
                            <span>{config.title.split(' ')[0]} <span className="text-gradient">{config.title.split(' ').slice(1).join(' ')}</span></span>
                        </h1>
                        <p className="text-gray-500 font-mono text-xs max-w-lg">{config.subtitle}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono"
                        style={{ borderColor: `${config.primaryColor}40`, color: config.primaryColor, background: `${config.primaryColor}10` }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: config.primaryColor }} />
                        MODEL ACTIVE
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
                        {config.sections.map((sec, si) => (
                            <div key={si} className="glass-panel rounded-2xl p-5 bg-[rgba(8,8,15,0.9)]">
                                <h2 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                                    {sec.icon} {sec.title}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sec.fields.map(f => {
                                        if (f.type === 'slider') return <SliderF key={f.key} f={f} value={form[f.key] as number} onChange={v => setField(f.key, v)} primary={config.primaryColor} />;
                                        if (f.type === 'toggle') return <ToggleF key={f.key} f={f} value={form[f.key] as boolean} onChange={v => setField(f.key, v)} />;
                                        if (f.type === 'select') return <div key={f.key} className="col-span-full"><SelectF f={f} value={form[f.key] as string} onChange={v => setField(f.key, v)} /></div>;
                                        if (f.type === 'number') return (
                                            <div key={f.key}>
                                                <label className="block text-[11px] font-mono text-gray-400 mb-1.5 tracking-wider">{(f as any).label}</label>
                                                <input type="number" value={form[f.key] as number} onChange={e => setField(f.key, Number(e.target.value))}
                                                    className="input-neon w-full px-3 py-2 rounded-lg text-sm font-mono" />
                                            </div>
                                        );
                                        return null;
                                    })}
                                </div>
                            </div>
                        ))}

                        {error && <div className="px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">⚠ {error}</div>}

                        <div className="flex gap-3">
                            <button type="submit" disabled={loading}
                                className="flex-1 py-3 px-6 rounded-xl text-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 btn-neon">
                                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />ANALYZING...</> : <><Brain size={15} />RUN PREDICTION<ChevronRight size={15} /></>}
                            </button>
                            <button type="button" onClick={() => { setForm(initState()); setResult(null); }}
                                className="py-3 px-4 rounded-xl border border-[rgba(255,255,255,0.08)] text-gray-600 hover:text-white hover:border-gray-400 transition-all">
                                <RotateCcw size={15} />
                            </button>
                        </div>
                    </form>

                    {/* Results */}
                    <div className="lg:col-span-2 space-y-4">
                        {loading ? (
                            <div className="glass-panel rounded-2xl p-8 bg-[rgba(8,8,15,0.9)] flex flex-col items-center justify-center min-h-[350px] text-center transition-all duration-500" 
                                style={{ boxShadow: `0 0 40px ${config.primaryColor}15 inset`, border: `1px solid ${config.primaryColor}30` }}>
                                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent" style={{ borderTopColor: config.primaryColor, borderRightColor: config.secondaryColor, animation: 'spin-slow 1.5s linear infinite' }} />
                                    <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-transparent" style={{ borderBottomColor: config.secondaryColor, borderLeftColor: config.primaryColor, animation: 'spin-reverse 2s linear infinite' }} />
                                    <div className="absolute inset-5 rounded-full border border-dashed border-[rgba(255,255,255,0.1)]" style={{ animation: 'spin-slow 8s linear infinite' }} />
                                    <Brain size={36} className="text-white" style={{ filter: `drop-shadow(0 0 15px ${config.primaryColor})`, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                                </div>
                                <h3 className="text-white font-bold tracking-widest text-[13px] mb-4 uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full animate-ping" style={{ background: config.primaryColor }} />
                                    Processing Profile
                                </h3>
                                <div className="flex flex-col gap-1.5 w-full max-w-[240px]">
                                    <div className="flex justify-between text-[9px] font-mono text-gray-400">
                                        <span>CROSS-REFERENCING</span>
                                        <span className="animate-pulse" style={{ color: config.primaryColor }}>CALCULATING...</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#1a1a2e] rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 bottom-0 left-0 bg-white" style={{ width: '50%', background: `linear-gradient(90deg, transparent, ${config.primaryColor})`, boxShadow: '0 0 10px rgba(255,255,255,0.8)', animation: 'progress-slide 2s ease-in-out infinite' }} />
                                    </div>
                                    <p className="text-[9px] font-mono text-gray-500 mt-3 opacity-70">Evaluating behavioral signals against historical churn indicators...</p>
                                </div>
                            </div>
                        ) : !result ? (
                            <div className="glass-panel rounded-2xl p-8 bg-[rgba(8,8,15,0.9)] flex flex-col items-center justify-center min-h-[350px] text-center border-dashed border-[rgba(255,255,255,0.05)] transition-all duration-500">
                                <Brain size={44} className="text-gray-700/50 mb-3" />
                                <p className="text-gray-600 font-mono text-xs">Configure parameters<br />and run the model.</p>
                            </div>
                        ) : (
                            <>
                                {/* Score Card */}
                                <div className="glass-panel rounded-2xl p-5 bg-[rgba(8,8,15,0.9)]"
                                    style={{ border: `1px solid ${risk!.border}`, boxShadow: `0 0 24px ${risk!.bg}` }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Churn Assessment</span>
                                        <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border"
                                            style={{ color: risk!.color, background: risk!.bg, borderColor: risk!.border }}>
                                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: risk!.color }} />
                                            {risk!.label}
                                        </span>
                                    </div>
                                    <Gauge score={result.score} />
                                    <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold font-mono" style={{ color: risk!.color }}>{(result.probability * 100).toFixed(1)}%</div>
                                            <div className="text-[9px] font-mono text-gray-600 uppercase mt-0.5">Churn Probability</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold font-mono text-white">{result.riskLevel}</div>
                                            <div className="text-[9px] font-mono text-gray-600 uppercase mt-0.5">Risk Level</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Factors */}
                                <div className="glass-panel rounded-2xl p-5 bg-[rgba(8,8,15,0.9)]">
                                    <h2 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                                        <Zap size={11} style={{ color: config.primaryColor }} /> Key Factors
                                    </h2>
                                    <div className="space-y-3">
                                        {result.factors.map((f, i) => {
                                            const maxImpact = Math.max(...result.factors.map(x => x.impact), 0.01);
                                            return (
                                                <div key={i}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-[11px] font-mono text-gray-300">{f.name}</span>
                                                        <span className={`flex items-center gap-1 text-[10px] font-mono ${f.direction === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                                                            {f.direction === 'positive' ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                                                            {f.direction === 'positive' ? 'Retentive' : 'Risk'}
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 bg-[#0a0a12] rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full transition-all duration-700"
                                                            style={{
                                                                width: `${(f.impact / maxImpact) * 100}%`,
                                                                background: f.direction === 'positive' ? 'linear-gradient(to right,#22c55e,#16a34a)' : 'linear-gradient(to right,#ef4444,#b91c1c)',
                                                                boxShadow: f.direction === 'positive' ? '0 0 5px rgba(34,197,94,0.5)' : '0 0 5px rgba(239,68,68,0.5)',
                                                            }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Recommendation */}
                                <div className="glass-panel rounded-2xl p-4 bg-[rgba(8,8,15,0.9)]">
                                    <h2 className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">Recommended Action</h2>
                                    <p className="text-xs text-gray-300 leading-relaxed">{RECO[result.riskLevel]}</p>
                                </div>

                                {/* Improvement & Documentation Button */}
                                <button onClick={() => setShowDoc(true)}
                                    className="w-full mt-2 py-3 px-4 rounded-xl border border-[var(--color-neon-blue)]/50 bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/20 hover:border-[var(--color-neon-blue)] transition-all flex justify-between items-center group shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                    <div className="flex items-center gap-2">
                                        <Zap size={14} className="group-hover:animate-pulse" />
                                        <span className="text-[11px] font-mono font-bold tracking-widest uppercase">Parameter Action Plan & Setup Details</span>
                                    </div>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Improvement Modal */}
            {showDoc && result && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="glass-panel rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col bg-[rgba(10,10,18,0.95)] border border-[rgba(255,255,255,0.1)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center bg-[#050505]">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Brain style={{ color: config.primaryColor }} />
                                    Analysis & Parameter Optimization
                                </h2>
                                <p className="text-xs text-gray-400 font-mono mt-1">Detailed breakdown of {config.title} constraints and strategies</p>
                            </div>
                            <button type="button" onClick={() => setShowDoc(false)} className="text-gray-500 hover:text-white transition-colors bg-[rgba(255,255,255,0.05)] p-2 rounded-full cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                            
                            {/* Strategy Section */}
                            <div>
                                <h3 className="text-[11px] font-mono tracking-widest text-white uppercase mb-4 flex items-center gap-2">
                                    <Activity size={14} style={{ color: config.primaryColor }} /> Recommended Adjustments based on Prediction
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.factors.filter(f => f.direction === 'negative').map((f, i) => (
                                        <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-[rgba(239,68,68,0.05)]">
                                            <h4 className="text-sm font-bold text-gray-200 mb-2 flex items-center gap-2">
                                                <TrendingUp size={14} className="text-red-400" /> {f.name} (Risk Factor)
                                            </h4>
                                            <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                                This specific parameter is actively triggering churn indicators in the model. Its current value signals severe friction.
                                            </p>
                                            <div className="bg-red-500/10 rounded border border-red-500/20 p-2 text-[11px] font-mono text-red-200">
                                                <span className="text-red-400 font-bold block mb-1">IMPROVEMENT PROTOCOL:</span>
                                                Trigger automated re-engagement workflows. Modify the value structure around this metric, offer guided tutorials, or present flexible downgrade options.
                                            </div>
                                        </div>
                                    ))}
                                    {result.factors.filter(f => f.direction === 'positive').map((f, i) => (
                                        <div key={`pos-${i}`} className="p-4 rounded-xl border border-green-500/20 bg-[rgba(34,197,94,0.05)]">
                                            <h4 className="text-sm font-bold text-gray-200 mb-2 flex items-center gap-2">
                                                <TrendingDown size={14} className="text-green-400" /> {f.name} (Stable Factor)
                                            </h4>
                                            <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                                This component is holding the user within acceptable retention thresholds.
                                            </p>
                                            <div className="bg-green-500/10 rounded border border-green-500/20 p-2 text-[11px] font-mono text-green-200">
                                                <span className="text-green-400 font-bold block mb-1">LEVERAGE PROTOCOL:</span>
                                                Reinforce value here. Highlight features related to this parameter in standard communications to cement product fit.
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Parameter Dictionary */}
                            <div>
                                <h3 className="text-[11px] font-mono tracking-widest text-white uppercase mb-4 flex items-center gap-2">
                                    <Zap size={14} style={{ color: config.primaryColor }} /> Core Parameters Dictionary
                                </h3>
                                <div className="space-y-4">
                                    {config.sections.map((sec, si) => (
                                        <div key={si} className="border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden bg-[#0A0A0F]">
                                            <div className="bg-[rgba(255,255,255,0.02)] px-4 py-3 border-b border-[rgba(255,255,255,0.02)] text-[11px] font-mono tracking-wider text-gray-300 flex items-center gap-2">
                                                {sec.icon} {sec.title}
                                            </div>
                                            <div className="divide-y divide-[rgba(255,255,255,0.02)]">
                                                {sec.fields.map(f => (
                                                    <div key={f.key} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 items-start hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                                                        <div className="text-[11px] font-mono text-[var(--color-neon-blue)] font-bold">{(f as any).label || f.key.toUpperCase()}</div>
                                                        <div className="md:col-span-2 text-xs text-gray-400 leading-relaxed">
                                                            <span className="text-gray-300 block mb-1">Description:</span> Evaluates real-time signals associated with the user's {((f as any).label || f.key).toLowerCase()}. Variations in this metric carry substantial weight in predicting lifetime value shifts within the {config.domain} sector. Optimizing this generally lifts retention.
                                                            <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-2 flex-wrap">
                                                                <span className="px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800/50">Type: {f.type}</span>
                                                                <span className="px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800/50">Default: {f.default?.toString()}</span>
                                                                {f.type === 'slider' && <span className="px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800/50">Range: {(f as any).min} to {(f as any).max}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
