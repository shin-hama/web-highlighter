import type { HighlightWithLabelAndPositionAndTag } from "schema";
import { z } from "zod";

export const SpecifiedPageRouteParamSchema = z.object({
  id: z.string(),
});
export type SpecifiedPageRouteParam = z.infer<
  typeof SpecifiedPageRouteParamSchema
>;

export type GetHighlightsOnAPageResponse =
  HighlightWithLabelAndPositionAndTag[];
