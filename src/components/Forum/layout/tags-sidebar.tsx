import { cn } from "~/lib/utils"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

interface TagsSidebarProps {
  className?: string
}

export function TagsSidebar({ className }: TagsSidebarProps) {
  const tags = [
    { name: 'design', count: 35353 },
    { name: 'programming', count: 28232 },
    { name: 'javascript', count: 25123 },
    { name: 'discussion', count: 20123 },
  ]

  return (
    <div className={cn("w-[280px]", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Popular Tags</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {tags.map(tag => (
            <div key={tag.name} className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                #{tag.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {tag.count.toLocaleString()} posts in this tag
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

