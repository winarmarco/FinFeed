"use client";

import { trpc } from "@/_trpc/client";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs";

import { BellPlus, Check } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const UserProfile: React.FC<{
  currentUser: {
    id: string;
  };
}> = ({
  currentUser
}) => {
  const pathName = usePathname();
  const userId = pathName.split("/")[2];
  const trpcUtils = trpc.useUtils();
  const {mutate: toggleFollowUser} = trpc.user.toggleFollowUser.useMutation({
    onSuccess: (data) => {
      trpcUtils.user.getUser.invalidate({id: userId});
    }
  });
  const {data: user} = trpc.user.getUser.useQuery({id: userId});

  if (!user) return null;
  const isMe = currentUser.id === userId;

  const {
    id,
    username,
    firstName,
    lastName,
    followersIds,
    totalFollowers,
    totalFollowing,
    imageUrl,
  } = user;


  const isFollowing = followersIds.indexOf(currentUser.id) != -1;
  const displayName = `${firstName} ${lastName}`;

  const toggleFollowing = async () => {
    const res = await toggleFollowUser({
      targetId: userId
    });
  }

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
          <Image
            src={imageUrl}
            width={128}
            height={128}
            alt="user-profile"
            className="rounded-full flex items-center justify-center mt-[-64px] border-[6px] border-white"
          />
          <div className="flex flex-row gap-x-4">
            {!isMe && (
              <>
                <Button variant={"outline"} className="rounded-full">
                  <BellPlus />
                </Button>
                <Button onClick={toggleFollowing} className="flex flex-row gap-x-1">
                  {isFollowing ? <>
                    Following <Check className="w-4 h-4" />
                  </> : 
                  <>
                    Follow
                  </>}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{displayName}</p>

          <p className="text-gray-400">@{username}</p>
        </div>

        <p className=""></p>

        <div className="flex flex-row gap-x-4">
          <p className="text-gray-400">
            <span className="text-lg text-black font-semibold">
              {totalFollowing}
            </span>{" "}
            following
          </p>

          <p className="text-gray-400">
            <span className="text-lg text-black font-semibold">
              {totalFollowers}
            </span>{" "}
            followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
