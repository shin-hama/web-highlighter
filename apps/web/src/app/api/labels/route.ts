import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";

import { getLabels } from "~/lib/labels";

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

  const result = await getLabels();

  return NextResponse.json(result);
}
