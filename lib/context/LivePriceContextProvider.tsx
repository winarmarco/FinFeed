"use client";

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import protoBuf from "protobufjs";
import { Buffer as BufferJS } from "buffer";

const YAHOO_FINANCE_STREAM_URL = "wss://streamer.finance.yahoo.com/";
const YAHOO_FINANCE_PROTO_URL = "./YPricingData.proto";


export interface LivePrice {
  symbol: string;
  price: number;
  change: number;
  currency: string;
}

export interface TickerLivePrice {
  [symbol: string]: LivePrice;
}

interface ILivePriceContext {
  subscribedLivePrice: TickerLivePrice,
  subscribedSymbol: String[],
  setSubscribedSymbol: Dispatch<SetStateAction<String[]>>;
}

export const LivePriceContext = createContext<ILivePriceContext | null>(null);


export const LivePriceContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [subscribedSymbol, setSubscribedSymbol] = useState<String[]>([]);
  const [subscribedLivePrice, setSubsribedLivePrice] = useState<TickerLivePrice>({});

  useEffect(() => {
    if (!subscribedSymbol) return;
    
    const ws = new WebSocket(YAHOO_FINANCE_STREAM_URL);

    protoBuf
      .load(YAHOO_FINANCE_PROTO_URL)
      .then((root) => {
        const YaTicker = root.lookupType("yaticker");

        ws.onopen = () => {
          console.log("Websocket connection opened.");
          ws.send(JSON.stringify({ subscribe: subscribedSymbol }));
        };

        ws.onerror = (event) => {
          console.error("Websocket error", event);
        };
    
        ws.onclose = (event) => {
          console.log("Websocket closed", event);
        };
    
        ws.onmessage = (event) => {
          const message = new BufferJS(event.data, "base64");
          const data = YaTicker.decode(message).toJSON();

          const livePriceData: LivePrice= {
            price: data.price,
            symbol: data.id,
            change: data.changePercent,
            currency: data.currency,
          }

          console.log("MESSAGE", data);
          setSubsribedLivePrice((prevValue) => {
            return {
              ...prevValue,
              [data.id]: livePriceData,
            };
          });
        };
      })
      .catch((err) => {
        console.error("Protobuf error:", err);
      });
  }, [subscribedSymbol]);

  return (
    <LivePriceContext.Provider value={{ subscribedLivePrice, subscribedSymbol, setSubscribedSymbol }}>
      {children}
    </LivePriceContext.Provider>
  );
};