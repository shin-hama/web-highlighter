import type { Prisma } from "@whl/db";

export type HighlightWithLabelAndPage = Prisma.HighlightGetPayload<{
  include: {
    label: true;
    page: true;
  };
}>;

export type HighlightWithLabel = Prisma.HighlightGetPayload<{
  include: {
    label: true;
  };
}>;

export type PageWithHighlightsWithLabel = Prisma.PageGetPayload<{
  include: {
    highlights: {
      include: {
        label: true;
      };
    };
  };
}>;

export type PageOnUserWithPageWithHighlightsWithLabel =
  Prisma.PageOnUserGetPayload<{
    include: {
      page: {
        include: {
          highlights: {
            include: {
              label: true;
            };
          };
        };
      };
    };
  }>;
