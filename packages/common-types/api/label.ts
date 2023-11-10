import z from "zod";

export const SpecifiedLabelRouteParamSchema = z.object({
  id: z.string(),
});
export type SpecifiedLabelRouteParam = z.infer<
  typeof SpecifiedLabelRouteParamSchema
>;

export const UpdateLabelRequestSchema = z.object({
  color: z.string().optional(),
  name: z.string().optional(),
});
