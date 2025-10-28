"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductFormData {
  name: string;
  category: string;
  cover: string;
  description: string;
  price: string;
  solde: boolean;
  BestSeller: boolean;
}

const categories = [
  { value: "Category_1", label: "Category 1" },
  { value: "Category_2", label: "Category 2" },
  { value: "Category_3", label: "Category 3" },
  { value: "Category_4", label: "Category 4" },
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [productId, setProductId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "Category_1",
    cover: "",
    description: "",
    price: "",
    solde: false,
    BestSeller: false,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setProductId(id);
      
      try {
        const response = await fetch(`/api/products/${id}`);
        const product = await response.json();

        if (!response.ok) {
          toast.error(product.error || "Failed to fetch product");
          router.push("/admin/products");
          return;
        }

        setFormData({
          name: product.name || "",
          category: product.category || "Category_1",
          cover: product.cover || "",
          description: product.description || "",
          price: product.price || "",
          solde: product.solde || false,
          BestSeller: product.BestSeller || false,
        });
      } catch (error: unknown) {
        toast.error((error as Error).message || "Failed to fetch product");
        router.push("/admin/products");
        return;
      } finally {
        setFetching(false);
      }
    };
    
    fetchProductData();
  }, [params, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({ ...prev, cover: data.url }));
      toast.success("Image uploaded successfully");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload / URL */}
            <div>
              <label
                htmlFor="cover"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Image *
              </label>
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploading && (
                  <div className="mt-2 text-sm text-cyan-600 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-600"></div>
                    Uploading image...
                  </div>
                )}
              </div>
              {formData.cover && (
                <div className="mt-3">
                  <Image
                    width={128}
                    height={128}
                    src={formData.cover}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (in MAD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  MAD
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-16 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="solde"
                  checked={formData.solde}
                  onChange={(e) =>
                    handleCheckboxChange("solde", e.target.checked)
                  }
                  className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  On Sale
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="BestSeller"
                  checked={formData.BestSeller}
                  onChange={(e) =>
                    handleCheckboxChange("BestSeller", e.target.checked)
                  }
                  className="w-5 h-5 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Best Seller
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

