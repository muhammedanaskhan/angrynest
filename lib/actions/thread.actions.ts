'use server';

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { connect } from "mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const createThread = await Thread.create({
            text,
            author,
            community: null,
        })

        //update user model, push that thread to user who created it...
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`)
    }



}

export async function fetchPosts(pageNumber = 1, pageSize: 20) {
    connectToDB();

    //calculate the number of posts to skip
    const skipAmount = pageSize * (pageNumber - 1);

    //fetch posts that that have no parents (top-level threads....)
    const postsQuery = await Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })// populating the creator
        .populate({ //populating the children
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: '_id name parentId image'
            }
        })


    // only top level threads
    const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

    const posts = postsQuery;

    //do we have a next page
    const isNext = totalPostCount > skipAmount + posts.length;

    return {
        posts,
        isNext,
    }

}

export async function fetchThreadById(id: string) {
    connectToDB();

    try {
        //todo: populate community

        const thread = await Thread.findById(id)
            .populate({
                path: 'author', //defines which field we want to populate from another collection
                model: User,    //retrieve from User model(collection) to populate author field
                select: '_id id name image' //select which feilds we need from Author
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }, {
                        path: 'children',
                        populate: {
                            path: 'author',
                            model: Thread,
                            populate: {
                                path: 'author',
                                model: User,
                                select: '_id id name parentId image'
                            }
                        }
                    }]
            }).exec();

            return thread;
    } catch (error: any) {
        throw new Error(`Failed to fetch thread by id: ${error.message}`)
    }
}