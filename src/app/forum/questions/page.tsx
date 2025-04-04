import { Layout } from "~/components/Forum/layout"
import { QuestionCard } from "~/components/Forum/question-card"
import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import Link from "next/link"


const questions = [
  {
    id: "1",
    title: "How to patch KDE on FreeBSD?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus aliquet ut consequat imperdiet.",
    author: {
      name: "johndoe",
      image: "/placeholder.svg"
    },
    tags: ["programming", "freebsd", "kde"],
    votes: 15,
    replies: 3,
    createdAt: "2h ago"
  },
  {
    id: "2",
    title: "Understanding React Server Components",
    content: "I'm trying to understand when to use React Server Components vs Client Components in Next.js 13+.",
    author: {
      name: "reactdev",
      image: "/placeholder.svg"
    },
    tags: ["react", "nextjs", "javascript"],
    votes: 32,
    replies: 8,
    createdAt: "4h ago"
  },
]

export default function QuestionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">All Questions</h1>
            <p className="text-sm text-muted-foreground">
              {questions.length} questions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="votes">Most Votes</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/questions/ask">Ask Question</Link>
            </Button>
          </div>
        </div>
        <div className="divide-y">
          {questions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

