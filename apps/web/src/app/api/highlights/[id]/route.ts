import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { SpecifiedHighlightRouteParam } from "@whl/common-types";
import { SpecifiedHighlightRouteParamSchema } from "@whl/common-types";
import { prisma } from "@whl/db";

export async function GET(
  req: Request,
  { params }: { params: SpecifiedHighlightRouteParam },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = SpecifiedHighlightRouteParamSchema.parse(params);

  try {
    const result = await prisma.highlight.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        HighlightOnTag: {
          include: {
            tag: true,
          },
        },
        label: true,
        page: true,
      },
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to find highlight" },
      { status: 404 },
    );
  }
}

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
        userId: session.user.id,
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
