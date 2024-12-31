import prisma from "@/lib/prisma";
import {LinkCreateRequest, LinkUpdateRequest, LinkDeleteRequest} from "@/types/links";

// Get single link by ID
export const GetLinkById = async (id: string, siteId?: string) => {
	return prisma.link.findUnique({
		where: {
			id,
			...(siteId && { siteId })
		}
	})
}

// Get multiple links by IDs
export const GetLinksByIds = async (ids: string[]) => {
	return prisma.link.findMany({
		where: {
			id: { in: ids }
		}
	})
}

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
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

// Create single link
export const CreateLink = async (data: LinkCreateRequest) => {
	return prisma.link.create({
		data: {
			title: data.title,
			description: data.description,
			siteId: data.siteId,
			slug: data.slug,
			longurl: data.longurl,
		}
	})
}

// Create multiple links
export const CreateManyLinks = async (data: LinkCreateRequest[]) => {
	return prisma.link.createMany({
		data: data.map(link => ({
			title: link.title,
			description: link.description,
			siteId: link.siteId,
			slug: link.slug,
			longurl: link.longurl,
		}))
	})
}

// Update single link
export const UpdateLink = async (data: LinkUpdateRequest) => {
	const updateData: any = {}
	if (data.title !== undefined) updateData.title = data.title
	if (data.description !== undefined) updateData.description = data.description
	if (data.siteId !== undefined) updateData.siteId = data.siteId
	if (data.slug !== undefined) updateData.slug = data.slug
	if (data.longurl !== undefined) updateData.longurl = data.longurl

	return prisma.link.update({
		where: {
			id: data.id
		},
		data: updateData
	})
}

// Update multiple links
export const UpdateManyLinks = async (data: LinkUpdateRequest[]) => {
	const updates = data.map(link => 
		prisma.link.update({
			where: { id: link.id },
			data: {
				title: link.title,
				description: link.description,
				siteId: link.siteId,
				slug: link.slug,
				longurl: link.longurl,
			}
		})
	)
	return prisma.$transaction(updates)
}

// Delete single link
export const DeleteLink = async (data: LinkDeleteRequest) => {
	return prisma.link.delete({
		where: {
			id: data.id,
			...(data.siteId && { siteId: data.siteId })
		}
	})
}

// Delete multiple links
export const DeleteManyLinks = async (ids: string[]) => {
	return prisma.link.deleteMany({
		where: {
			id: { in: ids }
		}
	})
}