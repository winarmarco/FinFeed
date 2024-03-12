import { RouterOutput } from "@/server";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface AuthorProfileProps {
  author: RouterOutput["post"]["getPost"]["author"];
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
      <Link href={`/profile/${author.id}`} className="flex flex-col" passHref>
        <a onClick={(e) => {e.stopPropagation();}} className="hover:underline hover:underline-offset-2">{authorName}</a>
        <p className="text-gray-500 text-sm">15/01/2023 23.21</p>
      </Link>
    </div>
  );
};
