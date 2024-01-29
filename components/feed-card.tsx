import { User } from "lucide-react";
import CallCard from "./trade-suggestion-card";


const FeedCard = () => {
  return <div className="flex flex-col gap-y-4 px-6 py-10">
    <div className="flex flex-row gap-x-2">
      <div className="p-2 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-slate-200"><User /></div>
      <div className="flex flex-col">
        <p>Name</p>
        <p className="text-gray-500 text-sm">15/01/2023 23.21</p>
      </div>
    </div>
    <CallCard 
      symbol={"BTC/USDT"}
      initialPrice={30000}
      predictionPrice={100000}
    />

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut exercitationem porro corrupti soluta totam odit sunt, quam placeat adipisci, id magnam laudantium pariatur velit neque, vel dolorem molestiae corporis unde!
    </p>
  </div>
}

export default FeedCard;