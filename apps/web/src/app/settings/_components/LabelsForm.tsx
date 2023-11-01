"use client";

import { z } from "zod";

import type { Label } from "@whl/db";
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

const labelsFormSchema = z.object({
  labels: z.array(z.string()),
});

interface Props {
  labels: Label[];
}
const LabelsForm = ({ labels }: Props) => {
  const form = useForm<z.infer<typeof labelsFormSchema>>({
    resolver: zodResolver(labelsFormSchema),
    defaultValues: { labels: labels.map((label) => label.name ?? "") },
  });

  const handleSubmit = (values: z.infer<typeof labelsFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="whl-space-y-2"
      >
        {labels.map((label, i) => (
          <FormField
            key={label.id}
            control={form.control}
            name={`labels.${i}`}
            render={({ field }) => (
              <FormItem>
                <div className="whl-flex whl-items-center whl-gap-2">
                  <div
                    className={`whl-h-5 whl-w-5 whl-rounded-full`}
                    style={{ backgroundColor: label.color }}
                  />
                  <FormControl>
                    <Input placeholder="Enter label name..." {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default LabelsForm;
