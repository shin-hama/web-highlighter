/**
 * ユーザーが定義したタグをすべて取得する
 */

import type { Tag } from "../";
import { prisma } from "../";

export const getTags = async (
  userId: string,
  filter?: {
    /**
     * タグがハイライトに紐づいているかどうか
     */
    hasHighlights?: boolean;
    /**
     * タグ名でフィルタリングする
     */
    name?: string;
  },
  cursor?: string,
  limit = 10,
  orderBy: keyof Tag = "name",
) => {
  const takeCount = limit + 1;
  const tags = await prisma.tag.findMany({
    where: {
      userId: {
        equals: userId,
      },
      name: filter?.name
        ? {
            contains: filter.name,
          }
        : undefined,
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
      [orderBy]: orderBy === "updatedAt" ? "desc" : "asc",
    },
  });

  return {
    tags: tags.slice(0, limit),
    nextCursor: tags.length === takeCount ? tags[takeCount - 1]!.id : null,
  };
};
