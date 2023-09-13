import { z } from "zod";

const ColorSchema = z.enum(["red", "green", "blue", "yellow"]);
export type Color = z.infer<typeof ColorSchema>;
export const COLORS = ColorSchema.options;

export * from "./api/highlights";
