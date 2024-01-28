import type {
  HighlightWithLabelAndPositionAndTag,
  PositionDTO,
} from "@whl/common-types";

export interface IncompleteHighlight {
  content: string;
  url: string;
  position: PositionDTO;
  labelId?: string;
  id?: string;
}
export type MaybeHighlight =
  | IncompleteHighlight
  | HighlightWithLabelAndPositionAndTag;
