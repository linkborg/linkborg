import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UpdateLink, DeleteLink, GetLinkById } from "@/lib/queries/links";
import { User } from "next-auth";
import { GetSiteById } from "@/lib/queries/sites";

export async function GET(
    req: NextRequest,
    { params }: { params: { siteId: string, linkId: string } }
) {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await GetLinkById(params.linkId, params.siteId);
    return NextResponse.json(link);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { siteId: string, linkId: string } }
) {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const site = await GetSiteById(user, params.siteId);
        if (!site) {
            return NextResponse.json({ error: "Site not found or unauthorized" }, { status: 404 });
        }

        const data = await req.json();
        const link = await UpdateLink({
            id: params.linkId,
            ...data
        });
        return NextResponse.json(link);
    } catch (error) {
        console.error("Error updating link:", error);
        return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { siteId: string, linkId: string } }
) {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const site = await GetSiteById(user, params.siteId);
        if (!site) {
            return NextResponse.json({ error: "Site not found or unauthorized" }, { status: 404 });
        }

        await DeleteLink({
            id: params.linkId,
            siteId: params.siteId
        });
        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Error deleting link:", error);
        return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
    }
}