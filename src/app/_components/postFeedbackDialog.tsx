"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { StarIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Spinner } from "~/components/ui/spinner";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { membershipDurationOptions, rateOptions } from "~/utils/options";
import { uploadFileToS3 } from "~/utils/upload-file-to-s3";
import { postValidator } from "~/utils/validators/post";

const formSchema = postValidator;

export default function PostFeedbackDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(formSchema),
    defaultValues: {
      usginVideo: true,
      videoUrl: "",
      name: "",
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [dialogState, setDialogState] = useState(false);
  const registerNewFeedback = api.post.create.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("oi");

    registerNewFeedback.mutate(
      { ...values },
      {
        onSuccess: ({ presignedUrl }) => {
          if (image && presignedUrl) {
            void uploadFileToS3(image, presignedUrl);
          }
          alert("Depoimento registrado com sucesso!");
          form.reset();
        },
        onError: (error) => {
          alert("Ocorreu um erro ao registrar o depoimento");
          console.error(error);
        },
        onSettled: () => {
          setDialogState(false);
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
    <Dialog
      open={dialogState}
      onOpenChange={() => setDialogState(!dialogState)}
    >
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usginVideo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>O depoimento é em vídeo?</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <p className="text-xs opacity-70">Não</p>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled
                        className="disabled:opacity-70"
                      />
                      <p className="text-xs opacity-70">Sim</p>
                    </div>
                  </FormControl>
                  <Label className="text-xs text-main">
                    <b>Nota:</b> Estamos trabalhando para que em breve seja
                    possível deixar depoimentos com imagens, por enquanto envie
                    um vídeo mesmo.
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("usginVideo") ? (
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Link do vídeo</FormLabel>
                    <FormControl>
                      <Input placeholder="Cole o link do vídeo" {...field} />
                    </FormControl>
                    <Label className="text-xs text-main">
                      <b>Nota:</b> Você deve publicar o vídeo no youtube como um
                      short (vídeo curto) e depois copiar o link dele e colocar
                      aqui.
                    </Label>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="image"
                render={({}) => (
                  <FormItem className="w-full">
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
                              className="object-cover"
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
            )}

            <FormField
              control={form.control}
              name="membershipDuration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    A quanto tempo você é cliente{" "}
                    <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>

                      <SelectContent>
                        {membershipDurationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Avalie o serviço e atendimento{" "}
                    <span className="text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>

                      <SelectContent>
                        {rateOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex w-full flex-row items-center gap-1">
                              {Array.from({ length: option.label ?? 0 }).map(
                                (_, i) => (
                                  <StarIcon
                                    className="h-4 w-4 fill-main"
                                    key={i}
                                  />
                                ),
                              )}
                              <span>{option.value} Estrelas</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("usginVideo") === false && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Seu depoimento</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva com suas palavras como foi sua experiência com o atendimento e serviço prestado da Cláudia no ateliê PresPonto"
                        {...field}
                        className="h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                variant={"secondary"}
                disabled={registerNewFeedback.isPending}
              >
                {registerNewFeedback.isPending ? (
                  <Spinner />
                ) : (
                  "Enviar depoimento"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
