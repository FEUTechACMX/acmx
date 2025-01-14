"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { useQuestions } from "~/lib/question-context"
import { X } from 'lucide-react'

export default function AskQuestion() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const router = useRouter()
  const { addQuestion } = useQuestions()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuestion = {
      id: Date.now().toString(),
      title,
      content,
      author: {
        name: "Current User",
        avatar: "https://github.com/shadcn.png",
      },
      tags,
      likes: 0,
      dislikes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
    }
    addQuestion(newQuestion)
    router.push('/')
  }

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the question title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your question in detail"
            required
            className="min-h-[200px]"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex items-center space-x-2">
            <Input
              id="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tags"
            />
            <Button type="button" onClick={handleAddTag}>Add Tag</Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <span>{tag}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
        <Button type="submit">Submit Question</Button>
      </form>
    </div>
  )
}

