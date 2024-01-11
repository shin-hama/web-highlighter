import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { SpecifiedHighlightOnTagRouteParam } from "@whl/common-types";
import { SpecifiedHighlightOnTagRouteParamSchema } from "@whl/common-types";
import { prisma } from "@whl/db";

export async function DELETE(
  req: Request,
  { params }: { params: SpecifiedHighlightOnTagRouteParam },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, tagId } = SpecifiedHighlightOnTagRouteParamSchema.parse(params);

  try {
    const result = await prisma.highlightOnTag.delete({
      where: {
        highlightId_tagId: {
          tagId,
          highlightId: id,
        },
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
