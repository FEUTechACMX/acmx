import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
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
});