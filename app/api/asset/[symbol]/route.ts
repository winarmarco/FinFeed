import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import yahooFinance from "yahoo-finance2";

export async function handler(
  req: Request,
  {params}: {params: {symbol: string}}
) {
  const symbol = params.symbol;

  try {
    if (!symbol) throw new Error("'search' query parameter is required");

    const result = await yahooFinance.search(symbol);

    if (!result) throw new Error(`${symbol} not found`);

    const filteredResult = result.quotes
      .filter((quote) => quote.isYahooFinance)
      .map((quote) => {
        return {
          symbol: quote.symbol,
          longname: quote.longname,
          shortname: quote.shortname,
          type: quote.typeDisp,
        };
      });

      console.log(filteredResult);

    return NextResponse.json(filteredResult);
  } catch (error) {
    // You might want to log the error or return it in the response
    // For better error handling, you can customize the status code and the message
    return new NextResponse(JSON.stringify({error: (error as Error).message}), {
      status: 500,
    });
  }
}

export const GET = handler;
