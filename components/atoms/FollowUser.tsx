"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { followUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import Loader from "../loader/loader"

interface Props {
  userId: string;
  currentUserId: string;
  isFollowing?: boolean;
}

const FollowUser = ({ userId, currentUserId, isFollowing = false }: Props) => {
  const pathname = usePathname();

  const [loading , setLoading] = useState(false)


  const handleClick = async () => {
    setLoading(true);
    await followUser({
      followerId: currentUserId,
      followedId: userId,
      path: pathname,
    });
    setLoading(false);
  };

  return (
    <>
    {loading && <Loader/>}
    <Button size="sm" className="follow-card_btn" onClick={handleClick}>
      <div className="flex cursor-pointer gap-3 rounded-lg">
        <Image src="/assets/user.svg" alt="logout" width={16} height={16} />

        <p className="text-light-2 max-sm:hidden">
          {isFollowing ? "Unfollow" : "Follow"}
        </p>
      </div>
    </Button>
    </>
    
  );
};

export default FollowUser;