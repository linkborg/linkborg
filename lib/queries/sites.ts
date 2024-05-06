import prisma from "@/lib/prisma";
import {User} from "next-auth";

export const GetSiteById = async ({user, siteId}: {user: User, siteId: string}) => {
    return prisma.site.findUniqueOrThrow({
        where: {
            id: siteId,
            userId: user.id,
        }
    })
}

export const GetSitesList = async (user: User) => {
    return prisma.site.findMany({
        where: {
            userId: user?.id || "",
        }
    });
}