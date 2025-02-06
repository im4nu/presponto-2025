import { z } from "zod";

export const postValidator = z.object({
  name: z.string().min(1, { message: "Você precisa informar o nome" }),
  description: z.string().optional(),
  image: z.string().optional(),
  videoUrl: z
    .string()
    .min(1, {
      message:
        "Você precisa informar a url do vídeo, coloque o vídeo como um SHORT do youtube, copie a URL dele e cole aqui.",
    }),
  usginVideo: z.boolean(),
  rate: z.string().min(1, { message: "Você precisa informar a nota" }),
  membershipDuration: z.string().min(1, {
    message: "Você precisa informar a quanto tempo é cliente",
  }),
});
