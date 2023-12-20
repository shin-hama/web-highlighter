import { useMemo } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { z } from "zod";

const IgnoredDomainsSchema = z.object({
  // ドメイン名
  domain: z
    .string()
    .max(253)
    .regex(
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    ),
});
type Domain = z.infer<typeof IgnoredDomainsSchema>["domain"];

interface UseIgnoredDomainsActions {
  add(domain: Domain): Promise<void>;
  remove(domain: Domain): Promise<void>;
}

export const useIgnoredDomains = () => {
  const [domains, setDomains] = useStorage<Domain[]>("ignoredDomains");

  const actions = useMemo<UseIgnoredDomainsActions>(() => {
    const a = {
      add: async (domain: Domain) => {
        await setDomains((prev) => {
          return [...(prev ?? []), domain];
        });
      },
      remove: async (domain: Domain) => {
        await setDomains((prev) => (prev ?? []).filter((d) => d !== domain));
      },
    };

    return a;
  }, [setDomains]);

  return [domains, actions] as const;
};
