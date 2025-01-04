import { Suspense } from "react"
import { QuestionList } from "~/components/Forum/question-list"
import { getQuestions } from "./actions/questions"
import { Skeleton } from "~/components/ui/skeleton"

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Recent Questions</h1>
      </div>
      <Suspense fallback={<QuestionListSkeleton />}>
        <Questions />
      </Suspense>
    </div>
  )
}

async function Questions() {
  const { questions } = await getQuestions()
  return <QuestionList questions={questions} />
}

function QuestionListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
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

