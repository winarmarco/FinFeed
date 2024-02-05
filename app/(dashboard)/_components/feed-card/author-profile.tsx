import { RouterOutput } from "@/server";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AuthorProfileProps {
  author: RouterOutput["post"]["getLatestPost"][0]["author"];
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ author }) => {
  const authorName = author.firstName + " " + author.lastName;
  return (
    <div className="flex flex-row gap-x-2">
      <div className="p-2">
        {author.imageUrl && (
          <Image
            src={author.imageUrl}
            alt={authorName}
            width="36"
            height="36"
            className="rounded-full"
          />
        )}

          {!author.imageUrl && <User />}
        
      </div>
      <div className="flex flex-col">
        <p>{authorName}</p>
        <p className="text-gray-500 text-sm">15/01/2023 23.21</p>
      </div>
    </div>
  );
};
