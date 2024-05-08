import { NextResponse, NextRequest } from 'next/server'
import {GetLinkBySlugPublic} from "@/lib/queries/links";

export async function GET(req: NextRequest, { params }: { params: { siteId: string, linkSlug: string; } }) {
	const siteId = params.siteId;
	const linkSlug = params.linkSlug;
	const link = await GetLinkBySlugPublic(linkSlug, siteId)
	if(!link){
		return NextResponse.json({ error: 'Link not found' }, {status: 404});
	}
	return NextResponse.json(link)
}