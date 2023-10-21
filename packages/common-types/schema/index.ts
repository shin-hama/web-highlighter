import type { Prisma } from "@whl/db";

export type HighlightWithLabelAndPage = Prisma.HighlightGetPayload<{
  include: {
    label: true;
    page: true;
  };
}>;

export type HighlightWithLabelAndTag = Prisma.HighlightGetPayload<{
  include: {
    label: true;
    HighlightOnTag: {
      include: {
        tag: true;
      };
    };
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
              HighlightOnTag: {
                include: {
                  tag: true;
                };
              };
            };
          };
        };
      };
    };
  }>;
