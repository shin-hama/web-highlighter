"use client";

import { useEffect } from "react";
import { Button } from "@ui/components/ui/button";
import useSWR from "swr";
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
import { Skeleton } from "@whl/ui/components/ui/skeleton";

const LabelsFormSchema = z.object({
  labels: z.array(
    z.object({
      name: z
        .string()
        .max(128, { message: "Name can only be 128 characters long" })
        .refine(
          (value) =>
            /^[\w\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}-]*$/u.test(
              value,
            ),
          {
            message: "Name can only contain alphanumeric characters, -, _",
          },
        ),
      color: z.string(),
      id: z.string(),
    }),
  ),
});
type LabelsForm = z.infer<typeof LabelsFormSchema>;

const LabelsForm = () => {
  const { data, error, isLoading, mutate } =
    useSWR<LabelsForm["labels"]>("/api/labels");

  const form = useForm<LabelsForm>({
    resolver: zodResolver(LabelsFormSchema),
    defaultValues: {
      labels: Array.from(new Array(5)).map((_, i) => ({
        name: "",
        color: "#000000",
        id: `${i}`,
      })),
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      form.reset({
        labels: data.map((label) => ({
          ...label,
          name: label.name ?? "",
        })),
      });
    }
  }, [data]);

  const { formState } = form;

  const handleSubmit = async ({ labels }: LabelsForm) => {
    await mutate(labels, false);

    Promise.all(
      labels.map(async (label) => {
        const org = data?.find((orgLabel) => orgLabel.id === label.id);
        if (org !== undefined && org.name !== label.name) {
          const result = await fetch(`/api/labels/${label.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(label),
          });

          return (await result.json()) as Label;
        } else {
          return org ?? label;
        }
      }),
    )
      .then(async (result) => {
        await mutate(
          result.map((label) => ({ ...label, name: label.name ?? "" })),
        );
      })
      .catch(async (e) => {
        await mutate(data);
        console.error(e);
      });
  };

  if (error) {
    return <div>failed to load labels</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="whl-space-y-2"
      >
        {form.getValues().labels.map((label, i) => (
          <FormField
            key={label.id}
            control={form.control}
            name={`labels.${i}.name`}
            render={({ field }) => (
              <FormItem>
                {isLoading ? (
                  <Skeleton className="whl-h-8 whl-w-full" />
                ) : (
                  <>
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
                  </>
                )}
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
