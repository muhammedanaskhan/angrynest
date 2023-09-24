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
import { Textarea } from "@/components/ui/textarea";

// import { updateUser } from "@/lib/actions/user.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import Loader from "../loader/loader";
import { useState } from "react";

import { useOrganization } from "@clerk/nextjs";

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

function PostThread({ userId }: { userId: string }) {

    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    const { organization } = useOrganization();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        setIsLoading(true);
        if (!organization) {
            await createThread({
                text: values.thread,
                author: userId,
                communityId: null,
                path: pathname,
            })
        }else{
            await createThread({
                text: values.thread,
                author: userId,
                communityId: organization.id,
                path: pathname,
            })
        }



        router.push('/')
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            {isLoading && <Loader />}
            <form
                className=' mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
                id="formname">

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-dark'>
                                Content
                            </FormLabel>
                            <FormControl className=' no-focus  bg-white text-dark'>
                                <Textarea
                                    rows={15}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <Button type="submit" className="bg-zinc-950">
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}

export default PostThread;