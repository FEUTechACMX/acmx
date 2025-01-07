import { Layout } from "~/components/Forum/layout"
import { QuestionCard } from "~/components/Forum/question-card"
import prisma from "~/lib/prisma"

async function getQuestions() {
  const questions = await prisma.question.findMany({
    include: {
      author: true,
      tags: true,
      _count: {
        select: { replies: true, votes: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return questions.map(question => ({
    id: question.id,
    title: question.title,
    content: question.content,
    author: {
      name: question.author.name || 'Anonymous',
      image: question.author.image,
    },
    tags: question.tags.map(tag => tag.name),
    votes: question._count.votes,
    replies: question._count.replies,
    createdAt: question.createdAt.toISOString(),
  }))
}

export default async function Home() {
  const questions = await getQuestions()

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Recent Questions</h1>
          <p className="text-sm text-muted-foreground">
            Browse questions from the community
          </p>
        </div>
        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

