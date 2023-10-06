import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { DeleteHighlightRequest } from "@whl/common-types";
import { prisma } from "@whl/db";

export async function DELETE(
  req: Request,
  { params }: { params: DeleteHighlightRequest },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const { id } = params;

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
      {
        status: 404,
      },
    );
  }
}
