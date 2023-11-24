export function getTextNodesInRange(range: Range) {
  const textNodes = [];
  let node;

  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    function (node) {
      return range.intersectsNode(node)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  );

  while ((node = walker.nextNode())) {
    if (node.textContent?.trim() !== "") {
      textNodes.push(node);
    }
  }

  return textNodes;
}
