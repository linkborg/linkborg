import prisma from "@/lib/prisma";

export const GetSlugById = async (slugId: string) => {
	return prisma.slug.findFirst({
		where: {
			id: slugId || "a"
		}
	})
}

// export const GetSlugsList = async (user: User) => {
// 	return prisma.slug.findMany({
// 		where: {
// 			userId: user?.id || "",
// 		}
// 	});
// }