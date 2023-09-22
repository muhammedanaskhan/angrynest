import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
function Topbar() {
    return (
        <nav className='topbar'>
            <Link href='/' className="flex items-center gap-2">
                <Image src='/c_logo.png' width={32} height={32} alt='logo' />
                <p className="text-heading3-bold text-dark max-xs:hidden">Communet</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src='/assets/logout_dark.svg' width={20} height={20} alt='logout' />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}

export default Topbar;