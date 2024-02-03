import { trpc } from "@/_trpc/client";
import { LivePrice, TickerLivePrice } from "@/lib/context/LivePriceContextProvider";
import { useLivePrice } from "@/lib/context/useLivePrice";
import { cn } from "@/lib/utils";
import { tradeSuggestionSchema } from "@/server/model/trade-suggestion.model";
import { Quote } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import * as z from "zod";

interface AssetDisplayProps {
  selectedQuote: z.infer<typeof tradeSuggestionSchema>["quote"] | (Quote & {percentChange: number}),
}


const AssetDisplay: React.FC<AssetDisplayProps> = ({selectedQuote}) => {

  return (
    <div className="w-full flex flex-row text-left justify-between">
      <span className="font-semibold">
        <h4 className="inline">{selectedQuote.shortName}</h4>
        <p className="inline text-xs ml-2 text-gray-500">
          {selectedQuote.symbol}
        </p>
      </span>

      <h1 className="flex">
        <span className="text-md">
          {selectedQuote.currency} <span>{selectedQuote.price.toFixed(5)}</span>
        </span>

        {selectedQuote.percentChange && (
          <span
            className={cn(
              "ml-1 text-xs self-center px-1 rounded text-white",
              selectedQuote.percentChange < 0 ? "bg-red-400" : "bg-green-400"
            )}
          >
            {selectedQuote.percentChange.toFixed(2)}%
          </span>
        )}
      </h1>
    </div>
  );
};


export default AssetDisplay;