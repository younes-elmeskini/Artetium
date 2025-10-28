"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/useCartContext";
import { toast } from "react-hot-toast";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  cover: string;
  description: string;
  price: string;
  solde?: boolean;
  BestSeller?: boolean;
}

export default function CardProduct({
  id,
  name,
  category,
  cover,
  description,
  price,
  solde,
  BestSeller,
}: ProductProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      category,
      cover,
      description,
      price,
      solde,
      BestSeller,
    });
    toast.success("Produit ajouté au panier!");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="p-5 max-w-[290px] flex flex-col gap-2.5 bg-white hover:shadow-md transition-shadow relative"
    >
      {/* Badges */}
      {(solde || BestSeller) && (
        <div className="absolute top-6 right-6 flex gap-1 z-10">
          {solde && (
            <span className="px-2 py-1 text-xs font-bold bg-orange-500 text-white rounded">
              Sale
            </span>
          )}
          {BestSeller && (
            <span className="px-2 py-1 text-xs font-bold bg-green-500 text-white rounded">
              Best Seller
            </span>
          )}
        </div>
      )}

      {/* Clickable Image Link */}
      <Link href={`/products/${id}`}>
        <div className="justify-items-center w-[250px] h-[250px] rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
          <Image
            src={cover || "/images/sofa.png"}
            alt={name}
            width={250}
            height={250}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/sofa.png";
            }}
          />
        </div>
      </Link>

      <Link href={`/products/${id}`}>
        <div className="bg-gray-100 p-2.5 text-sm rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
          <p className="text-gray-600 capitalize">
            {category ? category.replace("_", " ") : "Uncategorized"}
          </p>
          <p className="text-primary font-semibold max-w-[250px] truncate">
            {name}
          </p>
        </div>
      </Link>

      <div className="p-1">
        <p className="text-xl text-secondary font-medium">{price || "0"} MAD</p>
        {description && (
          <p className="text-xs text-gray-500 truncate max-w-[200px]">{description}</p>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className="flex justify-center items-center gap-2 bg-black text-white p-2 rounded-md hover:bg-primary/90 cursor-pointer"
      >
        <ShoppingCart />
        <p className="font-medium">Ajouter au panier</p>
      </motion.button>
    </motion.div>
  );
}
