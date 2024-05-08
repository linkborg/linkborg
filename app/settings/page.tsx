import React from "react";
import {Metadata} from "next";
import {Settings} from "@/app/settings/settings";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: `Settings - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'The ultimate link shortener platform',
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
