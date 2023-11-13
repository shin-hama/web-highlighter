import type { Prisma } from "@whl/db";

export type HighlightWithLabelAndPageAndTag = Prisma.HighlightGetPayload<{
  include: {
    label: true;
    page: true;
    HighlightOnTag: {
      include: {
        tag: true;
      };
    };
  };
}>;

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

export type PageWithHighlightsWithLabelAndTag = Prisma.PageGetPayload<{
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

export type TagWithCountOfHighlights = Prisma.TagGetPayload<{
  include: {
    _count: {
      select: {
        HighlightOnTag: true;
      };
    };
  };
}>;
