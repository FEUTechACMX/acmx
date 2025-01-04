import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      tags: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
      votes: true,
      _count: {
        select: {
          replies: true,
          votes: true,
        },
      },
    },
  })

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 })
  }

  return NextResponse.json(question)
}


