import prisma from "@/lib/prisma";

export const GetSlugById = async (slugId: string) => {
	const result = await prisma.site.findFirst({
		where: {
			id: slugId || "a"
		}
	})
	return result;
}