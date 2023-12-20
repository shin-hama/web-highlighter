import type { PropsWithChildren } from "react";
import { useMemo } from "react";

import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";

const VerifyAvailable = ({ children }: PropsWithChildren) => {
  const [domains] = useIgnoredDomains();

  const isIgnored = useMemo(() => {
    const domain = window.location.hostname;
    return domains?.some((d) => d === domain);
  }, [domains]);

  if (isIgnored) {
    return <></>;
  }

  return <>{children}</>;
};

export default VerifyAvailable;
