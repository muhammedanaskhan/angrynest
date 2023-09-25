import React from 'react'
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateWithMeasure, truncateString } from '@/lib/utils';

async function page() {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  //getActivity
  const activity = await getActivity(userInfo._id);

  //TODO: use this to fill replies tab in profile section

  return (
    <section>
      <h1>Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity?.length > 0 ? (
          activity.map((activity: any) => (
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>

              <article className='activity-card'>
                <Image src={activity.author.image} alt='profile' width={20} height={20} className='rounded-full object-cover' />
                <ActivityComponent
                  author={activity.author}
                  createdAt={activity.createdAt}
                  parentId={activity.parentId}
                  activityType={activity.activityType}
                  text={activity.text}
                />
              </article>
            </Link>
          ))
        ) : (
          <p className='!text-base-regular text-zinc-950'>No Activity yet..</p>
        )}
      </section>
    </section>
  )
}

const ActivityComponent = ({ author, createdAt, activityType, text }: any) => (
  <p className="!text-small-regular text-zinc-950 flex flex-row justify-between w-full">
    <div className='flex flex-row gap-1'>
      <Link key={author._id} href={`/profile/${author.id}`}>
        <span className="text-sky-500">{author.name}{" "}</span>
      </Link>
        {activityType === "follow" && " followed you"}
        {activityType === "reaction" && " liked your post"}
        {text && `replied to your thread: "${truncateString(text, 100)}"`}{" "}
    </div>
    <span className="text-gray-1">{formatDateWithMeasure(createdAt)}</span>
  </p>
);

export default page;