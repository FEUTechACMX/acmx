'use server'

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { z } from "zod"

const questionSchema = z.object({
  title: z.string().min(15).max(150),
  content: z.string().min(30),
  tags: z.array(z.string()).min(1).max(5),
})

export async function createQuestion(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("You must be logged in to create a question")
  }

  const raw = {
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"),
  }

  const validated = questionSchema.parse(raw)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validated),
  })

  if (!response.ok) {
    throw new Error('Failed to create question')
  }

  const question = await response.json()

  revalidatePath("/")
  revalidatePath("/questions")
  return question
}

export async function getQuestions(page = 1, limit = 10) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions?page=${page}&limit=${limit}`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  )

  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }

  return response.json()
}

export async function getQuestion(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`, {
    next: { revalidate: 60 } // Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error('Failed to fetch question')
  }

  return response.json()
}

export async function createReply(questionId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("You must be logged in to reply")
  }

  const content = formData.get("content")
  if (typeof content !== "string" || content.length < 30) {
    throw new Error("Reply must be at least 30 characters long")
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to create reply')
  }

  const reply = await response.json()

  revalidatePath(`/questions/${questionId}`)
  return reply
}


