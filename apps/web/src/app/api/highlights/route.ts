import crypto from "crypto";
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

  const { page, highlight, tags } = CreateHighlightRequestSchema.parse(
    await req.json(),
  );

  // pageOnUser.updatedAt を更新したいので個別に upsert している
  const data = await prisma.pageOnUser.upsert({
    where: {
      userId_pageId: {
        userId: session.user.id,
        // URL に含まれる文字の影響をなくすためにハッシュ化する
        pageId: crypto.createHash("MD5").update(page.url).digest("hex"),
      },
    },
    update: {
      userId: session.user.id, // To update updatedAt, any field is required
    },
    create: {
      user: {
        connect: {
          id: session.user.id,
        },
      },
      page: {
        create: {
          id: crypto.createHash("MD5").update(page.url).digest("hex"),
          title: page.title,
          url: page.url,
        },
      },
    },
  });

  const result = await prisma.highlight.create({
    data: {
      content: highlight.content,
      page: {
        connect: {
          id: data.pageId,
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
      HighlightOnTag: tags && {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: {
                name: tag.name,
              },
              create: {
                name: tag.name,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        })),
      },
    },
  });
  return NextResponse.json(result);
}
