import { ArrowLeft, Bell, BellPlus, Check, User } from "lucide-react";
import FeedCard from "../../_components/feed-card/feed-card";
import { FeedScroll } from "../../_components/feed-scroll";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/_trpc/server";
import UserProfile from "./_components/user-profile";
import UserPost from "./_components/user-post";

const Header = () => {
  return (
    <div className="py-2 w-full flex items-center px-4 sticky top-0 bg-white z-[10] border-b shadow">
      <ArrowLeft />
      <div className="flex flex-col pl-4 items-start">
        <p className="font-semibold text-lg">Display name</p>
        <p className="text-gray-400 text-sm">
          <span>200k</span> followers
        </p>
      </div>
    </div>
  );
};


const ProfilePage = async () => {
  const user = await api.user.getCurrentUser.query();
  
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col divide-y-2">
        <UserProfile currentUser={{...user}}/>

        <UserPost />
      </div>
    </div>
  );
};

export default ProfilePage;
