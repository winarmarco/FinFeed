import { Input } from "@/components/ui/input";
import TrendingBarItem from "./trendingbar-item";

interface TrendingBar {

}

const TrendingBar: React.FC<{}> =() => {
  return <nav className="hidden lg:block min-h-screen divide-y w-20 lg:w-[300px]">
    <div className="fixed w-20 lg:w-[300px] h-full top-0 flex flex-col divide-y justify-start md:px-4 py-10">
        <Input name="search" placeholder="Search" />

        <div className="py-4 px-2">
          <h3 className="text-lg font-bold">Trending</h3>
          <div className="flex flex-col gap-y-4">
            <TrendingBarItem />
            <TrendingBarItem />
            <TrendingBarItem />
            <TrendingBarItem />
          </div>

        </div>
    </div>
  </nav>
}


export default TrendingBar;