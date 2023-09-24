'use client'

import { sidebarLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
function LeftSidebar() {

    const pathname = usePathname()
    const Router = useRouter()

    const {userId} = useAuth();

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link, index) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || (pathname === link.route)
                    if(link.route === '/profile') link.route = `${link.route}/${userId}`
                    return (
                        <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive ? 'text-white' : 'text-zinc-500'} ${isActive && 'bg-zinc-950'}`}>
                            {isActive ? (
                                <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            ) : (
                                <Image src={link.darkimgURL} alt={link.label} width={24} height={24} />
                            ) }
                            {/* <Image src={link.imgURL} alt={link.label} width={24} height={24} /> */}
                            <p className='max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div className='mt-10 px-6'>
                <SignedIn>
                    <SignOutButton signOutCallback={() => Router.push('/sign-in')}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image src='/assets/logout_dark.svg' width={20} height={20} alt='logout' />
                            <p className='text-zinc-500 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSidebar;