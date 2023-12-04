import z from "zod";

export const DashboardQuerySchema = z.object({
  /**
   * labels: label のフィルター値。カンマ区切りの文字列を配列に変換する。
   */
  labels: z
    .preprocess((v) => {
      if (typeof v === "string") {
        return v.split(",");
      }
      return v;
    }, z.array(z.string()))
    .optional(),
});
