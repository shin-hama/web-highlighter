import { useCallback } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { z } from "zod";

import { Button } from "@whl/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
  zodResolver,
} from "@whl/ui/components/ui/form";
import { Input } from "@whl/ui/components/ui/input";
import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

const IgnoredDomainsSchema = z.object({
  domain: z.string(),
});
type Domain = z.infer<typeof IgnoredDomainsSchema>["domain"];

const IgnoredDomains = () => {
  const [domains, setDomains] = useStorage<Domain[]>("ignoredDomains");
  const form = useForm<z.infer<typeof IgnoredDomainsSchema>>({
    resolver: zodResolver(IgnoredDomainsSchema),
    mode: "onSubmit",
  });

  const handleSaveDomains = useCallback(
    (data: z.infer<typeof IgnoredDomainsSchema>) => {
      setDomains((v) => {
        console.log(v);
        if (v !== undefined) {
          return [...v, data.domain];
        }
        return [data.domain];
      })
        .then(console.log)
        .catch(console.error);
    },
    [setDomains],
  );

  return (
    <div className="whl-space-y-2">
      <h2>Ignored Domains</h2>
      <p className="whl-text-muted-foreground">
        Extensions does not launch on below domains.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveDomains)}>
          <div className="whl-flex whl-flex-row whl-gap-2">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Form>
      <ScrollArea className="whl-max-h-32 whl-w-full">
        {domains.map((domain) => (
          <p key={domain}>{domain}</p>
        ))}
      </ScrollArea>
    </div>
  );
};

export default IgnoredDomains;
