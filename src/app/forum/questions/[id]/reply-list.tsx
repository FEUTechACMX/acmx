import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { prisma } from "@/lib/db"

// ReplyList component to display all replies for a question
export async function ReplyList({ questionId }: { questionId: string }) {
  // Fetch replies for the question
  const replies = await prisma.reply.findMany({
    where: { questionId },
    include: {
      author: true,
      votes: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <Card key={reply.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={reply.author.image || ''} />
              <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{reply.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(reply.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              {reply.content}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span>{reply.votes.reduce((acc, vote) => acc + vote.value, 0)}</span>
              <Button variant="ghost" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


