import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getPopularTags } from "@/app/actions/tags"

export async function TagList() {
  const tags = await getPopularTags(5)

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Popular Topics</h2>
      <div className="space-y-2">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/topics/${tag.name}`}>
            <Badge
              variant="secondary"
              className="w-full justify-between font-normal"
            >
              #{tag.name}
              <span className="text-muted-foreground">
                {tag._count.questions}
              </span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}


