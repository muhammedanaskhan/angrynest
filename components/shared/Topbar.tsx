

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton, OrganizationSwitcher, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { fetchUser } from "@/lib/actions/user.actions";
  
async function Topbar() {

    const user = await currentUser();
    if(!user)return null;

    console.log("user",user)
    const userInfo = await fetchUser(user.id);

    return (
        <nav className='topbar'>
            <Link href='/' className="flex items-center gap-2">
                <Image src='/c_logo.png' width={32} height={32} alt='logo' />
                <p className="text-heading3-bold text-dark max-xs:hidden">Communet</p>
            </Link>


            <div className="flex items-center gap-2">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src='/assets/logout_dark.svg' width={20} height={20} alt='logout' />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <Image src={userInfo.image} width={32} height={32} alt='logo' className="rounded-full object-cover" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`profile/${user.id}`}><DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    )
}

export default Topbar;