import { z } from "zod";

export const postValidator = z.object({
  name: z.string().min(1, { message: "Você precisa informar o nome" }),
  description: z.string().optional(),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
  usginVideo: z.boolean(),
  rate: z.string().min(1, { message: "Você precisa informar a nota" }),
  membershipDuration: z.string().min(1, {
    message: "Você precisa informar a quanto tempo é cliente",
  }),
});
