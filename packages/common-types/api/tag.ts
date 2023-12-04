import { z } from "zod";

import type { Tag } from "@whl/db";

import type { TagWithCountOfHighlights } from "../schema";

export const TagDTOSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
export type TagDTO = z.infer<typeof TagDTOSchema>;

export const CreateHighlightOnTagRequestScheme = z.object({
  tag: z.object({
    name: z.string(),
  }) satisfies z.ZodType<Pick<Tag, "name">>,
});
export type CreateHighlightOnTagRequest = z.infer<
  typeof CreateHighlightOnTagRequestScheme
>;

export type GetTagsResponse = TagWithCountOfHighlights[];
