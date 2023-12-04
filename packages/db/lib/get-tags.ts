/**
 * ユーザーが定義したタグをすべて取得する
 */

import { prisma } from "../";

export const getTags = async (
  userId: string,
  filter?: { labels?: string[] },
) => {
  return await prisma.tag.findMany({
    where: {
      userId: {
        equals: userId,
      },
      HighlightOnTag: {
        some: {
          highlight: {
            labelId: {
              in: filter?.labels,
            },
          },
        },
      },
    },
    include: {
      _count: {
        select: {
          HighlightOnTag: true,
        },
      },
    },
  });
};
