import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {CreateLink} from "@/lib/queries/links";
import {User} from "next-auth";
import {GetSiteById} from "@/lib/queries/sites";


export async function POST(req: NextRequest, { params }: { params: { siteId: string } }) {
	const siteId = params.siteId;
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	const data = await req.json();
	
	const site = await GetSiteById(user, siteId)
	
	if (site){
		console.log("received payload: ", data)
		const new_link = await CreateLink({
			title: data.title,
			longurl: data.longurl,
			slug: data.slug,
			siteId: site.id,
		});
		return NextResponse.json(site)
	}

}