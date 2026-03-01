import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'crazy-super-secret-key-for-churn-dashboard';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ authenticated: true, user: decoded });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
