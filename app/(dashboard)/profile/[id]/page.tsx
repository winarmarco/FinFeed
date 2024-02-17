import { ArrowLeft, Bell, BellPlus, Check, User } from "lucide-react";
import FeedCard from "../../_components/feed-card/feed-card";
import { FeedScroll } from "../../_components/feed-scroll";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  return       <div className="py-2 w-full flex items-center px-4 sticky top-0 bg-white z-[10] border-b shadow">
  <ArrowLeft />
  <div className="flex flex-col pl-4 items-start">
    <p className="font-semibold text-lg">Display name</p>
    <p className="text-gray-400 text-sm">
      <span>200k</span> followers
    </p>
  </div>
</div>
}

const UserProfile = () => {
  return (
    <div className="relative pb-10">
     <div className="w-full h-[200px] relative bg-red-50 z-[-10]">
      <Image
        fill
          src="https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="bg-image"
          className="object-cover"
        />
     </div>
      <div className="flex flex-col px-6 gap-y-4 z-10 bg-white">
        <div className="flex flex-row items-center gap-x-4 justify-between">
          <div className="w-[128px] h-[128px] bg-slate-100 rounded-full flex items-center justify-center mt-[-64px] border-[6px] border-white">
            <User className="w-8 h-8"/>
          </div>
          <div className="flex flex-row gap-x-4">
          <Button variant={"outline"} className="rounded-full"><BellPlus /></Button>
          <Button className="flex flex-row gap-x-1">Following <Check className="w-4 h-4"/></Button>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Display name</p>

          <p className="text-gray-400">@username</p>
        </div>

        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque hic ab
          magni vero necessitatibus laboriosam vel suscipit maiores iste nobis?
          Tenetur aspernatur et quae nam ex mollitia veritatis possimus? Cumque.
        </p>

        <div className="flex flex-row gap-x-4">

          <p className="text-gray-400">
            <span className="text-lg text-black font-semibold">200k</span> following
          </p>

          <p className="text-gray-400">
            <span className="text-lg text-black font-semibold">200k</span> followers
          </p>
        </div>
      </div>
    </div>
  );
};

const UserPost = () => {
  return (
    <div>
      <FeedScroll />
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col divide-y-2">
      <UserProfile />

      <UserPost />
      </div>
    </div>
  );
};

export default ProfilePage;
