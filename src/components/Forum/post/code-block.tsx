"use client"

import { Card } from "~/components/ui/card"

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <Card className="bg-muted/50 overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
    </Card>
  )
}

