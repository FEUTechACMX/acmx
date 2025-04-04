"use client"

import { useState } from "react"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Search } from 'lucide-react'
import Link from "next/link"

// This would typically come from an API or database
const initialTags = [
  { name: "react", count: 120, description: "A JavaScript library for building user interfaces" },
  { name: "javascript", count: 230, description: "A high-level, interpreted programming language" },
  { name: "nextjs", count: 95, description: "The React Framework for Production" },
  { name: "typescript", count: 85, description: "A typed superset of JavaScript that compiles to plain JavaScript" },
  { name: "tailwindcss", count: 70, description: "A utility-first CSS framework for rapid UI development" },
  { name: "nodejs", count: 110, description: "A JavaScript runtime built on Chrome's V8 JavaScript engine" },
  { name: "database", count: 65, description: "Organized collection of data stored and accessed electronically" },
  { name: "api", count: 80, description: "Application Programming Interface for software communication" },
  { name: "frontend", count: 100, description: "The client-side development of websites and web applications" },
  { name: "backend", count: 90, description: "Server-side development focusing on databases, scripting, and website architecture" },
  { name: "fullstack", count: 50, description: "Development involving both front-end and back-end technologies" },
  { name: "performance", count: 40, description: "Optimization of web applications for speed and efficiency" },
]

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tags, setTags] = useState(initialTags)

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Topics</h1>
      <div className="mb-6 relative">
        <Input
          type="search"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTags.map(tag => (
          <Link href={`/forum/questions?tag=${tag.name}`} key={tag.name} className="border rounded-lg p-4 hover:bg-accent transition-colors duration-200">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary" className="text-sm">
                {tag.name}
              </Badge>
              <span className="text-sm text-gray-500">{tag.count} questions</span>
            </div>
            <p className="text-sm text-muted-foreground">{tag.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

