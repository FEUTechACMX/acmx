import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getEvent: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.event.findFirst({
                where: { slug: input.slug }
            });
        }),

    getOrganization: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.organization.findFirst({
                where: { id: input.id }
            });
        }),

    getTags: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const res = await ctx.db.event.findUnique({
                where: { id: input.id },
                include: {
                    tags: {
                        include: {
                            tag: true
                        }
                    }
                }
            });
            
            return res?.tags.map(tag => tag.tag)
        }),

    create: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
        return ctx.db.post.create({
            data: {
            name: input.name,
            createdBy: { connect: { id: ctx.session.user.id } },
            },
        });
        }),

    getLatest: protectedProcedure.query(async ({ ctx }) => {
        const post = await ctx.db.post.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
        });

        return post ?? null;
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
