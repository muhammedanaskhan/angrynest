'use client'

import { addReactToThread } from "@/lib/actions/thread.actions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Loader from "../loader/loader"
import { useState } from "react"
import { set } from "nprogress"


interface Props {
    threadId: string,
    currentUserId: string,
    interactState?: boolean,
    isComment?: boolean,
    parentId?: number | null,
}

const ReactThread = ({
    threadId,
    currentUserId,
    interactState = false,
    isComment = false,
    parentId = null,
}: Props) => {

    const pathname = usePathname()
    const [loading , setLoading] = useState(false)

    const [liked, setLiked] = useState(interactState); // Initially set to the current state

    const handleClick = async () => {
        try {
            setLiked(!liked);
            await addReactToThread({
                threadId,
                userId: currentUserId,
                path: pathname
            })
        } catch (error) {
            console.log(error)
            setLiked(!liked);
        }
    }

    return (
        <>
            {loading && <Loader/>}
            <Image
                src={`/assets/heart-${liked ? "filled" : "gray"}.svg`}
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
                onClick={handleClick}
            />
        </>

    )
}

export default ReactThread;