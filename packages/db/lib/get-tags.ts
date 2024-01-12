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
) => {
  return await prisma.tag.findMany({
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
    include: {
      _count: {
        select: {
          HighlightOnTag: true,
        },
      },
    },
  });
};
