'use client'

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { createReply } from "../../actions/questions"
import { toast } from "sonner"

export function ReplyForm({ questionId }: { questionId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createReply(questionId, formData)
        const form = document.querySelector('form')
        if (form instanceof HTMLFormElement) {
          form.reset()
        }
        toast.success("Reply posted successfully")
        router.refresh()
      } catch (error) {
        toast.error("Failed to post reply")
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Textarea
        name="content"
        placeholder="Write your reply..."
        required
        minLength={30}
        className="w-full"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Post Reply"}
      </Button>
    </form>
  )
}


