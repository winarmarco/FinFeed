import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { LivePriceContext, TickerLivePrice } from "./LivePriceContextProvider";

interface IUseLivePrice {
  callback?: (ticker: TickerLivePrice) => void;
}

export const useLivePrice = ({ callback }: IUseLivePrice) => {
  const context = useContext(LivePriceContext);
  const callbackRef = useRef(callback);

  if (context == undefined || !context.setSubscribedSymbol) {
    throw new Error("useLivePrice must be used within a 'LivePriceProvider'");
  }

  const { livePrice } = context;

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (callbackRef.current && Object.keys(livePrice).length > 0) {
      callbackRef.current(livePrice);
    }
  }, [livePrice]);

  return context;
};
