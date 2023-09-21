import z from "zod";

export const CreateHighlightRequestSchema = z.object({
  page: z.object({
    url: z.string(),
    title: z.string(),
  }),
  highlight: z.object({
    content: z.string(),
    labelId: z.string(),
  }),
});

export type CreateHighlightRequest = z.infer<
  typeof CreateHighlightRequestSchema
>;
