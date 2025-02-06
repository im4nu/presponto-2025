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

      if (input.image) {
        key = `presponto/${id}.png`;
        presignedUrl = await getPresignedPost(key);
      }

      await ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description,
          membershipDuration: input.membershipDuration,
          rate: input.rate,
          videoUrl: input.videoUrl,
          usingVideo: input.usginVideo ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          imageKey: key,
        },
      });

      return { presignedUrl };
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),
});
