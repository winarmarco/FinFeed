import Link from "next/link";

interface TrendingBarItemProps {

}

const TrendingBarItem: React.FC<TrendingBarItemProps> = () => {
  return (
    <Link href="/">
      <div className="px-2 py-2 flex flex-col hover:bg-slate-100 transition-bg cursor-pointer rounded">
        <p className="text-lg font-semibold">BTC/USDT</p>
        <span className="text-sm text-gray-500">1000 post</span>
      </div>
    </Link>
  );
};

export default TrendingBarItem;
