import {Dashboard} from "@/app/dashboard/dashboard";
import AuthLayout from "@/app/auth-layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {Metadata} from "next";

import {redirect} from "next/navigation";
import {GetSitesList} from "@/lib/queries/sites";

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
    
    const sites = await GetSitesList(user)
    
    return (
        <AuthLayout>
            <Dashboard initData={sites} />
        </AuthLayout>
    );
}
