import { UserButton } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'
export default function Home() {

  return (
      <div>
        {/* <UserButton afterSignOutUrl="/" /> */}
        <h1 className="head-text text-left">Home</h1>
      </div>

  )
}

