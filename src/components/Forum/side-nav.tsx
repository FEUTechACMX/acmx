import Link from "next/link"
import { Button } from "../ui/button"
import { Home, MessageSquare, Hash, Settings, LogOut, Moon } from 'lucide-react'

export function SideNav() {
  return (
    <div className="pb-12 w-full md:w-[200px] lg:w-[250px]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Forum App
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/questions">
                <MessageSquare className="mr-2 h-4 w-4" />
                Questions
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/tags">
                <Hash className="mr-2 h-4 w-4" />
                Topics
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


