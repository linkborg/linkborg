import { NextResponse, NextRequest } from 'next/server'
import {GetSiteByIdPublic} from "@/lib/queries/sites";

export async function GET(req: NextRequest, { params }: { params: { siteId: string } }) {
	const siteId = params.siteId;
	const site = await GetSiteByIdPublic(siteId)
	if(!site){
		return NextResponse.json({ error: 'Site not found' }, {status: 404});
	}
	if(!site.image){
		site.image = "https://linkborgcdn.xpri.dev/cover/cc806756-06f6-424d-ab9c-8d484682f247.jpeg";
	}
	if(!site.logo){
		site.logo = "https://linkborgcdn.xpri.dev/linkborg/favicon.png";
	}
	return NextResponse.json(site)
}