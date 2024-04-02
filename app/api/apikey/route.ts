import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    
    if (session?.user) {
        const api_key = uuidv4();
        
        const key = await prisma.apiKey.findFirst({
            where: {
                userId: session?.user?.id,
                revoked: false
            }
        })
        
        if (key) {
            const res = await prisma.apiKey.update({
                where: {
                    id: key.id,
                    userId: session?.user?.id
                },
                data: {
                    revoked: true
                }
            });
        }

        const apiKey = await prisma.apiKey.create({
            data: {
                key: api_key,
                userId: session?.user?.id
            }
        });
        
        return NextResponse.json(apiKey , { status: 201 })
    } else {
        return NextResponse.json({ error: 'Cannot generate API Key' }, { status: 412 })
    }
}