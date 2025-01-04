import { NextResponse } from 'next/server'
import { prisma } from '~/lib/forum/db'
import { getServerAuthSession } from '~/server/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const questions = await prisma.question.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: 'desc' },
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
  })

  const total = await prisma.question.count()

  return NextResponse.json({
    questions,
    total,
    pages: Math.ceil(total / limit),
  })
}

export async function POST(request: Request) {
  const session = await getServerAuthSession() // Use the correct auth function to get the session
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, content, tags } = body

  const question = await prisma.question.create({
    data: {
      title,
      content,
      authorId: session.user.id,
      tags: {
        connectOrCreate: tags.map((tag: string) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      author: true,
      tags: true,
    },
  })

  return NextResponse.json(question)
}
