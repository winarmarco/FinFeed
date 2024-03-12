"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetLookup from "./trade-suggestion-form-item/asset-lookup";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { tradeSuggestionSchema } from "@/server/model/trade-suggestion.model";

type ITradeSuggestion = z.infer<typeof tradeSuggestionSchema>;

const TradeSuggestionForm: React.FC<{
  onChange: (tradeSuggestion: ITradeSuggestion) => void;
  value: ITradeSuggestion;
}> = ({ onChange, value }) => {
  const calculatePotentialPnL = (suggestion?: ITradeSuggestion) => {
    if (!suggestion || !suggestion.quote) return null;

    const { predictionPrice } = suggestion;
    const { price: currentPrice } = suggestion.quote;

    return (predictionPrice - currentPrice) / currentPrice;
  };

  const potentialPnL = calculatePotentialPnL(value);

  return (
    <Card className="w-full flex flex-col px-4 py-4 mb-2">
      <CardHeader className="p-0 border-b-2 py-2">
        <span className="font-bold">Prediction</span>
        <CardTitle>
          <AssetLookup onChange={onChange} suggestion={value} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="py-2">
          <div className="">
            <InputWithIcon
              disabled={!value.quote}
              type="number"
              placeholder="Target Price"
              className="w-full"
              value={value.predictionPrice?.toString() || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                onChange({
                  ...value,
                  predictionPrice: parseFloat(inputValue || "0"),
                });
              }}
              icon={value.quote?.currency || ""}
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
