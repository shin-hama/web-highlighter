import { sendToContentScript } from "@plasmohq/messaging";

import {
  getTextNodesInOneElement,
  getTextNodesInRange,
} from "./get-text-nodes";

export function createMarker(
  node: Node,
  color: string,
  position?: { start?: number; end?: number },
) {
  const range = document.createRange();
  range.selectNodeContents(node);
  if (position?.start) {
    range.setStart(node, position.start);
  }
  if (position?.end) {
    range.setEnd(node, position.end);
  }

  const elm = document.createElement("span");
  elm.style.backgroundColor = color;
  elm.style.borderRadius = "2px";
  elm.style.padding = "2px 2px";
  elm.style.margin = "0 1px";

  elm.addEventListener("click", (event) => {
    // Prevent the event from bubbling up
    event.stopPropagation();

    // Send the event to your extension
    chrome.runtime
      .sendMessage({
        type: "WebHighlighter:MarkerClicked",
        data: {
          id: "chrome",
        },
      })
      .then(console.log)
      .catch(console.error);
    sendToContentScript({
      name: "plasmo:WebHighlighter:MarkerClicked",
      body: {
        id: "plasmo",
      },
    })
      .then(console.log)
      .catch(console.error);
  });

  range.surroundContents(elm);
}

function processTextNodes(
  textNodes: Node[],
  color: string,
  startOffset: number,
  endOffset: number,
) {
  textNodes.reduce((count, textNode) => {
    const tempCount = count + (textNode.textContent?.length ?? 0);
    if (tempCount > startOffset && count < endOffset) {
      createMarker(textNode, color, {
        start:
          count < startOffset
            ? (textNode.textContent?.length ?? 0) - (tempCount - startOffset)
            : undefined,
        end: tempCount >= endOffset ? endOffset - count : undefined,
      });
    }
    return tempCount;
  }, 0);
}

function processTextNodesInOneElement(
  element: Element,
  color: string,
  startOffset: number,
  endOffset: number,
) {
  const textNodes = getTextNodesInOneElement(element);

  processTextNodes(textNodes, color, startOffset, endOffset);
}

function processTextNodesBetweenTwoElements(
  start: Element,
  end: Element,
  color: string,
  startOffset: number,
  endOffset: number,
) {
  const otherRange = document.createRange();
  otherRange.setStart(start, start?.childNodes.length);
  otherRange.setEnd(end, 0);

  const startNodes = getTextNodesInOneElement(start);
  const otherTextNodes = getTextNodesInRange(otherRange);
  const endNodes = getTextNodesInOneElement(end);

  processTextNodes(startNodes, color, startOffset, Infinity);
  processTextNodes(otherTextNodes, color, 0, Infinity);
  processTextNodes(endNodes, color, 0, endOffset);
}

export function createMarkers(
  startElement: Element,
  endElement: Element,
  color: string,
  startOffset: number,
  endOffset: number,
) {
  if (startElement === endElement) {
    processTextNodesInOneElement(startElement, color, startOffset, endOffset);
  } else {
    processTextNodesBetweenTwoElements(
      startElement,
      endElement,
      color,
      startOffset,
      endOffset,
    );
  }
}
