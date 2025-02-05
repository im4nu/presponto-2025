import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getPresignedPost } from "~/server/services/s3";
import { postValidator } from "~/utils/validators/post";
import { createId } from "@paralleldrive/cuid2";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(postValidator)
    .mutation(async ({ ctx, input }) => {
      const id = createId();

      let key = undefined;
      let presignedUrl = undefined;
      if (input.imageKey) {
        key = `presponto/${input.name}/${id}.png`;
        presignedUrl = await getPresignedPost(key);
      }

      await ctx.db.post.create({
        data: {
          name: input.name,
          createdAt: new Date(),
          description: input.description,
          imageKey: input.imageKey,
          membershipDuration: input.membershipDuration,
          rate: input.rate,
          updatedAt: new Date(),
        },
      });

      return { presignedUrl };
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
