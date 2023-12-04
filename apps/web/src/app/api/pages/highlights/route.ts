import { getServerAuthSession } from "@whl/auth";
import { GetHighlightsGroupByPageQuerySchema } from "@whl/common-types";
import type { GetHighlightsGroupByPageResponse } from "@whl/common-types";
import { prisma } from "@whl/db";

export async function GET(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const { searchParams } = new URL(req.url);
  const { cursor, labels } = GetHighlightsGroupByPageQuerySchema.parse(
    Object.fromEntries(searchParams),
  );

  // tag の一覧と、タグに紐づく記事の数を返す
  try {
    const result = await prisma.pageOnUser.findMany({
      where: {
        userId: session.user.id,
        page: {
          highlights: {
            some: {
              labelId: {
                in: labels,
              },
            },
          },
        },
      },
      include: {
        page: {
          include: {
            _count: {
              select: {
                highlights: true,
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

    return Response.json(result satisfies GetHighlightsGroupByPageResponse);
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
