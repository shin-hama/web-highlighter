import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type { SpecifiedLabelRouteParam } from "@whl/common-types";
import {
  SpecifiedLabelRouteParamSchema,
  UpdateLabelRequestSchema,
} from "@whl/common-types";
import { prisma } from "@whl/db";

export async function PUT(
  req: Request,
  { params }: { params: SpecifiedLabelRouteParam },
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

  const { id } = SpecifiedLabelRouteParamSchema.parse(params);
  const { name, color } = UpdateLabelRequestSchema.parse(await req.json());

  const result = await prisma.label.update({
    where: {
      id: id,
    },
    data: {
      name,
      color,
    },
  });

  return NextResponse.json(result);
}
