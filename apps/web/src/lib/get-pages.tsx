import type { Highlight, Page, PageOnUser } from "@whl/db";
import { prisma } from "@whl/db";

import { env } from "~/env.mjs";

const devColors = ["#FFB2B2", "#B2C3FF", "#F0FFB2", "#B2FFC8", "#FFDCB2"];
const devPages = Array.from(Array(10)).map(
  (
    _,
    p_index,
  ): PageOnUser & {
    page: Page & { highlights: Highlight[] };
  } => ({
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
        (_, h_index): Highlight => ({
          id: `${p_index}-${h_index}`,
          content: `Test ${p_index}-${h_index}`,
          color: devColors[Math.floor(Math.random() * devColors.length)]!,
          pageId: `${p_index}`,
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
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
export const getPages = async (
  userId: string,
  cursor?: string,
): Promise<
  (PageOnUser & {
    page: Page & { highlights: Highlight[] };
  })[]
> => {
  try {
    const result = await prisma.pageOnUser.findMany({
      where: {
        userId,
      },
      include: {
        page: {
          include: {
            highlights: true,
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
