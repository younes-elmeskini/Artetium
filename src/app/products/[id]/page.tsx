"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Tag, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "@/lib/hooks/useCartContext";

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

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductId = async () => {
      const resolvedParams = await params;
      await fetchProduct(resolvedParams.id);
    };

    fetchProductId();
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch product");
      }

      setProduct(data);
      setSelectedImage(data.cover);
    } catch (error: unknown) {
      toast.error((error as unknown as Error).message || "Failed to fetch product");
      router.push("/catalogue");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    toast.success("Produit ajouté au panier!");
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      cover: product.cover,
      description: product.description,
      price: product.price,
    });
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-4">Produit introuvable</p>
          <button
            onClick={() => router.push("/catalogue")}
            className="px-4 py-2 text-sm sm:text-base bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Retour
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Image Section */}
            <div>
              {/* Main Image */}
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4">
                <Image
                  src={selectedImage || product.cover}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/sofa.png";
                  }}
                />
              </div>

              {/* Image Gallery */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImage(product.cover)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-cyan-600 flex-shrink-0"
                >
                  <Image
                    src={product.cover}
                    alt="Miniature"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {product.solde && (
                  <span className="px-2.5 py-1 sm:px-3 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                    En Solde
                  </span>
                )}
                {product.BestSeller && (
                  <span className="px-2.5 py-1 sm:px-3 bg-green-500 text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    Best Seller
                  </span>
                )}
              </div>

              {/* Category */}
              <p className="text-sm sm:text-base text-cyan-600 font-medium mb-2">
                {product.category.replace("_", " ")}
              </p>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <p className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-2">
                  {product.price} MAD
                </p>
                {product.solde && (
                  <p className="text-sm sm:text-base text-gray-500 line-through">
                    {(parseFloat(product.price) * 1.2).toFixed(0)} MAD
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Ajouter au panier
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Informations produit
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <li>
                    <span className="font-medium">Catégorie:</span>{" "}
                    {product.category.replace("_", " ")}
                  </li>
                  <li>
                    <span className="font-medium">Disponibilité:</span> En stock
                  </li>
                  <li>
                    <span className="font-medium">Référence:</span> {product.id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}