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
	
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const data = await req.json();
		const site = await GetSiteById(user, siteId);
		
		if (!site) {
			return NextResponse.json({ error: "Site not found or unauthorized" }, { status: 404 });
		}

		// Validate required fields
		if (!data.title || !data.longurl || !data.slug) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		const new_link = await CreateLink({
			title: data.title,
			description: data.description,
			longurl: data.longurl,
			slug: data.slug,
			siteId: site.id,
		});

		return NextResponse.json(new_link);
	} catch (error) {
		console.error("Error creating link:", error);
		return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
	}
}