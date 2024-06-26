import prisma from "@/lib/prisma";
import {User} from "next-auth";
import {SiteCreateRequest} from "@/types/sites";



export const GetSiteByIdPublic = async (siteId: string) => {
    return prisma.site.findUnique({
        where: {
            id: siteId,
        },
        select: {
            name: true,
            description: true,
            logo: true,
            image: true,
            analytics_code: true,
            blocks: true,
            links: true,
        }
    })
}

export const GetSiteById = async (user: User, siteId: string) => {
    return prisma.site.findUniqueOrThrow({
        where: {
            id: siteId,
            userId: user.id,
        },
        include: {
            links: true
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


export const CreateSite = async (data: SiteCreateRequest) => {
    return prisma.site.create({
        data: {
            id: data.subdomain,
            name: data.name,
            userId: data.user.id,
            subdomain: data.subdomain,
        }
    })
}