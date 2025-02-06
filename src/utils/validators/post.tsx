import { z } from "zod";

export const postValidator = z.object({
  name: z.string().min(1, { message: "Você precisa informar o nome" }),
  description: z
    .string()
    .min(1, { message: "Você precisa informar a descrição" }),
  image: z.string().optional(),
  rate: z
    .number()
    .min(1, { message: "Você precisa informar a nota" })
    .max(5, { message: "A nota precisa ser entre 1 e 5" }),
  membershipDuration: z.number().min(1, {
    message: "Você precisa informar o tempo em anos desde que você é cliente",
  }),
});
