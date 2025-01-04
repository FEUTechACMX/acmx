import { Suspense } from 'react'
import { QuestionList } from "@/components/question-list"
import { prisma } from "@/lib/db"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {query ? `Search results for "${query}"` : 'Search Questions'}
        </h1>
      </div>
      {query ? (
        <Suspense fallback={<QuestionListSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <p className="text-muted-foreground">
          Enter a search term to find questions
        </p>
      )}
    </div>
  )
}

async function SearchResults({ query }: { query: string }) {
  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { tags: { some: { name: { contains: query, mode: 'insensitive' } } } },
      ],
    },
    include: {
      author: true,
      tags: true,
      _count: {
        select: {
          replies: true,
          votes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (questions.length === 0) {
    return (
      <p className="text-muted-foreground">
        No questions found matching "{query}"
      </p>
    )
  }

  return <QuestionList questions={questions} />
}

function QuestionListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-20" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  )
}


