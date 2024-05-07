import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {GetSitesList} from "@/lib/queries/sites";
import {Sites} from "@/app/sites/sites";

export const metadata: Metadata = {
    title: 'Sites - Vectorize.sh',
    description: 'Effortlessly turn your documents into searchable vectors with a single command.',
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
