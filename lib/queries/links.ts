import prisma from "@/lib/prisma";
import {LinkCreateRequest} from "@/types/links";

export const GetLinkBySlugPublic = async (linkSlug: string, siteId: string) => {
	return prisma.link.findUnique({
		where: {
			linkslug_site_constraint: {
				slug: linkSlug,
				siteId: siteId
			}
		},
		select: {
			title: true,
			description: true,
			image: true,
		}
	})
}

export const GetLinkBySlug = async (siteId: string, linkSlug: string) => {
	return prisma.link.findUnique({
		where: {
			linkslug_site_constraint: {
				slug: linkSlug,
				siteId: siteId
			}
		}
	})
}

export const GetLinksListBySite = async (siteId: string) => {
	return prisma.link.findMany({
		where: {
			siteId: siteId
		}
	});
}

export const CreateLink = async (data: LinkCreateRequest) => {
	return prisma.link.create({
		data: {
			title: data.title,
			siteId: data.siteId,
			slug: data.slug,
		}
	})
}