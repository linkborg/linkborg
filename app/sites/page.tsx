import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {GetSitesList} from "@/lib/queries/sites";
import {Sites} from "@/app/sites/sites";

export const metadata: Metadata = {
    title: `Sites - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'The ultimate link shortener platform',
}

export default async function Page() {
    
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(!user){
        redirect("/login")
    }
    
    const sites = await GetSitesList(user)
    
    return (
        <AuthLayout>
            <Sites initData={sites} />
        </AuthLayout>
    )
}
