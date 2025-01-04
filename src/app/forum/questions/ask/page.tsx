'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { createQuestion } from '../../actions/questions'
import { TagInput } from '~/components/Forum/tag-input'

export default function AskQuestionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      // Add tags to form data
      tags.forEach(tag => formData.append('tags', tag))
      
      const question = await createQuestion(formData)
      router.push(`/questions/${question.id}`)
    } catch (error) {
      console.error('Failed to create question:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Be specific and imagine you're asking a question to another person.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                required
                minLength={15}
                maxLength={150}
                placeholder="e.g. How do I create a responsive layout in Tailwind CSS?"
              />
              <p className="text-xs text-muted-foreground">
                Be specific and imagine you're asking a question to another person
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Body
              </label>
              <Textarea
                id="content"
                name="content"
                required
                minLength={30}
                rows={12}
                placeholder="Include all the information someone would need to answer your question"
              />
              <p className="text-xs text-muted-foreground">
                Include all the information someone would need to answer your question
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags
              </label>
              <TagInput
                value={tags}
                onChange={setTags}
                placeholder="Add up to 5 tags..."
                maxTags={5}
              />
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to describe what your question is about
              </p>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Your Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


