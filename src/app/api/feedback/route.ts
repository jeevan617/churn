import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import db from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'crazy-super-secret-key-for-churn-dashboard';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. You must be logged in to submit feedback.' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { message } = await request.json();
    const employee_name = decoded.name || 'Anonymous';

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const stmt = db.prepare('INSERT INTO feedbacks (employee_name, message) VALUES (?, ?)');
    const info = stmt.run(employee_name, message);

    if (info.changes > 0) {
      return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.email !== 'ceo@churn.ai') {
      return NextResponse.json({ error: 'Forbidden. CEO access required.' }, { status: 403 });
    }

    const stmt = db.prepare('SELECT id, employee_name, message, created_at FROM feedbacks ORDER BY created_at DESC');
    const feedbacks = stmt.all();

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
