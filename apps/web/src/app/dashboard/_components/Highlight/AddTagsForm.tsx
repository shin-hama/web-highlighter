"use client";

import { useState } from "react";

import "@ui/components/ui/button";

import { PlusIcon } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@whl/ui/components/ui/command";

const tags = [
  "test",
  "test2",
  "test3",
  "test4",
  "hoge",
  "fuga",
  "piyo",
  "foo",
  "bar",
];

const AddTagsForm = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Command>
        <CommandInput
          placeholder="Enter tag..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem key={tag} onSelect={console.log}>
                {tag}
              </CommandItem>
            ))}
            {value && tags.some((tag) => tag === value) === false && (
              <>
                <CommandSeparator />
                <CommandItem key="whl-add-new-tag-button" className="whl-gap-2">
                  <>
                    <PlusIcon size={14} />
                    {`Create "${value}"`}
                  </>
                </CommandItem>
              </>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default AddTagsForm;
