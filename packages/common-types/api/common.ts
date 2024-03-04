import z from "zod";

export const CursorPaginationRequestSchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .default("20")
    .transform((value) => Number(value)),
});
export type CursorPaginationRequest = z.infer<
  typeof CursorPaginationRequestSchema
>;

export interface HasCursorResponse {
  nextCursor: string | null;
}
