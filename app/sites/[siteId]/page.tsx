import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {SiteDetails} from "@/app/sites/[siteId]/site-details";
import {GetSiteById} from "@/lib/queries/sites";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: `Site Details - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'The ultimate link shortener platform',
}

export default async function Page({params} : {params: {siteId: string}}) {
    const siteId = params.siteId;
    
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(!user){
        redirect("/login")
    }
    
    const site = await GetSiteById(user, siteId)
    
    return (
        <AuthLayout>
            <SiteDetails initData={site} />
        </AuthLayout>
    )
}
