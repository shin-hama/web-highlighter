import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { HighlightWithLabelAndPage } from "@whl/common-types";
import { CreateHighlightRequestSchema } from "@whl/common-types";
import { prisma } from "@whl/db";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const result: HighlightWithLabelAndPage[] = await prisma.highlight.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      label: true,
      page: true,
    },
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const { page, highlight } = CreateHighlightRequestSchema.parse(
    await req.json(),
  );

  const result = await prisma.highlight.create({
    data: {
      content: highlight.content,
      page: {
        connectOrCreate: {
          where: {
            url: page.url,
          },
          create: {
            title: page.title,
            url: page.url,
          },
        },
      },
      label: {
        connect: {
          id: highlight.labelId,
        },
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return NextResponse.json(result);
}
