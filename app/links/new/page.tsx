import {Metadata} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {GetSitesList} from "@/lib/queries/sites";
import { LinksSiteSelector } from "@/app/links/new/links-site-selector";
import AuthLayout from "@/app/auth-layout";

export const metadata: Metadata = {
	title: `Links - ${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
	description: 'The ultimate link shortener platform',
}

export default async function Page() {
	
	const session = await getServerSession(authOptions);
	const user = session?.user
	if(!user){
		redirect("/login")
	}
	
	const sites = await GetSitesList(user);
	
	return (
		<AuthLayout>
			<LinksSiteSelector sites={sites} />
		</AuthLayout>
	)
}
