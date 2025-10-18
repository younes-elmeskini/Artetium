"use client";
import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/constantes";
import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Space = {
  title: string;
  description: string;
  link: string;
  image: string;
};

export default function Space(space: Space) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 290; // Ajustez selon la largeur de vos cartes
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="md:flex md:mx-20 mx-5 ">
      <div className="bg-gray-100 pt-5 px-5 flex flex-col justify-between md:max-w-1/3 w-full">
        <div className="space-y-2.5">
          <h2 className="font-bold text-2xl text-gray-700">{space.title}</h2>
          <p className="text-lg text-gray-600">{space.description}</p>
          <button  className="px-5 py-3 button">
            Voir plus
          </button>
        </div>
        <div className="flex justify-end">
          <Image src={space.image} alt={"pc"} height={500} width={400} />
        </div>
      </div>
      <div className="relative bg-gray-100 group md:max-w-2/3 w-full px-1.5 ">
        {/* Bouton Swipe Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100  rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Défiler vers la gauche"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Container des produits */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-hidden  scrollbar-hide scroll-smooth py-1.5 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product) => (
            <CardProduct key={product.id} {...product} />
          ))}
        </div>

        {/* Bouton Swipe Right */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100  shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Défiler vers la droite"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
