"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/constantes";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-b border-primary relative"
    >
      <div className="flex items-center justify-between py-2.5 px-4 md:px-16">
        {/* Logo */}
        <Link href={"/"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold text-primary cursor-pointer"
          >
            LOGO
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center gap-5">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.link}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <Image src={item.icon} alt={item.alt} width={20} height={20} />
                <p className="text-sm text-primary font-semibold">
                  {item.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.div
          className="sm:hidden block "
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-6 bg-white absolute top-full left-0 w-full z-10 sm:hidden"
          >
            <div className="flex flex-col px-4 gap-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={23}
                    height={23}
                  />
                  <p className="text-lg text-primary font-semibold">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
