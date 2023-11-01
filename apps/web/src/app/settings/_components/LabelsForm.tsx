"use client";

import { Button } from "@ui/components/ui/button";
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

const LabelsFormSchema = z.object({
  labels: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
      id: z.string(),
    }),
  ),
});
type LabelsForm = z.infer<typeof LabelsFormSchema>;

interface Props {
  labels: Label[];
}
const LabelsForm = ({ labels }: Props) => {
  const form = useForm<LabelsForm>({
    resolver: zodResolver(LabelsFormSchema),
    defaultValues: {
      labels: labels.map((label) => ({
        ...label,
        name: label.name ?? "",
      })),
    },
  });

  const { formState } = form;

  const handleSubmit = (values: LabelsForm) => {
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
            name={`labels.${i}.name`}
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
        {formState.isDirty && (
          <div className="whl-flex whl-w-full whl-justify-end whl-gap-2">
            <Button type="reset" variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default LabelsForm;
