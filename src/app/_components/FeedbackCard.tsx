"use client";

import { $Enums } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

interface PostProps {
  inverted?: boolean;
  post: {
    id: number;
    name: string;
    description: string | null;
    videoUrl: string | null;
    rate: string | null;
    membershipDuration: string | null;
    status: $Enums.statusEnum;
    usingVideo: boolean;
    imageKey: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function FeedbackCard({ inverted, post }: PostProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const videoUrl = post.videoUrl;
  const videoIdMatch = /\/shorts\/([a-zA-Z0-9_-]+)/.exec(videoUrl ?? "");
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  useEffect(() => {
    if (post) {
      if (post.imageKey) setImageUrl(post.imageKey);
    }
  }, []);
  return (
    <div
      className={cn(
        "flex h-[350px] w-full items-start justify-between gap-4",
        inverted && "flex-row-reverse",
      )}
    >
      {post.usingVideo && embedUrl ? (
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="h-full w-[60%] rounded-lg"
        ></iframe>
      ) : (
        <Image
          src={image ? URL.createObjectURL(image) : (imageUrl ?? "/hero.png")}
          width={150}
          height={200}
          alt="Imagem do cliente deste depoimento"
          className="flex h-full w-[60%] rounded-lg border border-white"
        />
      )}

      <div className="flex w-[40%] flex-col items-center justify-start gap-6 py-4">
        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">{post.name}</p>
          <p className="text-xs text-white/70">{post.createdAt.toString()}</p>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-lg font-bold">Avaliação</p>
          <p>{post.rate} Estelas</p>
          <div className="flex">
            {/* {Array.from({ length: post.rate ?? 0 }).map((_, i) => (
              <StarIcon className="h-4 w-4 fill-white/80" key={i} />
            ))} */}
          </div>
        </div>

        <div className="flex w-full flex-col">
          <p className="text-lg font-bold">Já é cliente a:</p>
          <p>Mais de {post.membershipDuration} anos</p>
        </div>
      </div>
    </div>
  );
}
