import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '10')

  let tags

  if (query) {
    tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: {
        questions: {
          _count: 'desc'
        }
      },
      take: limit
    })
  } else {
    tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: {
        questions: {
          _count: 'desc'
        }
      },
      take: limit
    })
  }

  return NextResponse.json(tags)
}


