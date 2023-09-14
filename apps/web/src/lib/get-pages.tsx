import type { Highlight } from "@whl/db";
import { prisma } from "@whl/db";

import { env } from "~/env.mjs";

const devColors = ["red", "orange", "yellow", "green", "blue"];
const devPages = Array.from(Array(10)).map((_, p_index) => ({
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
}));

export const getPages = async (userId: string, cursor?: string) => {
  try {
    const result = await prisma.page.findMany({
      where: {
        highlights: {
          every: {
            userId,
          },
        },
      },
      include: {
        highlights: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      skip: cursor ? 1 : 0,
      cursor: {
        id: cursor,
      },
    });
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
