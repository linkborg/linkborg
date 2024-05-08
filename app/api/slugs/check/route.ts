import { NextResponse, NextRequest } from 'next/server'
import {GetSlugById} from "@/lib/queries/slugs";
import {GetLinkBySlug} from "@/lib/queries/links";


export async function POST(req: NextRequest) {
	const req_data = await req.json();
	
	let slugExist;
	
	if(req_data.slugId && req_data.subdomain) {
		slugExist = await GetLinkBySlug(req_data.subdomain, req_data.slugId);
	} else if (req_data.slug) {
		slugExist = await GetSlugById(req_data.slugId);
	}
	
	if(slugExist){
		return NextResponse.json({"status": "exists"}, {status:400})
	} else {
		return NextResponse.json({"status": "ok"}, {status:200})
	}
}
