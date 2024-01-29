"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetLookup from "./trade-suggestion-form-item/asset-lookup";
import { trpc } from "@/_trpc/client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import * as z from "zod";
import { cn } from "@/lib/utils";

export interface Quote {
  symbol: string;
  currentPrice: number;
  change: number;
  currency: string;
  shortName: string;
  longName: string;
}

export interface TradeSuggestion {
  quote: Quote;
  predictionPrice?: number;
}

const TradeSuggestionForm: React.FC = () => {
  const [suggestion, setSuggestion] = useState<TradeSuggestion>();

  // const { data, mutate } = trpc.services.finance.getQuote.useMutation({
  //   onSuccess: (data) => {

  //     setSuggestion({
  //       symbol: data.symbol,
  //       shortName: data.shortName || "",
  //       initialPrice: data.regularMarketPrice,
  //       change: data.regularMarketChangePercent,
  //       currency: data.currency || "$",
  //     });
  //   },
  // });

  // const { symbol, predictionPrice, initialPrice, currency } = suggestion;

  // const currentPrice = (initialPrice + predictionPrice) / 3;

  // const pnlFromInit = parseFloat(String((predictionPrice - initialPrice) / initialPrice * 100)).toFixed(2);
  // const currentPnl = parseFloat(String((currentPrice - initialPrice) / initialPrice * 100)).toFixed(2);

  // useEffect(() => {
  //   const websocket = new WebSocket('wss://streamer.finance.yahoo.com/')
  //   websocket.onopen = () => {
  //     console.log('connected');
  //     websocket.send(JSON.stringify({
  //       subscribe: ["BTC-USD"]
  //     }))
  //   }

  //   websocket.onerror = (event) => {
  //     console.log(event);
  //   }

  //   websocket.onclose = () => {
  //     console.log("CLOSED");
  //   }

  //   websocket.onmessage = (event) => {
  //     console.log("coming message");
  //     console.log(event);
  //   }

  // }, []);

  const onSelect = (quote: Quote) => {
    setSuggestion((prevVal) => ({ ...prevVal, quote }));
  };

  const potentialPnL =
    suggestion && suggestion.predictionPrice
      ? (suggestion.predictionPrice - suggestion.quote.currentPrice) /
        suggestion.quote.currentPrice
      : 0;

  console.log(suggestion);

  return (
    <Card className="w-full flex flex-col px-4 py-4">
      <CardHeader className="p-0 border-b-2 py-2">
        <span className="font-bold">Prediction</span>
        <CardTitle>
          <AssetLookup onSelectQuote={onSelect} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="py-2">
          <div className="">
            <Label>Target price</Label>
            <InputWithIcon
              disabled={!suggestion}
              type="number"
              className="w-full"
              value={suggestion?.predictionPrice}
              onChange={(e) => {
                setSuggestion((prevVal) => {
                  if (!prevVal) return undefined;

                  return {
                    ...prevVal,
                    predictionPrice: parseInt(e.target.value),
                  };
                });
              }}
              icon={suggestion?.quote.currency || ""}
            />
          </div>
        </div>

        <div className="py-2">
          <div className="text-xs">
            <span className="font-medium">Potential Gain/Loss: </span>
            <span
              className={cn(
                "ml-2",
                potentialPnL && potentialPnL < 0
                  ? "text-red-600"
                  : potentialPnL && "text-green-600"
              )}
            >
              {potentialPnL ? (potentialPnL * 100).toFixed(2) + "%" : "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeSuggestionForm;
