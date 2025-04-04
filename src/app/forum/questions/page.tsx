"use client"

import { useState } from "react"
import { QuestionCard } from "~/components/Forum/question-card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useQuestions } from "~/lib/question-context"
import Link from "next/link"
import { Search } from 'lucide-react'

export default function QuestionsPage() {
  const { questions } = useQuestions()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Questions</h1>
      </div>
      <div className="mb-6 relative">
        <Input
          type="search"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {filteredQuestions.map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
    </div>
  )
}

