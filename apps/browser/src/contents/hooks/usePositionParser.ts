"use client";

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

      // body 要素内にて何番目かを取得する
      const startIndex = Array.from(document.body.children).indexOf(
        startNode.parentElement,
      );

      console.log(endNode.parentElement?.parentElement);

      const endIndex = Array.from(
        endNode.parentElement?.parentElement?.children ?? [],
      ).indexOf(endNode.parentElement);

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
