import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { predict, Domain } from '@/lib/churnModels';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'crazy-super-secret-key-for-churn-dashboard';

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let userId = null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId;
    } catch {}

    try {
        const { domain, ...input } = await req.json();
        const result = predict(domain as Domain, input);

        if (userId) {
            db.prepare('INSERT INTO predictions (user_id, domain, score, risk_level) VALUES (?, ?, ?, ?)').run(
                userId, domain, result.score, result.riskLevel
            );
        }

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error("Prediction error:", error);
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}
