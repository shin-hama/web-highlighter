import { prisma } from ".";

export const findHighlightsByUserAndPage = async ({
  userId,
  pageId,
}: {
  userId: string;
  pageId: string;
}) => {
  return await prisma.highlight.findMany({
    where: {
      userId,
      pageId,
    },
  });
};
