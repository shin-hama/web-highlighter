import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type {
  GetHighlightsResponse,
  HighlightWithLabelAndPageAndTag,
} from "@whl/common-types";
import { CursorPaginationRequestSchema } from "@whl/common-types/api/common";
import { prisma } from "@whl/db";

export async function GET(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const { searchParams } = new URL(req.url);
  const { cursor, limit } = CursorPaginationRequestSchema.parse(
    Object.fromEntries(searchParams),
  );

  const takeCount = limit + 1;

  const highlights: HighlightWithLabelAndPageAndTag[] =
    await prisma.highlight.findMany({
      where: {
        userId: session.user.id,
        deleted: true,
      },
      take: takeCount,
      orderBy: {
        createdAt: "desc",
      },
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      include: {
        label: true,
        page: true,
        HighlightOnTag: {
          include: {
            tag: true,
          },
        },
      },
    });

  return NextResponse.json<GetHighlightsResponse>({
    highlights: highlights.slice(0, limit),
    nextCursor:
      highlights.length === takeCount ? highlights[takeCount - 1]!.id : null,
  });
}
