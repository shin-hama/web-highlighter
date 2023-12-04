import crypto from "crypto";
import { z } from "zod";

import type {
  HighlightWithLabelAndPositionAndTag,
  PageOnUserWithPageWithHighlightsWithLabel,
} from "../schema";

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

export const GetHighlightsGroupByPageQuerySchema = z.object({
  cursor: z.string().optional(),
  labels: z
    .preprocess((v) => {
      if (typeof v === "string") {
        return v.split(",");
      }
      return v;
    }, z.array(z.string()))
    .optional(),
});
export type GetHighlightsGroupByPageQuery = z.infer<
  typeof GetHighlightsGroupByPageQuerySchema
>;

export type GetHighlightsGroupByPageResponse =
  PageOnUserWithPageWithHighlightsWithLabel[];
