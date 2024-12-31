import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {GetSiteById, UpdateSite, DeleteSite} from "@/lib/queries/sites";
import {User} from "next-auth";

export async function GET(req: NextRequest, { params }: { params: { siteId: string } }) {
	const siteId = params.siteId;
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	const site = await GetSiteById(user, siteId)
	return NextResponse.json(site)
}

export async function PATCH(req: NextRequest, { params }: { params: { siteId: string } }) {
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const data = await req.json();
		const site = await UpdateSite({
			id: params.siteId,
			...data
		});
		return NextResponse.json(site);
	} catch (error) {
		console.error("Error updating site:", error);
		return NextResponse.json({ error: "Failed to update site" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { siteId: string } }) {
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await DeleteSite({
			id: params.siteId,
			userId: user.id
		});
		return NextResponse.json({ status: "ok" });
	} catch (error) {
		console.error("Error deleting site:", error);
		return NextResponse.json({ error: "Failed to delete site" }, { status: 500 });
	}
}