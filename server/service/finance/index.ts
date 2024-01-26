"use server";

import yahooFinance from "yahoo-finance2";

export const getSearch = async ({search}: {search: string}) => {
  const result = await yahooFinance.search(search);

  const {quotes} = result;

  if (!quotes) throw new Error("Not found");

  const filteredQuotes = quotes.filter((quote) => quote.isYahooFinance);

  return filteredQuotes;
};
