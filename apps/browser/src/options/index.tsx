import IgnoredDomains from "./forms/IgnoredDomains";
import OptionsLayout from "./layout";

import "@whl/ui/app/globals.css";

const Options = () => {
  console.log("Options");
  return (
    <OptionsLayout>
      <IgnoredDomains />
    </OptionsLayout>
  );
};

export default Options;
