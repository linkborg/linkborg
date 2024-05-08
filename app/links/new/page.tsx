import React from "react";
import {Metadata} from "next";
import AuthLayout from "@/app/auth-layout";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {NewLinkForm} from "@/app/links/new/new-link-form";

export const metadata: Metadata = {
	title: `New Link - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
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
			<NewLinkForm />
		</AuthLayout>
	)
}
