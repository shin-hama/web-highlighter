import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import { Separator } from "@whl/ui/components/ui/separator";

import EditableHighlight from "./EditableHighlight";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  pageId: string;
}

const EditableHighlights = ({ pageId }: Props) => {
  const { data, isLoading, error } = useSWR<HighlightWithLabelAndPageAndTag[]>(
    `/api/highlights?pageId=${pageId}`,
    fetcher,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || error) {
    return <div>Failed to load</div>;
  }

  return (
    <div className="whl-space-y-4">
      {data.map((highlight, i) => (
        <>
          {i !== 0 && <Separator key={`separator-${highlight.id}`} />}
          <EditableHighlight key={highlight.id} {...highlight} />
        </>
      ))}
    </div>
  );
};

export default EditableHighlights;
