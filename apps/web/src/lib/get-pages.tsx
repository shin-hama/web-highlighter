import { DEFAULT_COLORS } from "@whl/common-types";
import type { PageOnUserWithPageWithHighlightsWithLabel } from "@whl/common-types";
import type { Label } from "@whl/db";
import { prisma } from "@whl/db";

import { env } from "~/env.mjs";

const devLabels: Label[] = DEFAULT_COLORS.map((color, i) => {
  return {
    id: `${i}`,
    name: null,
    color,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
const devPages = Array.from(Array(10)).map(
  (_, p_index): PageOnUserWithPageWithHighlightsWithLabel => ({
    id: `${p_index}`,
    pageId: `${p_index}`,
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    page: {
      id: `${p_index}`,
      title: `Test ${p_index}`,
      url: `https://example.com/${p_index}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      highlights: Array.from(Array(Math.floor(Math.random() * 10))).map(
        (_, h_index) => {
          const labelId = Math.floor(Math.random() * devLabels.length);
          return {
            id: `${p_index}-${h_index}`,
            content: `Test ${p_index}-${h_index}`,
            pageId: `${p_index}`,
            userId: "1",
            labelId: labelId.toString(),
            label: devLabels[labelId]!,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        },
      ),
    },
  }),
);

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
}): Promise<PageOnUserWithPageWithHighlightsWithLabel[]> => {
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
    if (env.NODE_ENV === "development" && result.length === 0) {
      return devPages;
    }
    return result;
  } catch (e) {
    console.error(e);
    if (env.NODE_ENV !== "development") {
      throw e;
    } else {
      return devPages;
    }
  }
};
