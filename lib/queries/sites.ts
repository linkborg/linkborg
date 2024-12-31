import prisma from "@/lib/prisma";
import {User} from "next-auth";
import {SiteCreateRequest, SiteUpdateRequest, SiteDeleteRequest} from "@/types/sites";



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

// Get multiple sites by IDs
export const GetSitesByIds = async (siteIds: string[]) => {
    return prisma.site.findMany({
        where: {
            id: { in: siteIds }
        },
        include: {
            links: true
        }
    })
}

// Update single site
export const UpdateSite = async (data: SiteUpdateRequest) => {
    return prisma.site.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            description: data.description,
            logo: data.logo,
            image: data.image,
            subdomain: data.subdomain,
            analytics_code: data.analytics_code,
            theme: data.theme,
            layout: data.layout
        }
    })
}

// Update multiple sites
export const UpdateManySites = async (data: SiteUpdateRequest[]) => {
    const updates = data.map(site => 
        prisma.site.update({
            where: { id: site.id },
            data: {
                name: site.name,
                description: site.description,
                logo: site.logo,
                image: site.image,
                subdomain: site.subdomain,
                analytics_code: site.analytics_code,
                theme: site.theme,
                layout: site.layout
            }
        })
    )
    return prisma.$transaction(updates)
}

// Delete single site
export const DeleteSite = async (data: SiteDeleteRequest) => {
    return prisma.site.delete({
        where: {
            id: data.id,
            ...(data.userId && { userId: data.userId })
        }
    })
}

// Delete multiple sites
export const DeleteManySites = async (ids: string[], userId?: string) => {
    return prisma.site.deleteMany({
        where: {
            id: { in: ids },
            ...(userId && { userId })
        }
    })
}