'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Search, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet"
import { SideNav } from "./side-nav"

export function MainNav() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query.toString())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SideNav />
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-4 lg:space-x-6 mx-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Search questions..."
                defaultValue={searchParams.get('q') ?? ''}
                className="pl-8 w-full md:w-[300px]"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/questions/ask">Ask Question</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}


