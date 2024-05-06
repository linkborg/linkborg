import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {NewSiteForm} from "@/app/sites/new/new-site-form";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export const metadata: Metadata = {
    title: 'New Site - linkb.org',
    description: 'The ultimate link shortener platform',
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(!user){
        redirect("/login")
    }
    
    return (
        <AuthLayout>
            <NewSiteForm />
        </AuthLayout>
    )
}
