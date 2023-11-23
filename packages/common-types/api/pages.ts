import crypto from "crypto";
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

export const PageIdFromURL = z
  .string()
  .transform((v) => crypto.createHash("md5").update(v).digest("hex"));
