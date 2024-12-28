import { NextResponse, NextRequest } from 'next/server'
import {GetSlugById} from "@/lib/queries/slugs";
import {GetLinkBySlug} from "@/lib/queries/links";
import { disallowSubdomains } from '@/lib/disallow-subdomains';


export async function POST(req: NextRequest) {
	const req_data = await req.json();
	let slugExist;

	if (req_data.slug) {
		req_data.slug = req_data.slug.trim().toLowerCase();
	}
	if (req_data.subdomain) {
		req_data.subdomain = req_data.subdomain.trim().toLowerCase();
	}
	
	if(req_data.slug && req_data.subdomain) {
		slugExist = await GetLinkBySlug(req_data.subdomain, req_data.slug);
	} else if (req_data.slug) {
		if (disallowSubdomains.includes(req_data.slug)) {
			slugExist = true;
		} else {
			slugExist = await GetSlugById(req_data.slug);
		}
	}
	
	if(slugExist){
		return NextResponse.json({"status": "exists"}, {status:200})
	} else {
		return NextResponse.json({"status": "ok"}, {status:200})
	}
}
