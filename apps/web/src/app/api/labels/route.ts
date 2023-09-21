import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import { prisma } from "@whl/db";

export async function GET(_: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const result = await prisma.label.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(result);
}
