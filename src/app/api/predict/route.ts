import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { predict, Domain } from '@/lib/churnModels';

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    if (!cookieStore.get('token')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const { domain, ...input } = await req.json();
        const result = predict(domain as Domain, input);
        return NextResponse.json({ success: true, ...result });
    } catch {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}
