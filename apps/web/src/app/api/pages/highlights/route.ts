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
  const { cursor, filter } = GetHighlightsGroupByPageQuerySchema.parse(
    Object.fromEntries(searchParams),
  );

  // tag の一覧と、タグに紐づく記事の数を返す
  try {
    const result = await prisma.pageOnUser.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        page: {
          include: {
            highlights: {
              where: {
                labelId: {
                  in: filter?.labels,
                },
              },
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
