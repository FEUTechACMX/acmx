import { NextResponse } from 'next/server'
import prisma from '~/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { title, content, tags, authorId } = body

  try {
    const question = await prisma.question.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
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
  } catch (error) {
    return NextResponse.json({ error: 'Error creating question' }, { status: 500 })
  }
}

