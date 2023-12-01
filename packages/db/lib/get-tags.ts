/**
 * ユーザーが定義したタグをすべて取得する
 */

import { prisma } from "../";

export const getTags = async (userId: string) => {
  return await prisma.tag.findMany({
    where: {
      userId: {
        equals: userId,
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
