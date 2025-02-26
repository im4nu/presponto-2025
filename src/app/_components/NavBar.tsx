"use client";

import { XIcon, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function NavBar() {
  const [navOpen, setNavOpen] = useState(false);
  const MenuIcon = navOpen ? XIcon : Menu;
  return (
    <nav className="fixed left-0 top-0 z-30 flex w-full flex-col">
      <div className="flex w-full items-center justify-between bg-main/60 px-12 py-6 backdrop-blur-md">
        <Image
          alt={"Logomarca"}
          src={"/logo.svg"}
          width={175 / 2}
          height={72 / 2}
        />

        <button className="text-white" onClick={() => setNavOpen(!navOpen)}>
          <MenuIcon size={24} />
        </button>
      </div>

      <div
        className={cn(
          "flex w-full flex-col items-start justify-between gap-4 bg-white px-12 py-4 text-xs font-bold text-main underline duration-300 ease-linear",
          navOpen ? "-mt-0" : "-mt-60",
        )}
      >
        <a onClick={() => setNavOpen(!navOpen)} href="#feedbacks">
          Depoimentos
        </a>
        <a onClick={() => setNavOpen(!navOpen)} href="#about">
          Sobre
        </a>
        <a onClick={() => setNavOpen(!navOpen)} href="#map">
          Localização
        </a>
        <a onClick={() => setNavOpen(!navOpen)} href="#">
          Voltar ao topo
        </a>
      </div>
    </nav>
  );
}
