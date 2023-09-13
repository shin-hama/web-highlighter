import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import { CreateHighlightRequestSchema } from "@whl/common-types";
import { createHighlight } from "@whl/db";

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

  const result = await createHighlight({
    content: highlight.content,
    color: highlight.color,
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
    user: {
      connect: {
        id: session.user.id,
      },
    },
  });

  return NextResponse.json(result);
}
