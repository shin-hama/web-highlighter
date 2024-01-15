/**
 * ユーザーが定義したタグをすべて取得する
 */

import { prisma } from "../";

export const getTags = async (
  userId: string,
  filter?: {
    /**
     * タグがハイライトに紐づいているかどうか
     */
    hasHighlights?: boolean;
  },
  cursor?: string,
  limit = 10,
) => {
  const takeCount = limit + 1;
  const tags = await prisma.tag.findMany({
    where: {
      userId: {
        equals: userId,
      },
      NOT: {
        HighlightOnTag: filter?.hasHighlights
          ? {
              none: {},
            }
          : undefined,
      },
    },
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    take: takeCount,
    include: {
      _count: {
        select: {
          HighlightOnTag: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return {
    tags: tags.slice(0, limit),
    nextCursor: tags.length === takeCount ? tags[takeCount - 1]!.id : null,
  };
};
