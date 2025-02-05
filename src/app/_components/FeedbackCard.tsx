import { StarIcon } from "@heroicons/react/16/solid";
import { cn } from "~/lib/utils";

interface PostProps {
  inverted?: boolean;
}

export default function FeedbackCard({ inverted }: PostProps) {
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
          <p className="text-2xl font-bold">Nome do cliente</p>
          <p className="text-xs text-white/70">01/02/2025</p>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-lg font-bold">Avaliação</p>
          <p>5 Estelas</p>
          <div className="flex">
            {new Array(5).fill(0).map((_, i) => (
              <StarIcon className="h-4 w-4 fill-white/80" key={i} />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-lg font-bold">Já é cliente a:</p>
          <p>Mais de 5 anos</p>
        </div>
      </div>
    </div>
  );
}
