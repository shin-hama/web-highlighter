import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { SpecifiedHighlightRouteParam } from "@whl/common-types";
import {
  CreateHighlightOnTagRequestScheme,
  SpecifiedHighlightRouteParamSchema,
} from "@whl/common-types";
import { prisma } from "@whl/db";

export async function DELETE(
  req: Request,
  { params }: { params: SpecifiedHighlightRouteParam },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = SpecifiedHighlightRouteParamSchema.parse(params);

  try {
    const result = await prisma.highlight.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to delete highlight" },
      { status: 404 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: SpecifiedHighlightRouteParam },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { tag } = CreateHighlightOnTagRequestScheme.parse(await req.json());
  const { id } = SpecifiedHighlightRouteParamSchema.parse(params);

  try {
    const result = await prisma.highlight.update({
      where: {
        id,
      },
      data: {
        HighlightOnTag: {
          create: {
            tag: {
              connectOrCreate: {
                where: {
                  userId: session.user.id,
                  name: tag.name,
                },
                create: {
                  userId: session.user.id,
                  name: tag.name,
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to attach tag" },
      {
        status: 404,
      },
    );
  }
}
