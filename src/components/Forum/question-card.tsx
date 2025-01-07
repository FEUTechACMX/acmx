import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { MoreHorizontal, ThumbsUp, MessageSquare } from 'lucide-react'

interface QuestionCardProps {
  id: string
  title: string
  content: string
  author: {
    name: string
    image?: string | null
  }
  tags: string[]
  votes: number
  replies: number
  createdAt: string
}

export function QuestionCard({
  id,
  title,
  content,
  author,
  tags,
  votes,
  replies,
  createdAt,
}: QuestionCardProps) {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.image || undefined} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/questions/${id}`} className="font-semibold hover:underline">
              {title}
            </Link>
            <p className="text-sm text-muted-foreground">
              Posted by {author.name} • {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <span className="text-sm">{votes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">{replies} replies</span>
        </div>
        <div className="flex-1" />
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

