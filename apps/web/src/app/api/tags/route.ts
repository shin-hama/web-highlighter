import { getServerAuthSession } from "@whl/auth";
import { GetTagsRequestScheme } from "@whl/common-types";
import type { GetTagsResponse } from "@whl/common-types";
import { getTags } from "@whl/db/lib/get-tags";

export async function GET(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const { searchParams } = new URL(req.url);
  const { hasHighlights } = GetTagsRequestScheme.parse(
    Object.fromEntries(searchParams),
  );

  // tag の一覧と、タグに紐づく記事の数を返す
  const result = await getTags(session.user.id, { hasHighlights });

  return Response.json(result satisfies GetTagsResponse);
}
