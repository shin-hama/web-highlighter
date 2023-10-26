import { Toggle } from "@ui/components/ui/toggle";

type Props = React.ComponentPropsWithoutRef<typeof Toggle> & {
  color: string;
};
const LabelButton = ({ color, ...props }: Props) => {
  return (
    <Toggle {...props} className="whl-h-auto whl-rounded-full whl-p-1">
      <div
        className={`whl-h-5 whl-w-5 whl-rounded-full`}
        style={{ backgroundColor: color }}
      />
    </Toggle>
  );
};

export default LabelButton;
