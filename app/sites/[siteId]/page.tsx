import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {SiteDetails} from "@/app/sites/[siteId]/site-details";
import {GetSiteById} from "@/lib/queries/sites";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Index Details - Vectorize.sh',
    description: 'Effortlessly turn your documents into searchable vectors with a single command.',
}

export default async function Page({params} : {params: {siteId: string}}) {
    const siteId = params.siteId;
    
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(!user){
        redirect("/login")
    }
    
    const site = await GetSiteById({siteId})
    
    return (
        <AuthLayout>
            <SiteDetails initData={site} />
        </AuthLayout>
    )
}
