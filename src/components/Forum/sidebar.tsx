"use client"

import Link from "next/link"
import { cn } from "~/lib/utils"
import { Home, MessageSquare, Tags, Settings, LogOut } from 'lucide-react'
import { ModeToggle } from "./mode-toggle"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    // Add your logout logic here
    // For example:
    // await signOut()
    router.push('/login')
  }

  return (
    <aside className={cn("flex flex-col h-full justify-between py-6", className)} {...props}>
      <nav className="space-y-1">
        <Link
          href="/forum"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/forum/questions"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Questions</span>
        </Link>
        <Link
          href="/forum/tags"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
        >
          <Tags className="h-4 w-4" />
          <span>Topics</span>
        </Link>
        <Link
          href="/forum/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="space-y-2">
        <ModeToggle />
        <Button
          variant="secondary"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

