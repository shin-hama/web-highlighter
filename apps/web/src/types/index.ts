import z from "zod";

export const GroupingTypeSchema = z.enum(["page", "tag"]);
export const GROUPING_TYPE = GroupingTypeSchema.Enum;
export type GroupingType = z.infer<typeof GroupingTypeSchema>;
