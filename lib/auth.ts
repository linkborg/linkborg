import type { NextAuthOptions } from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import {Adapter} from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import sendVerificationRequest from '@/lib/send-auth-mail'


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
    },
    providers: [
        EmailProvider({
            sendVerificationRequest,
        })
    ],
    callbacks: {
        async session ({ session, user }) {
            session.user = await prisma.user.findUniqueOrThrow({
                where: {
                    email: session.user.email || ""
                }
            })
            return Promise.resolve(session);
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login',
        newUser: '/login'
    }
};