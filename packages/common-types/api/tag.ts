import { z } from "zod";

import type { Tag } from "@whl/db";

export const CreateHighlightOnTagRequestScheme = z.object({
  tag: z.object({
    name: z.string(),
  }) satisfies z.ZodType<Pick<Tag, "name">>,
});
export type CreateHighlightOnTagRequest = z.infer<
  typeof CreateHighlightOnTagRequestScheme
>;
