import { useMemo } from "react";

import type { Position } from "@whl/db";

type PositionDTO = Pick<
  Position,
  | "startIndex"
  | "startOffset"
  | "startTagName"
  | "endIndex"
  | "endOffset"
  | "endTagName"
>;

interface PositionParser {
  /**
   * 選択された要素の位置情報をパースする
   * 位置情報とは html 中で選択された要素がどこにあるかを示す情報
   * html のタグ名と、そのタグが html 内の何番目の要素か、その要素の何番目の文字かを保存する
   * @param elm 選択された要素
   * @returns
   */
  parse: (elm: Selection) => PositionDTO;
}
export const usePositionParser = (): PositionParser => {
  const parser = useMemo(() => {
    const parse = (elm: Selection): PositionDTO => {
      const range = elm.getRangeAt(0);
      console.log(range);

      const startNode = range.startContainer;
      const endNode = range.endContainer;

      if (startNode.parentElement === null || endNode.parentElement === null) {
        throw new Error("invalid range");
      }

      const startTagName = startNode.parentElement?.tagName;
      const endTagName = endNode.parentElement?.tagName;

      // このページに有る全ての startTagName の要素を取得して、その中で startNode が何番目の要素かを取得する
      const startTagElements = Array.from(
        document.getElementsByTagName(startTagName),
      );
      const startIndex = startTagElements.indexOf(startNode.parentElement);

      // このページに有る全ての endTagName の要素を取得して、その中で endNode が何番目の要素かを取得する
      const endTagElements = Array.from(
        document.getElementsByTagName(endTagName),
      );
      const endIndex = endTagElements.indexOf(endNode.parentElement);

      const startOffset = range.startOffset;
      const endOffset = range.endOffset;

      return {
        startIndex,
        startOffset,
        startTagName,
        endIndex,
        endOffset,
        endTagName,
      };
    };
    return {
      parse,
    };
  }, []);

  return parser;
};
