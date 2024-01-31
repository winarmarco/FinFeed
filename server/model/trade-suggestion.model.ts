import * as z from "zod";
import { quotePriceSchema } from "./quote.model";

export const tradeSuggestionSchema = z.object({
  quote: z.object(quotePriceSchema.shape, {
    required_error: "Quote is required",
  }),
  predictionPrice: z.number({
    required_error: "Prediction price is required",
  }),
});
