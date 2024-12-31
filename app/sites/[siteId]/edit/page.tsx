import { Metadata } from "next";
import AuthLayout from "@/app/auth-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GetSiteById } from "@/lib/queries/sites";
import { EditSiteForm } from "./edit-site-form";

export const metadata: Metadata = {
    title: `Edit Site - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'Edit your site settings',
}

export default async function Page({ 
    params 
}: { 
    params: { siteId: string } 
}) {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect("/login");
    }

    const site = await GetSiteById(user, params.siteId);
    if (!site) {
        redirect("/sites");
    }

    return (
        <AuthLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Edit Site Settings</h1>
            </div>
            <EditSiteForm site={site} />
        </AuthLayout>
    );
} 