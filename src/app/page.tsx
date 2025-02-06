import { api } from "~/trpc/server";

import {
  ArrowUpIcon,
  Bars3Icon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { HydrateClient } from "~/trpc/server";
import FeedbackCard from "./_components/FeedbackCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import PostFeedbackDialog from "./_components/postFeedbackDialog";

export default async function Home() {
  const listPosts = await api.post.list();

  return (
    <HydrateClient>
      <main className="josefin-sans flex h-full min-h-screen flex-col md:z-10 md:opacity-0">
        <nav className="fixed left-0 top-0 flex w-full items-center justify-between bg-white/20 px-12 py-6 backdrop-blur-md">
          <Image
            alt={"Logomarca"}
            src={"/logo.svg"}
            width={175 / 2}
            height={72 / 2}
          />

          <Bars3Icon className="h-8 w-8 text-white" />
        </nav>

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
              <Image
                src={"/saint_antony.jpg"}
                alt="Imagem de cultura da região do cariri"
                width={250}
                height={250}
                objectFit="cover"
                className="h-[70px] w-[70px] rounded-lg border border-white object-cover"
              ></Image>
              <Image
                src={"/araripe_bird.jpg"}
                alt="Imagem de cultura da região do cariri"
                width={250}
                height={250}
                objectFit="cover"
                className="h-[70px] w-[70px] rounded-lg border border-white object-cover"
              ></Image>
              <Image
                src={"/juazeiro_city.jpg"}
                alt="Imagem de cultura da região do cariri"
                width={250}
                height={250}
                objectFit="cover"
                className="h-[70px] w-[70px] rounded-lg border border-white object-center"
              ></Image>
            </div>

            <h2 className="text-center">
              Estamos a <b>mais de 10 anos</b> mercado de costura no cariri!
            </h2>
            <ChevronDoubleDownIcon className="h-8 w-8" />
          </div>
        </section>

        <section
          id="feedbacks"
          className="flex h-full w-full flex-col items-start bg-main p-[5%] text-white"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-bold">Depoimentos</p>
            <p className="text-white/70">
              Possuímos uma avaliação média de 5 estrelas no google maps.
            </p>
          </div>

          <div className="flex w-full flex-col gap-12 py-12">
            {listPosts.map((post, i) => (
              <FeedbackCard post={post} key={i} inverted={i % 2 === 0} />
            ))}

            {listPosts.length === 0 && (
              <p className="w-full text-center">
                Nenhum depoimento foi encontrado. Seja o primeiro a deixar um!
              </p>
            )}
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            {/* <Button variant={"outline"} size={"lg"}>
              Ver todos os depoimentos
            </Button> */}

            <p>
              Esses depoimentos são de pessoais reais e você pode fazer um
              também!
            </p>

            <PostFeedbackDialog />
          </div>
        </section>

        <section
          id="about"
          className="flex h-full w-full flex-col items-center p-[5%] text-gray-800"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-2xl font-bold">Por que nos escolher?</p>
            <p className="text-xs text-gray-800/70">
              Os depoimentos acima não são o suficiente? Não tem problema,
              motivos são o que não faltam para você nos escolher!
            </p>
          </div>

          <div className="max-w-screen flex w-full items-center justify-center py-6">
            <Carousel className="w-full max-w-[50vw]">
              <CarouselContent>
                <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/place_1.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  ></Image>
                </CarouselItem>
                <CarouselItem className="flex w-full items-center justify-center">
                  <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
                </CarouselItem>
                <CarouselItem className="flex w-full items-center justify-center">
                  <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <p className="w-2/3 text-center text-xs">
            Contamos com um ambiente acochegante e bem climatizado.
          </p>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Temos material e maquinário de tecnologia de ponta.</p>
            <div className="flex flex-row gap-4">
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
            </div>
            <p className="text-xs opacity-70">
              Aqui sua roupa recebe tratamento especial!
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Somos os mais profissionais da região.</p>
            <div className="flex flex-row gap-4">
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
            </div>
            <p className="text-xs opacity-70">
              Investimos em tecnologias como site prórpio, google maps, e muito
              mais pois acreditamos no potencial que a tecnologia traz.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Nosso atendimento ultrapassa fronteiras.</p>
            <div className="flex flex-row gap-4">
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
              <div className="flex h-[100px] w-[100px] rounded-lg border border-white bg-gray-800/40"></div>
            </div>
            <p className="text-xs opacity-70">
              Temos clientes em países como: Portugal, Argentina, Estado Unidos,
              Canadá e mais...
            </p>
            <p className="text-[10px] opacity-60">
              Eles esperam vir visitar seus familiares aqui no brasil para
              trazer roupas para concerto.
            </p>
          </div>
        </section>

        <section
          id="map"
          className="flex h-full w-full flex-col items-center p-[5%] text-gray-800"
        >
          <div className="flex w-full flex-col gap-2 text-center">
            <p className="text-xl font-bold">Ainda restam dúvidas?</p>
            <p className="opacity-70">Acreditamos que não, né?</p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-12 text-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2794211326436!2d-39.30242952238619!3d-7.3224783720135065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a177dd93278849%3A0x1d6f92ae1929b576!2sAteli%C3%AA%20de%20Costura%20Pres%20Ponto!5e0!3m2!1spt-BR!2sbr!4v1738780397170!5m2!1spt-BR!2sbr"
              className="h-[250px] w-[250px] rounded-lg"
              loading="lazy"
            ></iframe>
            <p>
              Então vem nos visitar na sua melhor beca, é só seguir o mapa
              acima!
            </p>
            <p className="text-xs opacity-70">
              Ou traga ela pra que a gente concerte-a. :)
            </p>
          </div>
        </section>

        <footer
          id="footer"
          className="text-text mt-12 flex h-full w-full flex-col items-center gap-2 bg-main p-[5%] py-12 text-white"
        >
          <Image
            alt={"Logomarca"}
            src={"/logo.svg"}
            width={175 / 2}
            height={72 / 2}
          />
          <p className="text-xs">@2025 todos os direitos reservados</p>
          <p className="text-[10px] opacity-70">
            Design e desenvolvimento por Emmanuel Rodrigues
          </p>
        </footer>

        <a
          href="#"
          className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/10 p-4"
        >
          <ArrowUpIcon className="h-4 w-4 text-white" />
        </a>
      </main>

      <div className="josefin-sans absolute left-0 top-0 z-30 hidden h-screen w-screen items-center justify-center bg-main md:flex">
        <div className="flex w-1/3 min-w-[400px] flex-col items-center justify-center gap-12 rounded-lg bg-white px-4 py-6 text-center text-gray-800">
          <p className="text-2xl">Atenção!</p>
          <Image
            alt="Ilustração de telegone"
            src={"/mobile_ilu.svg"}
            width={678.62 / 3}
            height={606.19 / 3}
          />
          <p className="opacity-70">
            Este site ainda está sendo desenvolvido para computadores, laptops e
            tablets. Por enquanto tente acessar pelo seu telefone.
          </p>
        </div>
      </div>
    </HydrateClient>
  );
}
