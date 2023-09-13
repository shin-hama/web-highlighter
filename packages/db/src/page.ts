import type { Prisma } from "@prisma/client";

import { prisma } from ".";

export const createPage = async (data: Prisma.PageCreateInput) => {
  return await prisma.page.upsert({
    where: {
      url: data.url,
    },
    update: {
      ...data,
    },
    create: {
      ...data,
    },
  });
};
