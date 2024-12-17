'use client'

import { useState } from 'react'
import MainLayout from '~/components/Forum/layout/main-layout'
import { PostCard } from "~/components/Forum/post/post-card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"

const initialPosts = [
  {
    id: '1',
    author: {
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg"
    },
    title: "How to patch KDE on FreeBSD?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat dapibus malesuada ut et nulla.",
    likes: 125,
    comments: 13,
    tags: ["linux", "kde"],
    timeAgo: "2h ago"
  },
  {
    id: '2',
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder.svg"
    },
    title: "Best practices for React hooks",
    content: "Exploring the best practices for using React hooks in your applications.",
    likes: 89,
    comments: 7,
    tags: ["react", "javascript"],
    timeAgo: "4h ago"
  },
  // Add more posts as needed
]

export default function Home() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('trending')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredPosts = initialPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setPosts(filteredPosts)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // In a real application, you would fetch different posts based on the active tab
    setPosts(initialPosts)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search a Topic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList>
            <TabsTrigger value="trending">Top trending</TabsTrigger>
            <TabsTrigger value="topics">Trending topics</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

