import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {LinkForm} from "@/components/links/link-form";
import {GetSitesList} from "@/lib/queries/sites";

export const metadata: Metadata = {
	title: `New Link - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
	description: 'The ultimate link shortener platform',
}

export default async function Page({params} : {params: {siteId: string}}) {
	const siteId = params.siteId;
	
	const session = await getServerSession(authOptions);
	const user = session?.user
	if(!user){
		redirect("/login")
	}
	
	const sites = await GetSitesList(user);
	
	const activeSite = sites.find((site) => site.id === siteId);
	
	if (!activeSite) {
		redirect("/sites")
	}
	
	return (
		<AuthLayout>
			<h1 className="text-lg font-semibold md:text-2xl mb-4">Create Link</h1>
			<LinkForm 
				mode="create"
				activeSite={activeSite}
				suffix="/new"
			/>
		</AuthLayout>
	)
}
