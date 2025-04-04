"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Menu, Search, X } from 'lucide-react'
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useState } from "react"
import { useRouter } from "next/navigation"

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link
        href="/forum"
        className="text-sm font-medium hover:underline"
      >
        Home
      </Link>
      <Link
        href="/forum/questions"
        className="text-sm font-medium hover:underline"
      >
        Questions
      </Link>
      <Link
        href="/forum/topics"
        className="text-sm font-medium hover:underline"
      >
        Topics
      </Link>
      <Link
        href="/forum/search"
        className="text-sm font-medium hover:underline"
      >
        Search
      </Link>
    </div>
  )
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
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
        <Link href="/forum" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">Forum App</span>
        </Link>
        <div className="flex flex-1 items-center justify-end md:justify-center">
          <form
            onSubmit={handleSearch}
            className={`flex w-full max-w-sm items-center md:max-w-2xl transition-all duration-300 ease-in-out ${
              isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 md:scale-100 md:opacity-100"
            }`}
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
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle search</span>
          </Button>
          <Button variant="default" asChild className={isSearchOpen ? "hidden md:flex" : "flex"}>
            <Link href="/forum/questions/ask">Ask a Question</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

