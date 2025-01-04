import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { content } = body

  const reply = await prisma.reply.create({
    data: {
      content,
      authorId: session.user.id,
      questionId: params.id,
    },
    include: {
      author: true,
    },
  })

  return NextResponse.json(reply)
}


