import { z } from "zod"

export const questionSchema = z.object({
  id: z.string(),
  title: z.string().min(10).max(200),
  content: z.string().min(30),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(z.string()),  // Tags are an array of strings representing tag names
  votes: z.number().default(0),
  replyCount: z.number().default(0),  // Represents the number of replies, can be inferred or updated dynamically
  views: z.number().default(0),  // Added to match Prisma schema
  isFeatured: z.boolean().default(false),  // Added to match Prisma schema for featured flag
})

export const replySchema = z.object({
  id: z.string(),
  content: z.string().min(30),
  questionId: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  votes: z.number().default(0),  // Represents the number of votes on the reply, can be inferred or updated dynamically
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().optional(),
  questions: z.array(z.object({
    id: z.string(),
    title: z.string(),
  })),  // Added to match relation with User's questions
  replies: z.array(z.object({
    id: z.string(),
    content: z.string(),
  })),  // Added to match relation with User's replies
  votes: z.array(z.object({
    id: z.string(),
    value: z.number(),  // Voting value, can be 1 for upvote, -1 for downvote
    questionId: z.string().optional(),  // Added to match relation with Vote on Question
    replyId: z.string().optional(),    // Added to match relation with Vote on Reply
  })),  // Added to match relation with User's votes
})

export type Question = z.infer<typeof questionSchema>
export type Reply = z.infer<typeof replySchema>
export type User = z.infer<typeof userSchema>

