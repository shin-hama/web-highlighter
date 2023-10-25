import z from "zod";

import type { Highlight } from "@whl/db";

const HighlightDTO = z.object({
  content: z.string(),
  labelId: z.string(),
}) satisfies z.ZodType<Pick<Highlight, "content" | "labelId">>;

export const CreateHighlightRequestSchema = z.object({
  page: z.object({
    url: z.string(),
    title: z.string(),
  }),
  tag: z
    .object({
      name: z.string(),
    })
    .optional(),
  highlight: HighlightDTO,
});

export type CreateHighlightRequest = z.infer<
  typeof CreateHighlightRequestSchema
>;

export const SpecifiedHighlightRouteParamSchema = z.object({
  id: z.string(),
});
export type SpecifiedHighlightRouteParam = z.infer<
  typeof SpecifiedHighlightRouteParamSchema
>;
