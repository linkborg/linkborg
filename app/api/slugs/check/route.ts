import { NextResponse, NextRequest } from 'next/server'
import {GetSlugById} from "@/lib/queries/slugs";


export async function POST(req: NextRequest) {
	const req_data = await req.json();
	
	const slug = await GetSlugById(req_data.slugId);
	
	if(slug){
		return NextResponse.json({"status": "exists"}, {status:400})
	} else {
		return NextResponse.json({"status": "ok"}, {status:200})
	}
}
