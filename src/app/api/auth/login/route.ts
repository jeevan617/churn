import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'crazy-super-secret-key-for-churn-dashboard';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const start = performance.now();
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
