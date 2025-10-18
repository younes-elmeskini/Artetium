"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  name: string;
  brand: string;
  price: number;
  image: string;
  inStock: boolean;
}

export default function CardProduct({
  name,
  brand,
  price,
  image,
  inStock,
}: ProductProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="p-5 max-w-[290px] flex flex-col gap-2.5  bg-white hover:shadow-md transition-shadow"
    >
      <div className="justify-items-center w-[250px] h-[250px] rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          width={250}
          height={250}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="bg-gray-100 p-2.5 text-sm rounded-md">
        <p className="text-gray-600">{brand}</p>
        <p className="text-primary font-semibold max-w-[250px] truncate">
          {name}
        </p>
      </div>

      <div className="p-1">
        <p className="text-xl text-secondary font-medium">{price} Dh</p>
        <div className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              inStock ? "bg-green-700" : "bg-gray-600"
            }`}
          ></div>
          <p
            className={`text-sm font-semibold ${
              inStock ? "text-green-700" : "text-gray-600"
            }`}
          >
            {inStock ? "En stock" : "Rupture"}
          </p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="flex justify-center items-center gap-2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 cursor-pointer"
      >
        <ShoppingCart />
        <p className="font-medium">Ajouter au panier</p>
      </motion.button>
    </motion.div>
  );
}
