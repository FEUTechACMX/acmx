"use client"

import { QuestionCard } from "~/components/Forum/question-card"
import { Button } from "~/components/ui/button"
import { useQuestions } from "~/lib/question-context"
import Link from "next/link"

export default function Home() {
  const { questions } = useQuestions()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Questions</h1>
      </div>
      {questions.slice(0, 5).map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/forum/questions">View All Questions</Link>
        </Button>
      </div>
    </div>
  )
}

