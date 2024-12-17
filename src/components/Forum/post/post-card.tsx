'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Heart, MessageCircle, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Link from "next/link"

interface PostCardProps {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  title: string
  content: string
  likes: number
  comments: number
  tags: string[]
  timeAgo: string
}

export function PostCard({
  id,
  author,
  title,
  content,
  likes,
  comments,
  tags,
  timeAgo,
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLiked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/forum/questions/${id}`}>
      <Card className="block transition-shadow hover:shadow-md">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{author.name}</span>
                <span className="text-sm text-muted-foreground">@{author.username}</span>
              </div>
              <p className="text-sm text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <div onClick={(e) => e.preventDefault()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold hover:underline">{title}</h3>
          <p className="text-sm text-muted-foreground">{content}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={isLiked ? 'text-primary' : ''}
            >
              <Heart className="mr-2 h-4 w-4" />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" onClick={(e) => e.preventDefault()}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {comments}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

