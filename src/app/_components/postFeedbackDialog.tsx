"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { postValidator } from "~/utils/validators/post";

const formSchema = postValidator;

export default function PostFeedbackDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      rate: 0,
      membershipDuration: 0,
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const registerNewFeedback = api.post.create.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    registerNewFeedback.mutate(
      { ...values },
      {
        onSuccess: () => {
          alert("Depoimento registrado com sucesso!");
          form.reset();
        },
        onError: (error) => {
          alert("Ocorreu um erro ao registrar o depoimento");
          console.error(error);
        },
      },
    );
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file?.name) return;
      setImage(file);
      form.setValue("image", file.name);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Deixar um depoimento</Button>
      </DialogTrigger>

      <DialogContent className="josefin-sans">
        <DialogHeader className="flex w-full items-start text-start">
          <DialogTitle className="text-xl font-bold">
            Deixe seu depoimento
          </DialogTitle>
          <DialogDescription className="text-xs opacity-70">
            Sua opinião é muito importante para nós. Deixe seu depoimento
            abaixo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-start gap-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2">
                        <Input
                          placeholder="Picture"
                          type="file"
                          accept="image/*"
                          onChange={handleChangeImage}
                        />
                        <Avatar>
                          <AvatarImage
                            src={image ? URL.createObjectURL(image) : ""}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <Label className="text-xs opacity-70">
                        Tipos de arquivos aceitos PNG, JPG e JPEG
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="membershipDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    A quanto tempo você é cliente{" "}
                    <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Avalie o serviço e atendimento{" "}
                    <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu depoimento</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit" variant={"secondary"}>
                Enviar depoimento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
