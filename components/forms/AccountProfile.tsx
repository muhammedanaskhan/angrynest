'use-client'

import * as z from "zod"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from '@hookform/resolvers/zod';
import userValidation from "@/lib/validations/user";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const form = useForm({  // hook to work with form
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: '',
            username: '',
            name: '',
            bio: '',
        }
    })
    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        e.preventDefault();
    }
    function onSubmit(values: z.infer<typeof userValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-10">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-4">
                                <FormLabel className="account-form_image-label">
                                    {field.value ?
                                        <Image src={field.value} alt="profile" width={96} height={96} priority className="rounded-full object-contain" />
                                        : <Image src="/assets/profile.svg" alt="profile" width={24} height={24} className="object-contain" />}
                                </FormLabel>
                                <FormControl className="flex-1 text-base1-semibold text-gray-200">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        placeholder="Upload a photo"
                                        className="account-form_image-input"
                                        onChange={(e) => handleImage(e, field.onChange)} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                                <FormLabel className="text-base-semibold text-light-2 ">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="account-form_input no-focus"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                                <FormLabel className="text-base-semibold text-light-2 ">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="account-form_input no-focus"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                                <FormLabel className="text-base-semibold text-light-2 ">
                                    Bio
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={3}
                                        className="account-form_input no-focus"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-primary-500">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default AccountProfile;