import {Dashboard} from "@/app/dashboard/dashboard";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {Metadata} from "next";

import {redirect} from "next/navigation";
import {GetSitesList} from "@/lib/queries/sites";
import { GetAllLinksOfUser } from "@/lib/queries/links";
import { getTopSites } from "@/lib/queries/stats";
import { getTopLinks } from "@/lib/queries/stats";
import { getUserStats } from "@/lib/queries/stats";

export const metadata: Metadata = {
    title: `Dashboard - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'The ultimate link sharing platform',
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    
    if(!user){
        redirect("/login")
    }

    const stats = await getUserStats(user.id);
    const popularLinks = await getTopLinks(user.id);
    const popularSites = await getTopSites(user.id);
        
    return (
        <AuthLayout>
            <Dashboard stats={stats} popularLinks={popularLinks} popularSites={popularSites} />
        </AuthLayout>
    );
}
