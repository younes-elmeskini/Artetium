"use client";
import React, { useState } from "react";
import { ChevronDown, Filter, X, Search } from "lucide-react";
import { categories } from "@/lib/constantes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FilterHeroProps {
  onSearch?: (search: string) => void;
  onCategoryChange?: (category: string) => void;
}

const FilterHero: React.FC<FilterHeroProps> = ({ onSearch, onCategoryChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };


  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white shadow-md sticky top-0 z-50"
    >
      <div className="w-full flex flex-col items-center mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full max-w-7xl items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.slice(0, 4).map((cat, index) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(`Category_${index + 1}`)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === `Category_${index + 1}`
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.slice(0, 4).map((cat, index) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(`Category_${index + 1}`)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === `Category_${index + 1}`
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default FilterHero;
