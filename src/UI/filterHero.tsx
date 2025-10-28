"use client";
import React, { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { topMenuItems } from "@/lib/constantes";
import { motion } from "framer-motion";
import Link from "next/link";

const MegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);


  return (
    <motion.div
    initial={{ y: -200 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
     className="w-full bg-white shadow-md sticky top-0 z-50 ">
      <div className="w-full flex flex-col items-center mx-auto px-4">
        {/* Bouton mobile fixe */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Filter className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {topMenuItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href={item.link ?? "#"} 
                  className={`px-4 py-4 text-gray-700 hover:text-cyan-500 font-medium flex text-sm items-center gap-1 transition-colors ${
                    activeMenu === item.name ? "text-cyan-500" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation Mobile - Full Screen Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto transform transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <div className="pt-6 pb-24 px-4">
            <ul className="space-y-2">
              {topMenuItems.map((item) => (
                <li key={item.name} className="border-b border-gray-100">
                    <a
                      href="#"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                      {item.name}
                    </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
