import { quoteInfoSchema, quotePriceSchema } from "@/server/model/quote.model";
import { publicProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";
import yahooFinance from "yahoo-finance2";
import * as z from "zod";

export const searchWithKey = publicProcedure
  .input(z.object({ searchKey: z.string() }))
  .mutation(async (opts) => {
    const { input } = opts;

    const { searchKey } = input;

    if (!searchKey) return [];

    const result = await yahooFinance.search(searchKey);

    const { quotes } = result;

    if (!quotes) throw new Error("Not found");

    const filteredQuotes = quotes
      .filter((quote) => quote.isYahooFinance)
      .map((quote) => {
        return quoteInfoSchema.parse(quote);
      });

    return filteredQuotes;
  });

export const getQuote = publicProcedure
  .input(z.object({ symbol: z.string() }))
  .mutation(async (opts) => {
    const { input } = opts;

    const { symbol } = input;

    const result = await yahooFinance.quote(symbol);

    if (!result)
      throw new TRPCError({ message: "Quote not found", code: "NOT_FOUND" });

    result["price"] = result.regularMarketPrice;
    result["percentChange"] = result.regularMarketChangePercent;

    return quotePriceSchema.parse(result);
  });

const financeRouter = router({
  searchWithKey,
  getQuote,
});

export const finance = financeRouter;
