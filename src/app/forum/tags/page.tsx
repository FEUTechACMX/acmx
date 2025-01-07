import { Layout } from "~/components/Forum/layout"
import { Input } from "~/components/ui/input"
import Link from "next/link"

const tags = [
  { name: "javascript", count: 1243, description: "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations." },
  { name: "python", count: 982, description: "Python is a multi-paradigm, dynamically typed, multi-purpose programming language." },
  { name: "react", count: 856, description: "React is a JavaScript library for building user interfaces." },
  { name: "node.js", count: 745, description: "Node.js is an event-based, non-blocking, asynchronous I/O runtime built on Chrome's V8 JavaScript engine." },
  { name: "typescript", count: 632, description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript." },
  { name: "css", count: 542, description: "CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of HTML documents." },
]

export default function TagsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tags</h1>
          <p className="text-sm text-muted-foreground">
            A tag is a keyword or label that categorizes your question with other, similar questions.
          </p>
        </div>
        <div className="max-w-md">
          <Input placeholder="Filter by tag name..." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/forum/tags/${tag.name}`}
              className="group rounded-lg border p-4 hover:border-primary"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium group-hover:text-primary">#{tag.name}</span>
                <span className="text-sm text-muted-foreground">×&nbsp;{tag.count}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {tag.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

