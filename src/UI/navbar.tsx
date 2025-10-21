"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { logout } from "@/action/authActions";
import { API_URL } from "@/lib/constantes";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Vérification de l'authentification...");
        const response = await fetch(`${API_URL}/check-auth`, {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("📡 Réponse statut:", response.status);
        const data = await response.json();
        console.log("📦 Données reçues:", data);
        setIsLoggedIn(data.authenticated || false);
        console.log("✅ État connecté:", data.authenticated || false);
      } catch (error) {
        console.error("❌ Erreur lors de la vérification d'authentification:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const menuItems = [
    {
      icon: "/icons/phone.png",
      alt: "support",
      label: "Support",
      link: "/+212708015107",
    },
    {
      icon: "/icons/panier.png",
      alt: "panier",
      label: "Panier",
      link: "/panier",
    },
  ];

  // Ajouter conditionnellement Connexion ou Déconnexion
  const authMenuItem = isLoggedIn
    ? {
        icon: "/icons/logout.png",
        alt: "deconnexion",
        label: "Déconnexion",
        link: "#",
      }
    : {
        icon: "/icons/user.png",
        alt: "connexion",
        label: "Connexion",
        link: "/auth/login",
      };

  const allMenuItems = [...menuItems, authMenuItem];

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

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <nav className="border-b border-primary relative">
        <div className="flex items-center justify-between py-2.5 px-4 md:px-16">
          <Link href={"/"}>
            <div className="text-xl font-bold text-primary cursor-pointer">
              LOGO
            </div>
          </Link>
          <div className="hidden md:flex items-center justify-center gap-5">
            <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

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
          {allMenuItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label === "Déconnexion" ? (
                <button
                  onClick={async () => {
                    await logout();
                    setIsLoggedIn(false);
                    window.location.href = "/auth/login";
                    window.location.reload();
                  }}
                  className="flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-primary font-semibold">
                    {item.label}
                  </p>
                </button>
              ) : (
                <Link
                  href={item.link}
                  className="flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-primary font-semibold">
                    {item.label}
                  </p>
                </Link>
              )}
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
              {allMenuItems.map((item, index) => (
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
                  {item.label === "Déconnexion" ? (
                    <button
                      onClick={async () => {
                        await logout();
                        setIsLoggedIn(false);
                        window.location.href = "/auth/login";
                      }}
                      className="flex items-center gap-3 w-full"
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
                    </button>
                  ) : (
                    <Link href={item.link} className="flex items-center gap-3 w-full">
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        width={23}
                        height={23}
                      />
                      <p className="text-lg text-primary font-semibold">
                        {item.label}
                      </p>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}