import { z } from "zod";

const DefaultColorSchema = z.enum([
  "#FFB2B2",
  "#B2C3FF",
  "#F0FFB2",
  "#B2FFC8",
  "#FFDCB2",
]);
export type DefaultColor = z.infer<typeof DefaultColorSchema>;
export const DEFAULT_COLORS = DefaultColorSchema.options;

export * from "./api";
export * from "./schema";
