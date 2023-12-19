import { useKeyPressEvent } from "react-use";

interface Props {
  onExecute: () => void;
}
const ShortcutHighlight = ({ onExecute }: Props) => {
  // alt + c を押したら、ハイライトを開始する
  useKeyPressEvent(
    (e) => e.altKey && e.key === "c",
    () => {
      console.log("Save Highlight");
      onExecute();
    },
  );

  return <></>;
};

export default ShortcutHighlight;
