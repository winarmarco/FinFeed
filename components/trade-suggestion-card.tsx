import AssetDisplay from "@/components/asset-display";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tradeSuggestionSchema } from "@/server/model/trade-suggestion.model";
import * as z from "zod";
import { Button } from "./ui/button";
import { Quote } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "@/_trpc/client";
import { LivePrice } from "@/lib/context/LivePriceContextProvider";
import { useLivePrice } from "@/lib/context/useLivePrice";
import { Loader2 } from "lucide-react";

const TradeSuggestionCard: React.FC<
  | z.infer<typeof tradeSuggestionSchema>
  | {
      predictionPrice: number;
      quote: Quote;
    }
> = ({ predictionPrice, quote }) => {
  const [livePrice, setLivePrice] = useState<LivePrice>();
  const { symbol } = quote;

  const { mutateAsync: getCurrPrice } =
    trpc.services.finance.getQuote.useMutation({
      onSuccess: (data) =>
        setLivePrice({
          change: data.percentChange,
          currency: data.currency,
          symbol: data.symbol,
          price: data.price,
        }),
    });

  const { subscribedLivePrice, subscribedSymbol, setSubscribedSymbol } =
    useLivePrice({
      callback: (data) => {
        // if the live data has the current symbol, then update the live price
        if (Object.keys(data).includes(symbol))
          setLivePrice(data[quote.symbol]);
      },
    });

  useEffect(() => {
    // if symbol price is already subscribed, just get the data if exist
    if (subscribedSymbol.includes(symbol)) {

      // if the live data is exist, then get it, otherwise, fetch the latest one
      if (Object.keys(subscribedLivePrice).includes(symbol)) {
        setLivePrice(subscribedLivePrice[symbol]); 
      } else {
        getCurrPrice({ symbol }); // Fetch latest price
      }


    } else {
      // if symbol is not subscribed
      // fetch the latest one, and subscribe the symbol
      getCurrPrice({ symbol });
      setSubscribedSymbol((prevSymbol) => {
        console.log((prevSymbol.includes(symbol)) ? [...prevSymbol] : [...prevSymbol, symbol]);
        return (prevSymbol.includes(symbol)) ? [...prevSymbol] : [...prevSymbol, symbol]
      }
      );
    }
  }, [symbol]);

  const potentialPnL =
    livePrice && (predictionPrice - livePrice.price) / livePrice.price;

  return (
    <Card className="flex flex-col px-4 py-4 mb-2">
      <CardHeader className="p-0 border-b-2 py-2">
        <span className="font-bold">My Prediction</span>
        <CardTitle>
          <div className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {!livePrice && <Loader2 className="animate-spin" />}
            {livePrice && (
              <AssetDisplay
                selectedQuote={{
                  ...quote,
                  price: livePrice.price,
                  percentChange: livePrice.change,
                }}
              />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="py-2">
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Target Price</span>
              <span className="font-semibold">
                {quote.currency} {predictionPrice}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-medium">Entry Price</span>
              <span className="font-semibold">
                {quote.currency} {quote.price.toFixed(5)}
              </span>
            </div>
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

export default TradeSuggestionCard;
