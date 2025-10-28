"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { categories } from "@/lib/constantes";

export default function SectionCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
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
    <div className=" bg-white">
      <div className="max-w-full">
        {/* Header */}
        <div className="md:text-center text-start mx-5">
          <h3 className="text-xl md:text-2xl font-semibold text-primary mb">
            Collections Populaires
          </h3>
        </div>
        
        {/* Scroll Container */}
        <div className="relative group">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth py-6 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 snap-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <div className="flex flex-col justify-center items-center ml-14">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name || "Category"}
                      width={350}
                      height={350}
                      className="rounded-full bg-[#e7ebee] w-[250px] h-[250px] md:w-[350px] md:h-[350px] object-cover"
                    />
                  </motion.div>
                  <p className="mt-3 text-center font-medium md:text-xl text-gray-800">
                    {category.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}