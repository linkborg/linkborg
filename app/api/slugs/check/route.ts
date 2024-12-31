import { NextResponse, NextRequest } from 'next/server'
import { GetSlugById } from "@/lib/queries/slugs";
import { GetLinkBySlug } from "@/lib/queries/links";
import { disallowSubdomains } from '@/lib/disallow-subdomains';

export async function POST(req: NextRequest) {
	try {
		const req_data = await req.json();
		let slugExist = false;

		if (!req_data.slug && !req_data.subdomain) {
			return NextResponse.json({ error: "Missing slug or subdomain" }, { status: 400 });
		}

		if (req_data.slug) {
			req_data.slug = req_data.slug.trim().toLowerCase();
		}
		if (req_data.subdomain) {
			req_data.subdomain = req_data.subdomain.trim().toLowerCase();
		}
		
		if (req_data.slug && req_data.subdomain) {
			slugExist = await GetLinkBySlug(req_data.subdomain, req_data.slug) !== null;
		} else if (req_data.slug) {
			slugExist = disallowSubdomains.includes(req_data.slug) || 
					   (await GetSlugById(req_data.slug)) !== null;
		}
		
		return NextResponse.json({
			status: slugExist ? "exists" : "ok"
		}, { status: 200 });
	} catch (error) {
		console.error("Error checking slug:", error);
		return NextResponse.json({ error: "Failed to check slug" }, { status: 500 });
	}
}
