import { prisma } from "@whl/db";

export const getLabels = async (userId: string) => {
  return await prisma.label.findMany({
    where: {
      userId: userId,
    },
  });
};
