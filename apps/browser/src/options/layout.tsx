import type { PropsWithChildren } from "react";

const OptionsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="whl-container whl-py-4">
      <h1>Options</h1>
      <div className="whl-flex whl-flex-col whl-gap-2 whl-py-2">{children}</div>
    </div>
  );
};

export default OptionsLayout;
