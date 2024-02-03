const HighlightContent = ({ content }: { content: string }) => (
  <div className="whl-flex whl-flex-row whl-gap-2">
    <div className="whl-w-1 whl-flex-shrink-0 whl-bg-gray-400" />
    <p className="whl-text-gray-700">{content}</p>
  </div>
);

export default HighlightContent;
