"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { updateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import Loader from "../loader/loader";
import { useState } from "react";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {


    const router = useRouter();
    const pathname = usePathname();
    const[isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        console.log("onsubmithit");
        setIsLoading(true);
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        )

        form.reset(); // reset form after submit
        setIsLoading(false);
    }


    return (
        <Form {...form}>

            {isLoading && <Loader />}
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
                id="formname">

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="current user"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus outline-none text-dark"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )} />

                <Button type="submit" className="comment-form_btn">
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment;