import React from "react";
import {Metadata} from "next";
import Login from "@/app/login/login";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/auth";

export const metadata: Metadata = {
    title: `Login - ${process.env.SITE_DOMAIN}`,
    description: 'Ultimate link sharing platform',
}

export default async function Page() {
    const session = await getServerSession(authOptions)
    
    if(session?.user){
        redirect("/")
    }
    
    return (
        <Login />
    )
}
