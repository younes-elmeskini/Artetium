"use client";
import CardProduct from "@/components/CardProduct";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Space = {
  title: string;
  link: string;
};

interface Product {
  id: string;
  name: string;
  category: string;
  cover: string;
  description: string;
  price: string;
  solde: boolean;
  BestSeller: boolean;
}

export default function Space(space: Space) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Determine filter based on title
      let filter = "all";
      
      if (space.title.toLowerCase().includes("promotion")) {
        filter = "solde"; // Fetch products on sale
      } else if (space.title.toLowerCase().includes("best seller")) {
        filter = "best"; // Fetch best sellers
      }

      const params = new URLSearchParams();
      params.append("limit", "10"); // Limit to 10 products for the carousel
      
      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.products) {
        let filteredProducts = data.products;
        
        // Filter based on space title
        if (filter === "solde") {
          filteredProducts = filteredProducts.filter((p: Product) => p.solde);
        } else if (filter === "best") {
          filteredProducts = filteredProducts.filter((p: Product) => p.BestSeller);
        }
        
        setProducts(filteredProducts.slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 290;
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
    <div className="md:flex flex-col justify-center items-center  md:mx-20 mx-5  bg-gray-100">
      <div className="bg-gray-100 p-6 flex flex-col  justify-between w-full">
        <div className=" flex justify-between items-center">
          <h2 className="font-bold text-2xl text-gray-700">{space.title}</h2>
          <button  className="px-5 py-3 rounded-md text-white bg-black">
            Voir plus
          </button>
        </div>
      </div>
      <div className="relative bg-gray-100 group w-full px-1.5 ">
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
          {loading ? (
            <div className="flex items-center justify-center w-full h-64">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center w-full h-64 text-gray-500">
              No products available
            </div>
          ) : (
            products.map((product) => (
              <CardProduct key={product.id} {...product} />
            ))
          )}
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
