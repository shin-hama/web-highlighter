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

export type HighlightWithLabelAndPositionAndTag = Prisma.HighlightGetPayload<{
  include: {
    label: true;
    position: true;
    HighlightOnTag: {
      include: {
        tag: true;
      };
    };
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

export type PageWithCountOfHighlights = Prisma.PageGetPayload<{
  include: {
    _count: {
      select: {
        highlights: true;
      };
    };
  };
}>;

export type PageOnUserWithCountOfHighlights = Prisma.PageOnUserGetPayload<{
  include: {
    page: {
      include: {
        _count: {
          select: {
            highlights: true;
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
