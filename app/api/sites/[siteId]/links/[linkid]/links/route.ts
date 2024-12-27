import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DeleteLink, UpdateLink } from "@/lib/queries/links";
import { User } from "next-auth";
import { GetSiteById } from "@/lib/queries/sites";

// DELETE handler
export async function DELETE(req: NextRequest, { params }: { params: { siteId: string, linkId: string } }) {
    const { siteId, linkId } = params;
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    const site = await GetSiteById(user, siteId);

    if (site) {
        await DeleteLink(linkId, site.id);
        return NextResponse.json({ message: "Link deleted successfully" });
    } else {
        return NextResponse.json({ error: "Site not found or unauthorized" }, { status: 404 });
    }
}

// PATCH handler
export async function PATCH(req: NextRequest, { params }: { params: { siteId: string, linkId: string } }) {
    const { siteId, linkId } = params;
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    const data = await req.json();

    const site = await GetSiteById(user, siteId);

    if (site) {
        const updatedLink = await UpdateLink({
            id: linkId,
            title: data.title,
            longurl: data.longurl,
            slug: data.slug,
            siteId: site.id,
        });
        return NextResponse.json(updatedLink);
    } else {
        return NextResponse.json({ error: "Site not found or unauthorized" }, { status: 404 });
    }
}