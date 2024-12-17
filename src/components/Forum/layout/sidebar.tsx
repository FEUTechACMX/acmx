'use client'

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Home, HelpCircle, Hash, Settings, LogOut } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "../theme-toggle"

export function Sidebar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/forum/', label: 'Home', icon: Home },
    { href: '/forum/questions', label: 'Questions', icon: HelpCircle },
    { href: '/forum/topics', label: 'Topics', icon: Hash },
    { href: '/forum/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="border-r bg-card w-[240px] h-screen sticky top-0 p-4 flex flex-col">
      <div className="flex-1 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Button
            key={href}
            variant={pathname === href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === href && "bg-primary/10"
            )}
            asChild
          >
            <Link href={href}>
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="border-t pt-4 space-y-4">
        <ThemeToggle />
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}

