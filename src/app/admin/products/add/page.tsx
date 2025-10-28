"use client";

import { useState } from "react";
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

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "Category_1",
    cover: "",
    description: "",
    price: "",
    solde: false,
    BestSeller: false,
  });

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
    const fd = new FormData();
    fd.append("file", file);
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Failed to upload image");
        console.error(data.error);
        setUploading(false);
        return;
      }
  
      // Save URL in form state using functional update
      setFormData((prev) => ({ ...prev, cover: data.url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cover) {
      toast.error("Please upload a product image");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || "Failed to create product");
        setLoading(false);
        return;
      }
      
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (error) {
      toast.error("An error occurred while creating the product");
      console.error("Product creation error:", error);
      setLoading(false);
    }
  };

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
            Add New Product
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
                {loading ? "Creating..." : "Create Product"}
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

