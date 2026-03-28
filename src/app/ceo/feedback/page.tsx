'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LayoutDashboard, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Feedback {
  id: number;
  employee_name: string;
  message: string;
  created_at: string;
}

export default function CEOFeedbackView() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAuthAndFetch() {
      try {
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();

        if (!authData.authenticated) {
          router.push('/login');
          return;
        }

        if (authData.user.email !== 'ceo@churn.ai') {
          setError('FORBIDDEN: Only the CEO can view this executive inbox.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/feedback');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        setError('Failed to load employee feedback.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndFetch();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-32 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Executive Inbox</h1>
            <p className="text-white/50 text-lg font-light">
              Direct insights and feedback from your team.
            </p>
          </div>
          <Link href="/dashboard" className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-light border border-white/10 backdrop-blur-xl transition-all flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-400 font-mono border border-red-400/20 bg-red-400/10 p-6 rounded-2xl relative text-center">
            <p className="text-2xl">{error}</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl">
            <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-light text-white mb-2">No feedback yet</h3>
            <p className="text-white/50 font-light">Your inbox is empty. Check back later.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {feedbacks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-xl hover:bg-white/10 transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                
                <div className="flex justify-between items-start gap-6 relative z-10">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-2">{item.employee_name}</h3>
                    <p className="text-white/70 font-light text-lg whitespace-pre-wrap leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-sm font-light whitespace-nowrap bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    <Clock className="w-4 h-4" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
