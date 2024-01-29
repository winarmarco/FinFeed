import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TradeSuggestionCardProps {
  symbol: string,
  initialPrice: number,
  predictionPrice: number,
}

const TradeSuggestionCard: React.FC<TradeSuggestionCardProps> = ({
  symbol,
  initialPrice,
  predictionPrice,
}) => {

  const currentPrice = (initialPrice + predictionPrice) / 3;

  const pnlFromInit = parseFloat(String((predictionPrice - initialPrice) / initialPrice * 100)).toFixed(2);
  const currentPnl = parseFloat(String((currentPrice - initialPrice) / initialPrice * 100)).toFixed(2); 

  return (
    <Card className="w-full flex flex-col px-4 py-4">
      <CardHeader className="p-0 border-b-2 py-2">
        <CardTitle>{symbol}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-row border-b-2 py-2">
          <div className="flex-1">
            <CardDescription>Prediction Price:</CardDescription>
            <CardTitle>${predictionPrice}</CardTitle>
          </div>
          <div className="max-w-[100px] bg-green-400 px-2 flex items-center rounded text-white">
            LONG
          </div>
        </div>

        <div className="py-2 grid grid-cols-2 gap-2">
          <div>
            <CardDescription>Initial Price</CardDescription>
            <CardTitle>${initialPrice}</CardTitle>
          </div>

          <div>
            <CardDescription>Current Price</CardDescription>
            <CardTitle>${parseFloat(String(currentPrice)).toFixed(2)}</CardTitle>
          </div>

          <div>
            <CardDescription>Profit/Loss (from Initial price)</CardDescription>
            <CardTitle className="text-green-600">+{pnlFromInit}%</CardTitle>
          </div>

          <div>
            <CardDescription>Current Profit/Loss</CardDescription>
            <CardTitle className="text-green-600">+{currentPnl}%</CardTitle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeSuggestionCard;
