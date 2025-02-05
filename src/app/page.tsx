// import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
import { ChevronDoubleDownIcon, StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="josefin-sans flex h-full min-h-screen flex-col">
        <section
          id="home"
          className="flex min-h-screen w-full flex-col items-center justify-evenly bg-hero bg-cover bg-no-repeat px-[5%] pt-[15%] text-white"
        >
          <div className="flex flex-col items-center gap-6">
            <Image
              alt={"Logomarca"}
              src={"/logo.svg"}
              width={175}
              height={72}
            />
            <h1 className="px-[5%] text-center text-4xl font-bold">
              Procurando costureira em barbalha?
            </h1>
            <p className="text-xl">Sua busca acabou!</p>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex h-[70px] w-[70px] rounded-lg border border-white bg-white/40"></div>
              <div className="flex h-[70px] w-[70px] rounded-lg border border-white bg-white/40"></div>
              <div className="flex h-[70px] w-[70px] rounded-lg border border-white bg-white/40"></div>
            </div>

            <h2 className="text-center">
              Estamos a <b>mais de 10 anos</b> mercado de costura no cariri!
            </h2>
            <ChevronDoubleDownIcon className="h-8 w-8" />
          </div>
        </section>

        <section
          id="feedbacks"
          className="bg-main flex h-full w-full flex-col items-start p-[5%] text-white"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-bold">Depoimentos</p>
            <p className="text-white/70">
              Possuímos uma avaliação média de 5 estrelas no google maps.
            </p>
          </div>

          <div className="flex w-full flex-col gap-12 py-12">
            {new Array(3).fill(0).map((_, i) => (
              <FeedbackCard key={i} inverted={i % 2 === 0} />
            ))}
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button variant={"outline"} size={"lg"}>
              Ver todos os depoimentos
            </Button>
            <Button size={"lg"}>Deixar um depoimento</Button>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}

interface PostProps {
  inverted?: boolean;
}

export function FeedbackCard({ inverted }: PostProps) {
  return (
    <div
      className={cn(
        "flex h-[350px] w-full items-start justify-between gap-4",
        inverted && "flex-row-reverse",
      )}
    >
      <div className="flex h-full w-[60%] rounded-lg border border-white bg-white/40"></div>

      <div className="flex w-[40%] flex-col items-center justify-start gap-6 py-4">
        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">Emmanuel Rodrigues</p>
          <p className="text-xs text-white/70">01/02/2025</p>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-lg">Avaliação</p>
          <p>5 Estelas</p>
          <div className="flex">
            {new Array(5).fill(0).map((_, i) => (
              <StarIcon className="h-4 w-4 fill-white/80" key={i} />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">Já é cliente a:</p>
          <p>Mais de 5 anos</p>
        </div>
      </div>
    </div>
  );
}
