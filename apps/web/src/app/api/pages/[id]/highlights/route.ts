import { getServerAuthSession } from "@whl/auth";
import type {
  GetHighlightsOnAPageResponse,
  SpecifiedPageRouteParam,
} from "@whl/common-types";
import { SpecifiedPageRouteParamSchema } from "@whl/common-types";

import { getHighlightsOnAPage } from "~/lib/get-highlights-on-page";

/**
 * Id を指定してページ内でのハイライト一覧を取得する
 * @param req
 * @param params
 * @returns
 */
export async function GET(
  req: Request,
  { params }: { params: SpecifiedPageRouteParam },
) {
  const session = await getServerAuthSession();
  if (session === null) {
    return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }
  const { id } = SpecifiedPageRouteParamSchema.parse(params);
  const result: GetHighlightsOnAPageResponse = await getHighlightsOnAPage(id);

  return Response.json(result);
}
