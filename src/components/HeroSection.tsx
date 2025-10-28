"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel() {
  const slides = [
    {
      image: "/images/image1.jpg",
      title: "Plongez dans l’Univers du Gaming",
      subtitle: "Consoles, PC et accessoires aux meilleurs prix",
    },
    {
      image: "/images/image2.jpg",
      title: "Performance et Puissance",
      subtitle: "Découvrez nos PC gamers ultra-performants",
    },
    {
      image: "/images/image3.jpg",
      title: "Jouez Sans Limites",
      subtitle: "Équipez-vous comme un pro et dominez vos parties",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
  
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-96 w-full overflow-hidden md:mt-10 group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image de fond */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-primary/30" />
          </div>

          {/* Contenu */}
          <div className="relative h-full flex items-center w-full justify-center text-center ">
            <div className="w-full">
              <h1 className="text-2xl md:text-5xl font-bold text-primary text-shadow-2xs  mb-6 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-xs md:text-2xl text-white mb-8 animate-fade-in">
                {slide.subtitle}
              </p>
              <button className="bg-primary text-white md:px-8 md:py-4 px-3 py-4 rounded-full font-semibold text-xs md:text-lg hover:bg-secondary transition-all transform hover:scale-105">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white opacity-0 group-hover:opacity-100  text-primary p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Slide précédent"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white opacity-0 group-hover:opacity-100  text-primary p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Slide suivant"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicateurs */}
      <div className="absolute md:bottom-8 bottom-4  left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-12 bg-white"
                : "w-2 bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
