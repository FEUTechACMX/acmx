"use client"

import { Layout } from "~/components/Forum/layout"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Flag } from 'lucide-react'
import Link from "next/link"

export default function QuestionDetail() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">How to patch KDE on FreeBSD?</h1>
                <p className="text-sm text-muted-foreground">
                  Posted by johndoe • 2h ago
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>
            <pre className="bg-muted p-4 rounded-lg">
              <code>
                {`package main

func main() {
    fmt.Println("Hello, World!")
}`}
              </code>
            </pre>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span>10</span>
              <Button variant="ghost" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Link
                href="/tags/programming"
                className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
              >
                #programming
              </Link>
              <Link
                href="/tags/freebsd"
                className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
              >
                #freebsd
              </Link>
              <Link
                href="/tags/kde"
                className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
              >
                #kde
              </Link>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Replies</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">janedoe</p>
                    <p className="text-xs text-muted-foreground">1h ago</p>
                  </div>
                  <p className="text-sm">
                    Have you tried updating your system packages first? That usually helps with KDE issues.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pl-12">
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="text-sm">5</span>
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Reply form */}
          <div className="space-y-4">
            <Textarea placeholder="Write your reply..." className="min-h-[100px]" />
            <div className="flex justify-end">
              <Button>Post Reply</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

