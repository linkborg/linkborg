import prisma from '@/lib/prisma';

export async function getUserStats(userId: string) {
  const stats = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      sites: {
        select: {
          id: true,
          name: true,
          views: true,
          links: {
            select: {
              visits: true,
            },
          },
          blocks: {
            select: {
              visits: true,
            },
          },
        },
      },
    },
  });

  if (!stats) {
    return null;
  }

  // Calculate total stats
  const totalSites = stats.sites.length;
  const totalLinks = stats.sites.reduce(
    (acc, site) => acc + site.links.length,
    0
  );
  const totalLinkClicks = stats.sites.reduce(
    (acc, site) => acc + site.links.reduce((sum, link) => sum + link.visits, 0),
    0
  );
  const totalBlockViews = stats.sites.reduce(
    (acc, site) => acc + site.blocks.reduce((sum, block) => sum + block.visits, 0),
    0
  );
  const totalSiteViews = stats.sites.reduce(
    (acc, site) => acc + site.views,
    0
  );

  return {
    totalSites,
    totalLinks,
    totalLinkClicks,
    totalBlockViews,
    totalSiteViews,
  };
}

export async function getTopLinks(userId: string, limit = 5) {
  const topLinks = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      links: {
        where: {
          hidden: false,
        },
        orderBy: {
          visits: 'desc',
        },
        take: limit,
        select: {
          title: true,
          visits: true,
          slug: true,
        },
      },
    },
  });

  return topLinks;
}

export async function getTopSites(userId: string, limit = 5) {
  const topSites = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      views: 'desc',
    },
    take: limit,
    select: {
      name: true,
      views: true,
      subdomain: true,
    },
  });

  return topSites;
}
