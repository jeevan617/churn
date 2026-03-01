import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        stmt.run(name, email, hashedPassword);

        return NextResponse.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
