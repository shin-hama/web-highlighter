import type { PageOnUserWithPageWithHighlightsWithLabel as PageOnUserWithPageWithHighlightsWithLabelAndTag } from "@whl/common-types";
import { prisma } from "@whl/db";

/**
 *
 * @param userId
 * @param cursor ページネーション用のカーソル。PageOnUser の id を指定すると、その Record から取得する。
 * @returns
 */
export const getPages = async ({
  userId,
  cursor,
  filter,
}: {
  userId: string;
  cursor?: string;
  filter?: {
    labels?: string[];
  };
}): Promise<PageOnUserWithPageWithHighlightsWithLabelAndTag[]> => {
  try {
    const result = await prisma.pageOnUser.findMany({
      where: {
        AND: {
          userId,
          page: {
            highlights: {
              some: {
                labelId: {
                  in: filter?.labels,
                },
              },
            },
          },
        },
      },
      include: {
        page: {
          include: {
            highlights: {
              include: {
                label: true,
                HighlightOnTag: {
                  include: {
                    tag: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });

    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
