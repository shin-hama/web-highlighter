import { MARKER_CLASS_NAME } from "~/core/resources";
import {
  getTextNodesInOneElement,
  getTextNodesInRange,
} from "./get-text-nodes";

function createMarker(range: Range, color: string): HTMLElement {
  const elm = document.createElement("span");
  elm.className = MARKER_CLASS_NAME;
  elm.style.backgroundColor = color;
  elm.style.borderRadius = "2px";
  elm.style.padding = "2px 2px";
  elm.style.margin = "0 1px";

  range.surroundContents(elm);

  return elm;
}

function createMarkerOnNode(
  node: Node,
  color: string,
  position?: { start?: number; end?: number },
): HTMLElement {
  const range = document.createRange();
  range.selectNodeContents(node);
  if (position?.start) {
    range.setStart(node, position.start);
  }
  if (position?.end) {
    range.setEnd(node, position.end);
  }

  return createMarker(range, color);
}

function processTextNodes(
  textNodes: Node[],
  color: string,
  startOffset: number,
  endOffset: number,
): HTMLElement[] {
  const elements: HTMLElement[] = [];
  textNodes.reduce((count, textNode) => {
    const tempCount = count + (textNode.textContent?.length ?? 0);
    if (tempCount > startOffset && count < endOffset) {
      elements.push(
        createMarkerOnNode(textNode, color, {
          start:
            count < startOffset
              ? (textNode.textContent?.length ?? 0) - (tempCount - startOffset)
              : undefined,
          end: tempCount >= endOffset ? endOffset - count : undefined,
        }),
      );
    }
    return tempCount;
  }, 0);

  return elements;
}

function processTextNodesInOneElement(
  element: Element,
  color: string,
  startOffset: number,
  endOffset: number,
): HTMLElement[] {
  const textNodes = getTextNodesInOneElement(element);

  return processTextNodes(textNodes, color, startOffset, endOffset);
}

function processTextNodesBetweenTwoElements(
  start: Element,
  end: Element,
  color: string,
  startOffset: number,
  endOffset: number,
): HTMLElement[] {
  const otherRange = document.createRange();
  otherRange.setStart(start, start?.childNodes.length);
  otherRange.setEnd(end, 0);

  const startNodes = getTextNodesInOneElement(start);
  const otherTextNodes = getTextNodesInRange(otherRange);
  const endNodes = getTextNodesInOneElement(end);

  const elements: HTMLElement[] = [];
  elements.push(...processTextNodes(startNodes, color, startOffset, Infinity));
  elements.push(...processTextNodes(otherTextNodes, color, 0, Infinity));
  elements.push(...processTextNodes(endNodes, color, 0, endOffset));

  return elements;
}

export function createMarkers(
  startElement: Element,
  endElement: Element,
  color: string,
  startOffset: number,
  endOffset: number,
): HTMLElement[] {
  if (startElement === endElement) {
    return processTextNodesInOneElement(
      startElement,
      color,
      startOffset,
      endOffset,
    );
  } else {
    return processTextNodesBetweenTwoElements(
      startElement,
      endElement,
      color,
      startOffset,
      endOffset,
    );
  }
}
