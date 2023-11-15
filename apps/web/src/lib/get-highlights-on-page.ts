import { prisma } from "@whl/db";

export function getHighlightsOnAPage(pageId: string) {
  return prisma.highlight.findMany({
    where: {
      pageId,
    },
    include: {
      label: true,
      position: true,
      HighlightOnTag: {
        include: {
          tag: true,
        },
      },
    },
  });
}
