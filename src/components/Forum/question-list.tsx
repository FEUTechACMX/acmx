'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, MessageSquare, ThumbsUp } from 'lucide-react'
import type { Question, User, Tag } from "@prisma/client"

// Define the shape of our question data
interface QuestionWithAuthorAndTags extends Question {
  author: User
  tags: Tag[]
  _count: {
    replies: number
    votes: number
  }
}

interface QuestionItemProps {
  question: QuestionWithAuthorAndTags
}

// QuestionItem component to render individual question cards
export function QuestionItem({ question }: QuestionItemProps) {
  const router = useRouter()

  // Handle click on the question card
  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/questions/${question.id}`)
  }

  // Handle voting on a question
  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement voting logic
  }

  return (
    <Card 
      onClick={handleClick}
      className="cursor-pointer hover:border-primary transition-colors"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={question.author.image || ''} />
          <AvatarFallback>{question.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold hover:underline">
            {question.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Posted by {question.author.name}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{question.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Button 
            variant="ghost" 
            size="icon" 
            className="gap-2"
            onClick={handleVote}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{question._count.votes}</span>
          </Button>
          <Button variant="ghost" size="icon" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{question._count.replies}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// QuestionList component to render a list of questions
export function QuestionList({ questions }: { questions: QuestionWithAuthorAndTags[] }) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}


