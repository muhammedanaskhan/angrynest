'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import { TypeOf } from "zod";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User
      .findOne({ id: userId })
    // .populate({
    //   path: 'communities',
    //   model: Community
    // });

  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}


export async function fetchUserPost(userId: string) {
  try {
    connectToDB();

    //todo: populate communityu
    const threads = await User
      .findOne({ id: userId })
      .populate({
        path: 'threads',
        model: Thread,
        populate: {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id'
          }
        }
      });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user POsts: ${error.message}`);
  }
}

export async function fetchUsers({ 
  userId,
  userIds,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
 } : {
  userId: string;
  userIds?: string[];
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
 }) {

  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }
    }

    if (userIds) {
      query._id = { $in: userIds };
    }

    if (searchString.trim() !== '' ) {
      query.$or = [
        { username: { $regex: regex} },
        { name: { $regex: regex} },
      ]
    }

    const sortOptions = {createdAt: sortBy};

    const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);
    
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return {users, isNext}

  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
  
}

export async function getActivity(userId: string) {
  try{

    connectToDB();

    //find all threads and comments by user
    const userThreads = await Thread.find({ author: userId });

    //collect all the child thread ids(replies) from the children field
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    },[]);

    //find all the replies that are not by the user itself
    const replies = await Thread.find({ 
      _id: { $in: childThreadIds },
      author: { $ne: userId }
    }).populate({
      path: 'author',
      model: User,
      select: 'name image _id'
    });

    return replies;

  }catch (error: any) {
    throw new Error(`Failed to fetch user activity: ${error.message}`);
  }
}

export async function fetchUsersByField(userId: string, field: string) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    const usersIds = user[field].map((user: any) => user.user);

    const users = await User.find({ _id: { $in: usersIds } });

    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function isUserFollowing(followerId: string, followedId: string) {
  try {
    connectToDB();

    const followed = await User.findOne({ id: followedId });

    const isFollowing = await User.findOne({
      id: followerId,
      following: { $elemMatch: { user: followed._id } },
    });

    return !!isFollowing;
  } catch (error: any) {
    throw new Error(`Failed to check if user is followed: ${error.message}`);
  }
}

export async function followUser({
  followerId,
  followedId,
  path,
}: {
  followerId: string;
  followedId: string;
  path: string;
}) {
  try {
    connectToDB();

    const follower = await User.findOne({ id: followerId });

    if (!follower) {
      throw new Error("Follower not found");
    }

    const followed = await User.findOne({ id: followedId });

    if (!followed) {
      throw new Error("Followed not found");
    }

    const isAlreadyFollowed = await isUserFollowing(followerId, followedId);

    if (isAlreadyFollowed) {
      follower.following.pull({
        user: followed._id,
      });
    } else {
      follower.following.push({
        user: followed._id,
      });
    }

    await follower.save();

    if (isAlreadyFollowed) {
      followed.followers.pull({
        user: follower._id,
      });
    } else {
      followed.followers.push({
        user: follower._id,
      });
    }

    await followed.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to follow user: ${error.message}`);
  }
}

export async function getUserFollowersIds(userId: string, key: string) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    const followersIds = user[key].map((folower: any) => folower.user);

    return followersIds;
  } catch (error: any) {
    throw new Error(`Failed to fetch user followers: ${error.message}`);
  }
}