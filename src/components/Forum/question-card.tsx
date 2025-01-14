"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import Link from "next/link"

interface QuestionCardProps {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  likes: number
  dislikes: number
  replies: number
  createdAt: string
}

export function QuestionCard({ id, title, content, author, tags, likes: initialLikes, dislikes: initialDislikes, replies, createdAt }: QuestionCardProps) {
  const [likes, setLikes] = useState(initialLikes || 0)
  const [dislikes, setDislikes] = useState(initialDislikes || 0)

  const handleVote = (type: 'like' | 'dislike') => {
    if (type === 'like') {
      setLikes(prevLikes => prevLikes + 1)
    } else {
      setDislikes(prevDislikes => prevDislikes + 1)
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>
        </div>
        <CardTitle className="mt-2">
          <Link href={`/forum/questions/${id}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content.substring(0, 150)}...</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => handleVote('like')}>
            <ThumbsUp className="mr-1 h-4 w-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleVote('dislike')}>
            <ThumbsDown className="mr-1 h-4 w-4" />
            {dislikes}
          </Button>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/forum/questions/${id}`}>
            <MessageSquare className="mr-1 h-4 w-4" />
            {replies} Replies
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

