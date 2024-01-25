import { NextResponse } from "next/server";

import { getServerAuthSession } from "@whl/auth";
import type {
  HighlightWithLabelAndPositionAndTag,
  SpecifiedHighlightRouteParam,
} from "@whl/common-types";
import {
  SpecifiedHighlightRouteParamSchema,
  UpdateHighlightRequestSchema,
} from "@whl/common-types";
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

export async function PUT(
  req: Request,
  { params }: { params: SpecifiedHighlightRouteParam },
) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = SpecifiedHighlightRouteParamSchema.parse(params);
  const { highlight, tags: newTags } = UpdateHighlightRequestSchema.parse(
    await req.json(),
  );
  const { position, ...rest } = highlight;

  // Get the current tags
  const currentTags = await prisma.highlightOnTag.findMany({
    where: {
      highlightId: id,
    },
    select: {
      id: true,
      tag: true,
    },
  });

  const tagsToDisconnect = currentTags
    .filter((t) => !newTags?.some((tag) => tag.name === t.tag.name))
    .map((t) => ({ id: t.id }));
  const tagsToConnect = (newTags ?? []).filter(
    (t) => !currentTags.some((tag) => tag.tag.name === t.name),
  );

  try {
    const result = await prisma.highlight.update({
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
        position: true,
      },
      data: {
        ...rest,
        position: {
          update: position,
        },
        HighlightOnTag: {
          deleteMany:
            tagsToDisconnect?.length > 0 ? tagsToDisconnect : undefined,
          connectOrCreate:
            tagsToConnect?.length > 0
              ? tagsToConnect?.map((tag) => ({
                  where: {
                    highlightId_tagId: { tagId: tag.id ?? "", highlightId: id },
                  },
                  create: {
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
                  },
                }))
              : undefined,
        },
      },
    });

    return NextResponse.json(
      result satisfies HighlightWithLabelAndPositionAndTag,
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to update highlight" },
      { status: 404 },
    );
  }
}
