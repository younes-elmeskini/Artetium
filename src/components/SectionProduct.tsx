"use client";
import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/constantes";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionProduct() {
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
    <div>
      <div className="relative group mx-10">
        {/* Bouton Swipe Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100  transition-all duration-200 hover:scale-110"
          aria-label="Défiler vers la gauche"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Container des produits */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-hidden  scrollbar-hide scroll-smooth py-1.5 snap-x snap-mandatory "
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
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100  hover:scale-110"
          aria-label="Défiler vers la droite"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
