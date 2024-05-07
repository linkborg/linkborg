import { NextResponse, NextRequest } from 'next/server'
import {GetSiteByIdPublic} from "@/lib/queries/sites";

export async function GET(req: NextRequest, { params }: { params: { siteId: string } }) {
	const siteId = params.siteId;
	const site = await GetSiteByIdPublic(siteId)
	return NextResponse.json(site)
}