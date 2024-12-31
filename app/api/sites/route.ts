import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {CreateSite, GetSitesList} from "@/lib/queries/sites";
import {User} from "next-auth";


export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const data = await req.json();
	try {
		const site = await CreateSite({
			user,
			name: data.name,
			subdomain: data.subdomain,
		});
		return NextResponse.json(site)
	} catch (error) {
		console.error("Error creating site:", error);
		return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
	}
}


export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	const sites = await GetSitesList(user);
	return NextResponse.json(sites)
}