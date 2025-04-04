"use client"

import { useSearchParams } from "next/navigation"
import { QuestionCard } from "~/components/Forum/question-card"

const questions = [
  {
    id: "1",
    title: "How to implement dark mode in Next.js?",
    content: "I'm trying to add dark mode to my Next.js application. What's the best way to do this?",
    author: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    tags: ["next.js", "react", "dark-mode"],
    votes: 10,
    replies: 5,
    createdAt: "2023-06-01",
  },
  {
    id: "2",
    title: "Best practices for React state management",
    content: "What are the current best practices for managing state in a large React application?",
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    tags: ["react", "state-management", "redux"],
    votes: 15,
    replies: 8,
    createdAt: "2023-06-02",
  },
  // Add more sample questions here
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(query.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {filteredQuestions.length === 0 ? (
        <p>No results found.</p>
      ) : (
        filteredQuestions.map((question) => (
          <QuestionCard likes={0} dislikes={0} key={question.id} {...question} />
        ))
      )}
    </div>
  )
}

