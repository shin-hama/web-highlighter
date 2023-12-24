import { useKeyPressEvent } from "react-use";

interface Props {
  onExecute: () => void;
}
const ShortcutHighlight = ({ onExecute }: Props) => {
  // alt + c を押したら、ハイライトを開始する
  useKeyPressEvent(
    (e) =>
      e.altKey && e.code === "KeyC" && !e.shiftKey && !e.ctrlKey && !e.metaKey,
    () => {
      onExecute();
    },
  );

  return <></>;
};

export default ShortcutHighlight;
