import type { Position } from "@whl/db";

interface PositionNode {
  startElement: Element;
  endElement: Element;
}
export function findNodes(
  position: Pick<
    Position,
    "endIndex" | "endTagName" | "startIndex" | "startTagName"
  >,
): PositionNode | null {
  const startElement = document.body.getElementsByTagName(
    position.startTagName,
  )[position.startIndex];
  const endElement = document.body.getElementsByTagName(position.endTagName)[
    position.endIndex
  ];

  if (!startElement || !endElement) {
    console.warn("startContainer or endContainer is not found.");
    return null;
  }

  return { startElement, endElement };
}
