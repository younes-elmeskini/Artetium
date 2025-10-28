"use client";

import { useState, useEffect, useCallback } from "react";
import CardProduct from "@/components/CardProduct";
import FilterHero from "@/UI/filterHero";
import { Loader2 } from "lucide-react";

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

export default function CatalogurPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      params.append("page", page.toString());
      params.append("limit", "12");

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }

      setProducts(data.products);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error: unknown) {
      console.error("Error fetching products:", (error as Error).message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [page, categoryFilter, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
  };

  return (
    <div>
      <FilterHero 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No products found</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap max-w-full justify-center md:mt-10 gap-4">
            {products.map((product) => (
              <CardProduct key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 mb-8">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
