"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Tag, Star, Heart } from "lucide-react";
import { toast } from "react-hot-toast";

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
  const [productId, setProductId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProductId = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
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
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch product");
      router.push("/catalogue");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    toast.success("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => router.push("/catalogue")}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Back to Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div>
              {/* Main Image */}
              <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
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

              {/* Image Gallery (if needed for future) */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImage(product.cover)}
                  className="w-20 h-20 rounded-lg overflow-hidden border-2 border-cyan-600"
                >
                  <Image
                    src={product.cover}
                    alt="Thumbnail"
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
              <div className="flex gap-2 mb-4">
                {product.solde && (
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    On Sale
                  </span>
                )}
                {product.BestSeller && (
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Best Seller
                  </span>
                )}
              </div>

              {/* Category */}
              <p className="text-cyan-600 font-medium mb-2">
                {product.category.replace("_", " ")}
              </p>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-cyan-600 mb-2">
                  {product.price} MAD
                </p>
                {product.solde && (
                  <p className="text-gray-500 line-through">
                    {(parseFloat(product.price) * 1.2).toFixed(0)} MAD
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart />
                  Add to Cart
                </button>

                <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-lg hover:border-gray-400 transition-colors">
                  <Heart />
                  Add to Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">
                  Product Information
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <span className="font-medium">Category:</span>{" "}
                    {product.category.replace("_", " ")}
                  </li>
                  <li>
                    <span className="font-medium">Availability:</span> In Stock
                  </li>
                  <li>
                    <span className="font-medium">SKU:</span> {product.id}
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

