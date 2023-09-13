import type { Prisma } from "@prisma/client";

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

export const createHighlight = async (data: Prisma.HighlightCreateInput) => {
  return await prisma.highlight.create({
    data,
  });
};
