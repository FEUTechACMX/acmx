'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { MoreHorizontal, Heart } from 'lucide-react'
import MainLayout from "~/components/Forum/layout/main-layout"
import { CodeBlock } from "~/components/Forum/post/code-block"

// This would normally come from an API or database
const getPostById = (id: string) => ({
  id,
  author: {
    name: "SolanglYnv",
    username: "solanglynv",
    avatar: "/placeholder.svg",
    date: "12 November 2023 16:45"
  },
  title: "How to patch KDE on FreeBSD?",
  content: "At magna sed nec nisi mattis. Magna cursus tincidunt mocus imperdiet fermentum pretium, pharetra nisi. Euismod.",
  code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`,
  additionalContent: "Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisi sagittis fringilla justo bibendum.",
  tags: ["pro", "javascript", "web"],
  likes: 125,
  comments: [
    {
      id: '1',
      author: {
        name: "unknkd",
        avatar: "/placeholder.svg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in acculis. Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisi nulla placerat dignissim ipsum arcu.",
      date: "12 November 2023 16:45"
    }
  ]
})

export default function PostPage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''
  
  const [post, setPost] = useState(getPostById(id))
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // In a real app, you would fetch the post data here
    setPost(getPostById(id))
  }, [id])

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1)
    } else {
      setLikes(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj = {
        id: String(comments.length + 1),
        author: {
          name: "Current User",
          avatar: "/placeholder.svg",
        },
        content: newComment,
        date: new Date().toLocaleString()
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
    }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            {/* Author Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">@{post.author.username}</div>
                  <div className="text-sm text-muted-foreground">{post.author.date}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-muted-foreground">{post.content}</p>
              
              <CodeBlock code={post.code} language="go" />
              
              <p className="text-muted-foreground">{post.additionalContent}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Vote Button */}
            <div className="mt-6">
              <Button 
                className="w-full" 
                variant={isLiked ? "default" : "secondary"}
                onClick={handleLike}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {likes} Votes
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-lg font-semibold">Comments</h2>
              
              {comments.map(comment => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">@{comment.author.name}</span>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex gap-2 items-start mt-6">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input 
                    placeholder="Type here your wise suggestion" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit">Suggest</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

