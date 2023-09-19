import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs";

export default async function Home() {

  const result = await fetchPosts(1, 20);
  const user = await currentUser();

  return (
      <div>
        {/* <UserButton afterSignOutUrl="/" /> */}
        <h1 className="head-text text-left">Home</h1>
        <section className="flex flex-col mt-9 gap-10">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
              <>
                {result.posts.map((post) => (
                  <ThreadCard 
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id || ''}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                  />
                ))}
              </>
          )}
        </section>
      </div>

  )
}

