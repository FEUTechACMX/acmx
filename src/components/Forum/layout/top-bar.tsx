'use client'

import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Search } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"

export function TopBar() {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search a Topic" className="pl-8" />
          </div>
          <Button>Create Post</Button>
        </div>
        <Tabs defaultValue="trending">
          <TabsList>
            <TabsTrigger value="trending">Top trending</TabsTrigger>
            <TabsTrigger value="topics">Trending topics</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

