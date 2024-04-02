import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const req_data = await req.json();
    
    return NextResponse.json({
        "message": "ok"
    }, {status: 200})
}