import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";

function Topbar() {
    return (
        <nav className='topbar'>
            <Link href='/' className="flex items-center gap-4">
                <Image src='/logo.png' width={28} height={28} alt='logo' />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">Communet</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src='/assets/logout.svg' width={20} height={20} alt='logout' />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4"
                        }
                    }}
                />
            </div>
        </nav>
    )
}

export default Topbar;