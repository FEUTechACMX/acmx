import { Suspense } from "react"
import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { prisma } from "~/lib/forum/db"

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">
          A tag is a keyword or label that categorizes your question with other, similar questions.
        </p>
        <div className="max-w-md">
          <Input
            type="search"
            placeholder="Filter by tag name..."
            className="w-full"
          />
        </div>
      </div>

      <Suspense fallback={<TopicsGridSkeleton />}>
        <TopicsGrid />
      </Suspense>
    </div>
  )
}

async function TopicsGrid() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { questions: true }
      },
      questions: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
        }
      }
    },
    orderBy: {
      questions: {
        _count: 'desc'
      }
    }
  })

  if (!tags.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tags found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag) => (
        <Card key={tag.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Link href={`/topics/${tag.name}`} className="hover:underline">
                <Badge variant="secondary" className="text-base font-semibold">
                  {tag.name}
                </Badge>
              </Link>
              <span className="text-muted-foreground text-sm">
                {tag._count.questions} questions
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tag.questions[0] ? (
                <>
                  Latest: "{tag.questions[0].title}" by {tag.questions[0].author.name}
                </>
              ) : (
                'No questions yet'
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TopicsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


