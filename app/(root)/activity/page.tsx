import React from 'react'
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

async function page() {

  const user = await currentUser(); 
  if(!user)return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');
  
  //getActivity
  const activity = await getActivity(userInfo._id);

  //TODO: use this to fill replies tab in profile section
  
  return (
    <section>
        <h1>Activity</h1>
        <section className="mt-10 flex flex-col gap-5">
          {activity.length > 0 ? (
            activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>

                <article className='activity-card'>
                  <Image src={activity.author.image} alt='profile' width={20} height={20} className='rounded-full object-cover' />
                  <p>
                    <span className='mr-1 text-sky-500'>{activity.author.name}</span>{" "}replied to your thread
                  </p>
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

export default page;