import { fetchUser, fetchUserPost } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { getReactionsData } from "@/lib/actions/thread.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async({currentUserId, accountId, accountType}: Props) => {

    //fetch profile threads

    
    let result = await fetchUserPost(accountId);
    
    if(!result) redirect('/');

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    const reactionsData = await getReactionsData({
      userId: userInfo._id,
      posts: result.threads,
    });
  
    const { childrenReactions, childrenReactionState } = reactionsData;
  

    return(
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any, idx: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}

                    author={accountType === 'User' 
                        ? {name: result.name, image: result.image, id: result.id}
                        : {name: thread.author.name, image:  thread.author.image, id:  thread.author.id}}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    reactions={childrenReactions[idx].users}
                    reactState={childrenReactionState[idx]}
                />
            ))}
        </section>
    )
}

export default ThreadsTab;