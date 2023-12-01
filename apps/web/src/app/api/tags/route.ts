import { getServerAuthSession } from "@whl/auth";
import type { GetTagsResponse } from "@whl/common-types";
import { getTags } from "@whl/db/lib/get-tags";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  // tag の一覧と、タグに紐づく記事の数を返す
  const result = await getTags(session.user.id);

  return Response.json(result satisfies GetTagsResponse);
}
