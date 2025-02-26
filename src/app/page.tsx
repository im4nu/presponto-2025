import { api } from "~/trpc/server";

import { ArrowUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { HydrateClient } from "~/trpc/server";
import FeedbackCard from "./_components/FeedbackCard";
import NavBar from "./_components/NavBar";
import PostFeedbackDialog from "./_components/postFeedbackDialog";

const whatsappMessage =
  "https://wa.me/5588981129314?text=Oi%20Claudinha!%20Vim%20do%20seu%20site%20e%20gostaria%20de%20tirar%20algumas%20dúvidas,%20solicitar%20orçamento%20ou%20agendar%20um%20serviço.";

const mapsLink =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2794211326436!2d-39.30242952238619!3d-7.3224783720135065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a177dd93278849%3A0x1d6f92ae1929b576!2sAteli%C3%AA%20de%20Costura%20Pres%20Ponto!5e0!3m2!1spt-BR!2sbr!4v1738780397170!5m2!1spt-BR!2sbr";

export default async function Home() {
  const listPosts = await api.post.list();

  return (
    <HydrateClient>
      <main className="josefin-sans flex h-full min-h-screen flex-col md:z-10 md:opacity-0">
        <NavBar />

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

            <Link href={whatsappMessage}>
              <Button className="flex animate-pulse flex-row items-center gap-2 py-4">
                Entrar em contato
                <Image
                  src={"/whatsapp-icon.svg"}
                  alt="Ícone do whatsapp"
                  height={24}
                  width={24}
                />
              </Button>
            </Link>

            <a
              href="#feedbacks"
              className="flex animate-bounce items-center gap-2"
            >
              <ChevronDoubleDownIcon className="h-8 w-8" />
            </a>
          </div>
        </section>

        <section
          id="feedbacks"
          className="flex h-full w-full flex-col items-start bg-main p-[5%] text-white"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl font-bold">Depoimentos</p>
            <p className="text-white/70">
              Possuímos uma avaliação média de 4.9 estrelas no google maps.
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

            <p className="w-full text-center text-xs">
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
                {/* <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/place_1.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  />
                </CarouselItem> */}
                <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/client_1.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  />
                </CarouselItem>
                <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/client_2.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  />
                </CarouselItem>
                <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/client_3.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  />
                </CarouselItem>
                <CarouselItem className="flex w-full items-center justify-center">
                  <Image
                    src={"/client_4.jpeg"}
                    alt="Imagem do ateliê"
                    width={512}
                    height={512}
                    objectFit="cover"
                    className="flex h-[300px] w-[300px] rounded-lg border border-white object-cover"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <p className="w-2/3 text-center text-xs">
            Veja alguns de nossos clientes satisfeitos com nossos serviços.{" "}
            <b>Aqui a conexão é real,</b> vamos além de concertos de roupas!
          </p>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Temos material e maquinário de tecnologia de ponta.</p>
            <div className="flex flex-row gap-4">
              <Image
                src={"/machine_1.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/machine_2.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/machine_3.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
            </div>
            <p className="text-xs opacity-70">
              Aqui sua roupa recebe tratamento especial!
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Contamos com o melhor atendimento e serviço da região.</p>
            <div className="flex flex-row gap-4">
              <Image
                src={"/feedback_2.png"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/feedback_3.png"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/feedback_1.png"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
            </div>
            <p className="text-xs opacity-70">
              São mais de 56 depoimentos e uma avaliação média de 4.9 estrelas.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 pt-12 text-center">
            <p>Espaço acolhedor e confortável.</p>
            <div className="flex flex-row gap-4">
              <Image
                src={"/ambiente_3.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/ambiente_1.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
              <Image
                src={"/ambiente_2.jpeg"}
                alt="Máquina de costura"
                height={100}
                width={100}
                objectFit="cover"
                className="flex h-[100px] w-[100px] rounded-lg border border-white object-cover"
              />
            </div>
            <p className="text-xs opacity-70">
              Contamos com estacionamento aberto e gratuito para nossos
              clientes.
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
              src={mapsLink}
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
          <Link
            href={"https://www.omanu.blog"}
            target="_blank"
            className="text-[10px] underline opacity-70"
          >
            Design e desenvolvimento por Emmanuel Rodrigues
          </Link>
        </footer>

        <a
          href="#"
          className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-main/80 p-4"
        >
          <ArrowUpIcon className="h-4 w-4 text-white" />
        </a>

        <Link
          href={whatsappMessage}
          className="fixed bottom-20 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-main/80"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0117 2C6.50572 2 2.02348 6.47837 2.02148 11.9844C2.02048 13.7444 2.48147 15.4626 3.35547 16.9766L2 22L7.23242 20.7637C8.69142 21.5597 10.3339 21.9775 12.0059 21.9785H12.0098C17.5148 21.9785 21.995 17.4991 21.998 11.9941C22 9.32514 20.9622 6.81573 19.0762 4.92773C17.1902 3.04073 14.6837 2.001 12.0117 2ZM12.0098 4C14.1458 4.001 16.1531 4.8338 17.6621 6.3418C19.1711 7.8518 20 9.85819 19.998 11.9922C19.996 16.3962 16.4138 19.9785 12.0078 19.9785C10.6748 19.9775 9.35441 19.6428 8.19141 19.0078L7.51758 18.6406L6.77344 18.8164L4.80469 19.2812L5.28516 17.4961L5.50195 16.6953L5.08789 15.9766C4.38989 14.7686 4.02048 13.3874 4.02148 11.9844C4.02348 7.58237 7.60677 4 12.0098 4ZM8.47656 7.375C8.30956 7.375 8.03955 7.4375 7.81055 7.6875C7.58155 7.9365 6.93555 8.53958 6.93555 9.76758C6.93555 10.9956 7.83008 12.1826 7.95508 12.3496C8.07908 12.5156 9.68175 15.1152 12.2188 16.1152C14.3267 16.9462 14.7549 16.7822 15.2129 16.7402C15.6709 16.6992 16.6904 16.1377 16.8984 15.5547C17.1064 14.9717 17.1069 14.4702 17.0449 14.3672C16.9829 14.2632 16.8164 14.2012 16.5664 14.0762C16.3174 13.9512 15.0903 13.3486 14.8613 13.2656C14.6323 13.1826 14.4648 13.1406 14.2988 13.3906C14.1328 13.6406 13.6558 14.2012 13.5098 14.3672C13.3638 14.5342 13.2188 14.5566 12.9688 14.4316C12.7188 14.3056 11.9149 14.0414 10.9609 13.1914C10.2189 12.5304 9.71827 11.7148 9.57227 11.4648C9.42727 11.2158 9.55859 11.0791 9.68359 10.9551C9.79559 10.8431 9.93164 10.6636 10.0566 10.5176C10.1806 10.3716 10.2236 10.2676 10.3066 10.1016C10.3896 9.93556 10.3472 9.78906 10.2852 9.66406C10.2232 9.53906 9.73763 8.3065 9.51562 7.8125C9.32863 7.3975 9.13112 7.38786 8.95312 7.38086C8.80813 7.37486 8.64256 7.375 8.47656 7.375Z"
              fill="#fff"
            />
          </svg>
        </Link>
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
