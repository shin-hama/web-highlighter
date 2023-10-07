import z from "zod";

// カンマ区切りの文字列を配列に変換する。空文字の場合は undefined に変換する。
const ArrayFromString = z.string().transform((value) => {
  if (value === "") {
    return undefined;
  }
  return value.split(",");
});

export const DashboardQuerySchema = z.object({
  /**
   * labels: label のフィルター値。カンマ区切りの文字列を配列に変換する。
   */
  labels: ArrayFromString.optional(),
});
