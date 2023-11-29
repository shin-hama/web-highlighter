import z from "zod";

const GroupingTypeSchema = z.enum(["page", "tag"]);
export const GROUPING_TYPE = GroupingTypeSchema.Enum;
export type GroupingType = z.infer<typeof GroupingTypeSchema>;
