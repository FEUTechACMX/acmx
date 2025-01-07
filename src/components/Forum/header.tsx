"use client"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Menu, Search, X } from 'lucide-react'
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { useState } from "react"
import { MobileNav } from "./mobile-nav"
import { cn } from "~/lib/utils"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // In a real app, this would be an API call
    const results = await fetch(`/api/forum/search?q=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .catch(() => [])

    setSearchResults(results)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] max-w-sm p-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <Link href="/forum" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">ACMX FORUM</span>
        </Link>

        <div className="flex-1 flex items-center justify-end lg:justify-center px-2">
          <form
            onSubmit={handleSearch}
            className={cn(
              "relative w-full max-w-2xl",
              isSearchOpen ? "flex" : "hidden lg:flex"
            )}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="w-full pl-8 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearchOpen && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-background border rounded-md shadow-lg">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/forum/questions/${result.id}`}
                    className="block p-2 hover:bg-accent rounded-md"
                  >
                    {result.title}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </Button>
          <Button asChild>
            <Link href="/forum/questions/ask">Create Post</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

