import { getServerAuthSession } from "@whl/auth";
import { prisma } from "@whl/db";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  // tag の一覧と、タグに紐づく記事の数を返す
  const result = await prisma.tag.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: {
          HighlightOnTag: true,
        },
      },
    },
  });

  return Response.json(result);
}
