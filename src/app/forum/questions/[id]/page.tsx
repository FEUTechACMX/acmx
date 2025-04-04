"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { QuestionCard } from "~/components/Forum/question-card"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { ThumbsUp, ThumbsDown } from 'lucide-react'

const question = {
  id: "1",
  title: "How to implement dark mode in Next.js?",
  content: "I'm trying to add dark mode to my Next.js application. What's the best way to do this? I've looked into using CSS variables and the next-themes package, but I'm not sure which approach is better or if there are other options I should consider.",
  author: {
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
  },
  tags: ["next.js", "react", "dark-mode"],
  likes: 10,
  dislikes: 2,
  replies: 5,
  createdAt: "2023-06-01",
}

interface Reply {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  dislikes: number
  createdAt: string
  replies?: Reply[]
}

const initialReplies: Reply[] = [
  {
    id: "1",
    content: "I recommend using the next-themes package. It's easy to set up and works well with Next.js.",
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    likes: 5,
    dislikes: 0,
    createdAt: "2023-06-02",
    replies: [
      {
        id: "1-1",
        content: "I agree, next-themes is a great solution. It handles SSR correctly and provides an easy-to-use API.",
        author: {
          name: "Alice Johnson",
          avatar: "https://github.com/shadcn.png",
        },
        likes: 2,
        dislikes: 0,
        createdAt: "2023-06-02",
      }
    ]
  },
  {
    id: "2",
    content: "CSS variables are also a good option if you want more control over the implementation.",
    author: {
      name: "Bob Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    likes: 3,
    dislikes: 1,
    createdAt: "2023-06-03",
  },
]

function ReplyComponent({ reply, depth = 0, onAddReply }: { reply: Reply; depth?: number; onAddReply: (parentId: string, newReply: Reply) => void }) {
  const [likes, setLikes] = useState(reply.likes)
  const [dislikes, setDislikes] = useState(reply.dislikes)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [newReply, setNewReply] = useState("")

  const handleVote = (type: 'like' | 'dislike') => {
    if (type === 'like') {
      setLikes(prevLikes => prevLikes + 1)
    } else {
      setDislikes(prevDislikes => prevDislikes + 1)
    }
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReply.trim()) {
      const newReplyObj: Reply = {
        id: `${reply.id}-${Date.now()}`,
        content: newReply,
        author: {
          name: "Current User",
          avatar: "https://github.com/shadcn.png",
        },
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
      }
      onAddReply(reply.id, newReplyObj)
      setNewReply("")
      setShowReplyForm(false)
    }
  }

  return (
    <Card className={`mb-4 ${depth > 0 ? 'ml-8' : ''}`}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
            <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{reply.author.name}</p>
            <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{reply.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => handleVote('like')}>
            <ThumbsUp className="mr-1 h-4 w-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleVote('dislike')}>
            <ThumbsDown className="mr-1 h-4 w-4" />
            {dislikes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowReplyForm(!showReplyForm)}>
            Reply
          </Button>
        </div>
      </CardFooter>
      {showReplyForm && (
        <CardContent>
          <form onSubmit={handleSubmitReply}>
            <Textarea
              placeholder="Write your reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">Submit Reply</Button>
          </form>
        </CardContent>
      )}
      {reply.replies && reply.replies.length > 0 && (
        <CardContent>
          {reply.replies.map(subReply => (
            <ReplyComponent key={subReply.id} reply={subReply} depth={depth + 1} onAddReply={onAddReply} />
          ))}
        </CardContent>
      )}
    </Card>
  )
}

export default function QuestionPage() {
  const { id } = useParams()
  const [newReply, setNewReply] = useState("")
  const [replies, setReplies] = useState(initialReplies)

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReply.trim()) {
      const newReplyObj: Reply = {
        id: String(Date.now()),
        content: newReply,
        author: {
          name: "Current User",
          avatar: "https://github.com/shadcn.png",
        },
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
      }
      setReplies(prevReplies => [...prevReplies, newReplyObj])
      setNewReply("")
    }
  }

  const handleAddReply = (parentId: string, newReply: Reply) => {
    setReplies(prevReplies => {
      const updateReplies = (replies: Reply[]): Reply[] => {
        return replies.map(reply => {
          if (reply.id === parentId) {
            return {
              ...reply,
              replies: [...(reply.replies || []), newReply]
            }
          } else if (reply.replies) {
            return {
              ...reply,
              replies: updateReplies(reply.replies)
            }
          }
          return reply
        })
      }
      return updateReplies(prevReplies)
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <QuestionCard {...question} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Replies</h2>
      {replies.map((reply) => (
        <ReplyComponent key={reply.id} reply={reply} onAddReply={handleAddReply} />
      ))}
      <form onSubmit={handleSubmitReply} className="mt-8">
        <Textarea
          placeholder="Write your reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          className="mb-4"
        />
        <Button type="submit">Submit Reply</Button>
      </form>
    </div>
  )
}

