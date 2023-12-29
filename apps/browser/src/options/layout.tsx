import type { PropsWithChildren } from "react";

const OptionsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="whl-max-w-lg whl-px-6 whl-py-4">
      <h1 className="whl-font-mono whl-text-3xl whl-font-bold">Options</h1>
      <div className="whl-flex whl-flex-col whl-gap-2 whl-py-2">{children}</div>
    </div>
  );
};

export default OptionsLayout;
