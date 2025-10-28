"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/images/hero1.png", alt: "Modern living room" },
  { src: "/images/hero2.png", alt: "Cozy bedroom setup" },
  { src: "/images/hero1.png", alt: "Elegant dining area" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 ${
            index === current ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </motion.div>
      ))}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Home
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover premium interior decorations to create a stylish, cozy space.
        </motion.p>
        <motion.a
          href="#best-sellers"
          className="btn-primary inline-block"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Shop Now
        </motion.a>
      </div>
    </section>
  );
}
