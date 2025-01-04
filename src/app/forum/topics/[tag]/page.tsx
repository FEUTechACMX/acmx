import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { QuestionList } from "~/components/Forum/question-list"
import { prisma } from "~/lib/forum/db"

interface TopicPageProps {
  params: {
    tag: string
  }
}

export default function TopicPage({ params }: TopicPageProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TopicHeaderSkeleton />}>
        <TopicHeader tag={params.tag} />
      </Suspense>

      <Suspense fallback={<QuestionListSkeleton />}>
        <TopicQuestions tag={params.tag} />
      </Suspense>
    </div>
  )
}

async function TopicHeader({ tag }: { tag: string }) {
  const tagData = await prisma.tag.findUnique({
    where: { name: tag },
    include: {
      _count: {
        select: { questions: true }
      }
    }
  })

  if (!tagData) {
    notFound()
  }

  // Get related tags (tags that appear together with this tag)
  const relatedTags = await prisma.tag.findMany({
    where: {
      questions: {
        some: {
          tags: {
            some: {
              name: tag
            }
          }
        }
      },
      NOT: {
        name: tag
      }
    },
    take: 5,
    include: {
      _count: {
        select: { questions: true }
      }
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg font-semibold">
            {tagData.name}
          </Badge>
          <span className="text-muted-foreground text-base font-normal">
            {tagData._count.questions} questions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((relatedTag) => (
              <Button
                key={relatedTag.id}
                variant="outline"
                size="sm"
                asChild
              >
                <a href={`/topics/${relatedTag.name}`}>
                  {relatedTag.name}
                  <span className="ml-1 text-muted-foreground">
                    × {relatedTag._count.questions}
                  </span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

async function TopicQuestions({ tag }: { tag: string }) {
  const questions = await prisma.question.findMany({
    where: {
      tags: {
        some: {
          name: tag
        }
      }
    },
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          replies: true,
          votes: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!questions.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No questions found for this topic.</p>
      </div>
    )
  }

  return <QuestionList questions={questions} />
}

function TopicHeaderSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function QuestionListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


