"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface Question {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  likes: number
  dislikes: number
  replies: number
  createdAt: string
}

interface QuestionsContextType {
  questions: Question[]
  addQuestion: (question: Question) => void
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined)

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "How to implement dark mode in Next.js?",
      content: "I'm trying to add dark mode to my Next.js application. What's the best way to do this?",
      author: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      tags: ["next.js", "react", "dark-mode"],
      likes: 10,
      dislikes: 2,
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
      likes: 15,
      dislikes: 3,
      replies: 8,
      createdAt: "2023-06-02",
    },
  ])

  const addQuestion = (question: Question) => {
    setQuestions(prevQuestions => [question, ...prevQuestions])
  }

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionsContext)
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider')
  }
  return context
}

