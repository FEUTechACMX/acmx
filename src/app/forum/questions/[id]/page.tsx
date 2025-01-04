import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import { getQuestion } from "@/app/actions/questions"
import { ReplyForm } from "./reply-form"
import { ReplyList } from "./reply-list"

export default async function QuestionPage({
  params,
}: {
  params: { id: string }
}) {
  let question
  try {
    question = await getQuestion(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar>
            <AvatarImage src={question.author.image || ''} />
            <AvatarFallback>{question.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{question.title}</h1>
            <p className="text-sm text-muted-foreground">
              Posted by {question.author.name} on {new Date(question.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            {question.content}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{question._count.votes}</span>
              </Button>
              <Button variant="ghost" size="icon" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{question._count.replies}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {question._count.replies} Replies
        </h2>
        <Suspense fallback={<ReplyListSkeleton />}>
          <ReplyList questionId={question.id} />
        </Suspense>
        <ReplyForm questionId={question.id} />
      </div>
    </div>
  )
}

function ReplyListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


