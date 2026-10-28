"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  categoryIcon?: string;
  image?: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryInfo {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const toBengaliNumerals = (num: number | string): string => {
  if (num === undefined || num === null) return "";
  const bnNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bnNums[parseInt(digit)]);
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryInfo | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products and categories on load or when category changes
  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch products
        const productsRes = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`
        );
        const productsData = await productsRes.json();
        const productList: Product[] = Array.isArray(productsData)
          ? productsData
          : productsData.data || [];

        setProducts(productList);

        // 2. Fetch category details for the banner
        const categoriesRes = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        const categoriesData: CategoryInfo[] = await categoriesRes.json();
        const matchedCat = categoriesData.find(
          (c) => c.slug === category || c.id === category
        );

        setCurrentCategory(
          matchedCat || { id: category, slug: category, nameBn: category, icon: "🛒" }
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  // Handle sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.today || 0;
    const priceB = b.today || 0;

    if (sortOrder === "high-to-low") {
      return priceB - priceA; // Descending (বেশি থেকে কম)
    } else if (sortOrder === "low-to-high") {
      return priceA - priceB; // Ascending (কম থেকে বেশি)
    }
    return 0; // Default order
  });

  if (loading) {
    return (
      <div className="bg-[#f2f5f1] min-h-screen flex items-center justify-center font-['Hind_Siliguri'] text-lg text-gray-600">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-[#f2f5f1] min-h-screen p-6 md:p-10 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 1. Category Header Banner */}
        <div className="bg-white rounded-2xl p-6 border border-[#eef2ed] shadow-sm flex items-center gap-5">
          <div className="w-16 h-16 bg-[#f4f6f3] rounded-full flex items-center justify-center text-3xl flex-shrink-0">
            {currentCategory?.icon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {currentCategory?.nameBn || category}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {toBengaliNumerals(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* 2. Sorting Dropdown Bar matching the screenshot */}
        <div className="bg-white rounded-2xl p-4 border border-[#eef2ed] shadow-sm flex items-center justify-end gap-3">
          <span className="text-sm text-gray-600 font-medium">সাজান</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-[#f8faf7] border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
          </select>
        </div>

        {/* 3. Product Count Text */}
        <div className="text-sm text-gray-600">
          মোট {toBengaliNumerals(products.length)}টি পণ্য দেখানো হচ্ছে
        </div>

        {/* 4. Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500 border border-[#eef2ed]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}