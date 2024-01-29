"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { trpc } from "@/_trpc/client";
import queryClient from "@/_trpc/query-client";
import { Quote, TradeSuggestion } from "../trade-suggestion-form";

interface IOption {
  symbol: string;
  shortName: string;
  longName: string;
  exchange: string;
  typeDisp: string;
}

interface AssetLookupProps {
  // suggestion: TradeSuggestion | undefined;
  onSelectQuote: (symbol: Quote) => void;
}

const AssetLookup: React.FC<AssetLookupProps> = ({onSelectQuote}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<IOption[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote>();

  const getOptions = trpc.services.finance.searchWithKey.useMutation({
    onSuccess: (data) => {
      const searchResults = data;

      if (!searchResults) return;

      setOptions(
        searchResults.map((result) => {
          const {
            shortName = "",
            longName = "",
            symbol,
            typeDisp,
            exchange,
          } = result;
          return {
            shortName,
            longName,
            symbol,
            typeDisp,
            exchange,
          };
        })
      );
    },
  });

  const { mutate } = getOptions;

  const getQuote = trpc.services.finance.getQuote.useMutation({
    onSuccess: (data) => {
      const {
        symbol,
        shortName = "",
        longName = "",
        currency = "",
        regularMarketPrice = 0,
        regularMarketChangePercent = 0,
      } = data;

      const quote = {        symbol,
        shortName,
        longName,
        currency,
        currentPrice: regularMarketPrice,
        change: regularMarketChangePercent,}

      setSelectedQuote(quote);
      onSelectQuote(quote)
    },
  });

  useEffect(() => {
    const delayInputTimeout = setTimeout(async () => {
      if (!searchValue) return;

      mutate({ searchKey: searchValue });
    }, 500);

    return () => clearTimeout(delayInputTimeout);
  }, [searchValue, mutate]);

  const inputHandler = (event: string) => {
    setSearchValue(event);
  };

  const onSelectOptions = (symbol: string) => {
    getQuote.mutateAsync({ symbol: symbol });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getQuote.isLoading && (
            <span className="animate-spin">
              <Loader2 />
            </span>
          )}
          {!getQuote.isLoading &&
            (selectedQuote ? (
              <div className="w-full flex flex-row text-left justify-between">
                <span className="font-semibold">
                  <h4 className="inline">{selectedQuote.shortName}</h4>
                  <p className="inline text-xs ml-2 text-gray-500">
                    {selectedQuote.symbol}
                  </p>
                </span>

                <h1 className="flex">
                  <span className="text-md">
                    {selectedQuote.currency} {selectedQuote.currentPrice}
                  </span>

                  {selectedQuote.change && (
                    <span
                      className={cn(
                        "ml-1 text-xs self-center px-1 rounded text-white",
                        selectedQuote.change < 0 ? "bg-red-400" : "bg-green-400"
                      )}
                    >
                      {selectedQuote.change.toFixed(2)}%
                    </span>
                  )}
                </h1>
              </div>
            ) : (
              <span className="text-gray-500">Select a quote</span>
            ))}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-2 py-2"
        style={{
          width: "var(--radix-popover-trigger-width)",
          maxHeight: "var(--radix-popover-content-available-height)",
        }}
      >
        <Command>
          <CommandInput
            onValueChange={inputHandler}
            placeholder="Search framework..."
          />
          <CommandGroup>
            <ScrollArea className="h-full w-full rounded-md ">
              {options.map((option, index) => (
                <CommandItem
                  key={`${option.shortName}-${option.symbol}-${option.typeDisp}-${index}`}
                  value={option.symbol}
                  className="grid grid-cols-[min-content_1fr_2fr_1fr]"
                  onSelect={(currentValue) => {
                    onSelectOptions(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedQuote?.shortName === option.shortName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className="font-semibold">{option.symbol}</span>

                  <span>{option.shortName}</span>

                  <span className="text-xs text-right text-gray-400">
                    {option.typeDisp}
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
