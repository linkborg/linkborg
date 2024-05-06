import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {GetSiteById} from "@/lib/queries/sites";
import {User} from "next-auth";

export async function GET(req: NextRequest, { params }: { params: { siteId: string } }) {
	const siteId = params.siteId;
	const session = await getServerSession(authOptions);
	const user = session?.user as User;
	const site = await GetSiteById(user, siteId)
	return NextResponse.json(site)
}