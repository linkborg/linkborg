import prisma from "@/lib/prisma";
import {LinkCreateRequest, LinkUpdateRequest, LinkDeleteRequest} from "@/types/links";

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
			longurl: true,
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
			longurl: data.longurl,
		}
	})
}

export const UpdateLink = async (data: LinkUpdateRequest) => {
	return prisma.link.update({
		where: {
			id: data.id
		},
		data: {
			title: data.title,
			siteId: data.siteId,
			slug: data.slug,
			longurl: data.longurl,
		}
	})
}

export const DeleteLink = async (data: LinkDeleteRequest) => {
	return prisma.link.delete({
		where: {
			id: data.id
		}
	})
}