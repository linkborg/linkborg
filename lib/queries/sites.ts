import prisma from "@/lib/prisma";
import {Session} from "next-auth";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export const GetSitesList = async () => {
    const { user } = await getServerSession(authOptions) as Session;
    
    return prisma.site.findMany({
        where: {
            userId: user?.id || "",
        }
    });
}