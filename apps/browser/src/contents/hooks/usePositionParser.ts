import { useMemo } from "react";

import type { Position } from "@whl/db";

import { getTextNodesInOneElement } from "../lib/get-text-nodes";

type PositionDTO = Pick<
  Position,
  | "startIndex"
  | "startOffset"
  | "startTagName"
  | "endIndex"
  | "endOffset"
  | "endTagName"
>;

function findAllElementsByName(name: string): Element[] {
  return Array.from(document.getElementsByTagName(name));
}

function calculateOffset(nodes: Node[], endNode: Node, endNodeOffset: number) {
  return nodes
    .slice(0, nodes.indexOf(endNode) + 1)
    .reduce(
      (count, node) =>
        count +
        (node === endNode ? endNodeOffset : node.textContent?.length ?? 0),
      0,
    );
}

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
      const { startContainer, endContainer, startOffset, endOffset } =
        elm.getRangeAt(0);
      const { parentElement: startParent } = startContainer;
      const { parentElement: endParent } = endContainer;

      if (startParent === null || endParent === null) {
        throw new Error("invalid range");
      }

      return {
        startIndex: findAllElementsByName(startParent.tagName).indexOf(
          startParent,
        ),
        startOffset: calculateOffset(
          getTextNodesInOneElement(startParent),
          startContainer,
          startOffset,
        ),
        startTagName: startParent.tagName,
        endIndex: findAllElementsByName(endParent.tagName).indexOf(endParent),
        endOffset: calculateOffset(
          getTextNodesInOneElement(endParent),
          endContainer,
          endOffset,
        ),
        endTagName: endParent.tagName,
      };
    };
    return {
      parse,
    };
  }, []);

  return parser;
};
