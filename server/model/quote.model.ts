import * as z from "zod";

export const quoteInfoSchema = z.object({
  shortName: z.string().optional().default(""),
  longName: z.string().optional().default(""),
  symbol: z.string(),
  typeDisp: z.string(),
  exchange: z.string(),
});

export const quotePriceSchema = quoteInfoSchema.extend({
  currency: z.string(),
  price: z.number(),
  percentChange: z.number(),
});

export type IQuoteInfo = z.infer<typeof quoteInfoSchema>;
export type IQuotePrice = z.infer<typeof quotePriceSchema>;
