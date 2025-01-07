import Link from "next/link"
import { Home, MessageSquare, Tags, Settings, LogOut } from 'lucide-react'
import { ModeToggle } from "./mode-toggle"
import { Button } from "../ui/button"

export function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <nav className="flex flex-col space-y-3">
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
      </div>
      <div className="space-y-4 mt-4">
        <ModeToggle />
        <Button
          variant="secondary"
          className="w-full justify-start gap-3"
          onClick={() => {
            // Add logout logic here
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

