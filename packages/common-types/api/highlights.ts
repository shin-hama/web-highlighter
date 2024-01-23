import z from "zod";

import type { Highlight, Position } from "@whl/db";

export const PositionDTOSchema = z.object({
  startTagName: z.string().min(1),
  startIndex: z.number().min(0),
  startOffset: z.number().min(0),
  endTagName: z.string().min(1),
  endIndex: z.number().min(0),
  endOffset: z.number().min(0),
}) satisfies z.ZodType<
  Pick<
    Position,
    | "startTagName"
    | "startIndex"
    | "startOffset"
    | "endTagName"
    | "endIndex"
    | "endOffset"
  >
>;
export type PositionDTO = z.infer<typeof PositionDTOSchema>;

export const HighlightDTOSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  labelId: z.string(),
  url: z.string(),
  position: PositionDTOSchema,
}) satisfies z.ZodType<Pick<Highlight, "content" | "labelId" | "url">>;
export type HighlightDTO = z.infer<typeof HighlightDTOSchema>;

export const CreateHighlightRequestSchema = z.object({
  page: z.object({
    url: z.string(),
    title: z.string(),
  }),
  tags: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  highlight: HighlightDTOSchema.omit({ id: true }),
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

export const SpecifiedHighlightOnTagRouteParamSchema = z.object({
  id: z.string(),
  tagId: z.string(),
});
export type SpecifiedHighlightOnTagRouteParam = z.infer<
  typeof SpecifiedHighlightOnTagRouteParamSchema
>;
