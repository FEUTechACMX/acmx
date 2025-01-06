"use client"

import { Button } from '../ui/button'
import { Input } from "../ui/input"
import { Menu, Search } from 'lucide-react'
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { cn } from '~/lib/utils'
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] max-w-sm pt-14">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">ACMX FORUM</span>
        </Link>
        <div className="flex flex-1 items-center justify-center px-2">
          <form
            onSubmit={handleSearch}
            className={cn(
              "flex w-full max-w-2xl items-center",
              isSearchOpen ? "block" : "hidden md:flex"
            )}
          >
            <div className="relative flex flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </Button>
          <Button variant="default" asChild>
            <Link href="/forum/questions/ask">Create Post</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link
        href="/"
        className="text-sm font-medium hover:underline"
      >
        Home
      </Link>
      <Link
        href="/questions"
        className="text-sm font-medium hover:underline"
      >
        Questions
      </Link>
      <Link
        href="/tags"
        className="text-sm font-medium hover:underline"
      >
        Tags
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium hover:underline"
      >
        Settings
      </Link>
    </div>
  )
}

