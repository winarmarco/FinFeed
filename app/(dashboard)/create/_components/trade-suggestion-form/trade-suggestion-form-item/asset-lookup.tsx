"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
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
import { trpc } from "@/_trpc/client";
import { useLivePrice } from "@/lib/context/useLivePrice";
import { TickerLivePrice } from "@/lib/context/LivePriceContextProvider";
import AssetDisplay from "../../../../../../components/asset-display";
import * as z from "zod";
import { tradeSuggestionSchema } from "@/server/model/trade-suggestion.model";

interface IOption {
  symbol: string;
  shortName: string;
  longName: string;
  exchange: string;
  typeDisp: string;
}

type TradeSuggestion = z.infer<typeof tradeSuggestionSchema>;

interface AssetLookupProps {
  suggestion: TradeSuggestion
  onChange: (tradeSuggestion: TradeSuggestion) => void;
}

const initState = [
  {
    shortName: "",
    longName: "",
    symbol: "CL=F",
    typeDisp: "Futures",
    exchange: "NYM",
  },

  {
    shortName: "",
    longName: "",
    symbol: "C",
    typeDisp: "Equity",
    exchange: "NYQ",
  },

  {
    shortName: "",
    longName: "",
    symbol: "BZ=F",
    typeDisp: "Futures",
    exchange: "NYM",
  },

  {
    shortName: "",
    longName: "",
    symbol: "HG=F",
    typeDisp: "Futures",
    exchange: "CMX",
  },

  {
    shortName: "",
    longName: "",
    symbol: "KC=F",
    typeDisp: "Futures",
    exchange: "NYB",
  },
];

const AssetLookup: React.FC<AssetLookupProps> = ({
  suggestion,
  onChange,

}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IOption[]>(initState);
  const debounced = useDebouncedCallback((value: string) => {
    getOptions.mutate({ searchKey: value || "" });
  }, 500);

  const getOptions = trpc.services.finance.searchWithKey.useMutation({
    onSuccess: (data) => {
      setOptions(data);
    },
  });

  const getQuote = trpc.services.finance.getQuote.useMutation({
    onSuccess: (data) => {
      onChange(({ ...suggestion, quote: data }));
      setSubscribedSymbol([data.symbol]);
    },
  });

  const { setSubscribedSymbol } = useLivePrice({
    callback: (data: TickerLivePrice) => {
      const { price, change } = data[suggestion.quote.symbol];
      onChange({
        ...suggestion,
        quote: {
          ...suggestion.quote,
          price,
          percentChange: change,
        }
      })
    },
  });

  const selectedQuote = suggestion?.quote;


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
              <AssetDisplay selectedQuote={selectedQuote} />
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
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={(text) => {
              debounced(text);
            }}
            placeholder="Search framework..."
          />
          <CommandGroup>
            <ScrollArea className="h-full w-full rounded-md">
              {options.map((option, index) => (
                <CommandItem
                  key={`${option.shortName}-${option.symbol}-${option.typeDisp}-${index}`}
                  value={option.symbol}
                  className="grid grid-cols-[min-content_1fr_2fr_1fr]"
                  onSelect={(currentValue) => {
                    getQuote.mutateAsync({ symbol: currentValue });
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