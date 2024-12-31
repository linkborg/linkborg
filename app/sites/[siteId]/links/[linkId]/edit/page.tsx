import { Metadata } from "next";
import AuthLayout from "@/app/auth-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GetLinkById } from "@/lib/queries/links";
import { LinkForm } from "@/components/links/link-form";

export const metadata: Metadata = {
    title: `Edit Link - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    description: 'Edit your link',
}

export default async function Page({ 
    params 
}: { 
    params: { siteId: string, linkId: string } 
}) {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect("/login");
    }

    const link = await GetLinkById(params.linkId, params.siteId);
    if (!link) {
        redirect(`/sites/${params.siteId}/links`);
    }

    return (
        <AuthLayout>
            <h1 className="text-lg font-semibold md:text-2xl mb-4">Edit Link</h1>
            <LinkForm 
                mode="edit"
                initialData={link}
                activeSite={{ id: params.siteId, subdomain: link.siteId }}
            />
        </AuthLayout>
    );
} 