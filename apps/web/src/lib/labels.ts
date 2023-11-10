import { getServerAuthSession } from "@whl/auth";
import { prisma } from "@whl/db";

export const getLabels = async () => {
  const session = await getServerAuthSession();
  if (session === null) {
    return [];
  }
  return await prisma.label.findMany({
    where: {
      userId: session.user.id,
    },
  });
};
