"use client";

import * as React from "react";
import {useState, useEffect} from "react";
import {Check, ChevronsUpDown} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ScrollArea} from "../ui/scroll-area";
import { getSearch } from "@/server/service/finance";
import { z } from "zod";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface IOption {
  symbol: string,
  name: string,
  type: string,
}

const AssetLookup = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<IOption[]>([]);
  

  useEffect(() => {
    const delayInputTimeout = setTimeout(async () => {
        if (!value) return;
          
        console.log("RUNN");
        
        const result = await getSearch({search: value});
        console.log(result);

        const quotes: IOption[] = result.map((quote) => {
          const {symbol = "", shortname = "", typeDisp = ""} = quote;
          return {
            symbol: symbol,
            name: shortname,
            type: typeDisp,
          }
        });

        setOptions(quotes);
    }, 500);

    return () => clearTimeout(delayInputTimeout);
  }, [value])

  const inputHandler = (event: string) => {
    setValue(event);
  }

  console.log({options});

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput onValueChange={inputHandler} placeholder="Search framework..." />          
          <CommandGroup>
            <ScrollArea className="h-full w-full rounded-md ">
              {(!options || options.length == 0) && "No framework found"}
              {options.map((option) => (
                <CommandItem
                  key={option.symbol}
                  value={option.symbol}
                  className="grid grid-cols-[min-content_1fr_2fr_1fr]"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === option.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-semibold">
                    {option.symbol}
                  </span>
                  
                  <span>
                    {option.name}
                  </span>

                  <span className="text-xs text-right text-gray-400">
                    {option.type}
                  </span>
                
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssetLookup;
