import React from "react";
import {Metadata} from "next";
import {Settings} from "@/app/settings/settings";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: 'Settings - Vectorize.sh',
    description: 'Effortlessly turn your documents into searchable vectors with a single command.',
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(!user){
        redirect("/login")
    }
    
    const keys = await prisma.apiKey.findFirst({
        where: {
            userId: user?.id,
            revoked: false
        }
    })
    
    return (
        <AuthLayout>
            <Settings initData={keys} />
        </AuthLayout>
    )
}
