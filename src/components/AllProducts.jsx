"use client"
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
        const data = await response.json();

        // Safely extract product array based on API response structure
        const productList = Array.isArray(data) 
          ? data 
          : (data.data || data.products || []);

        setProducts(productList);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('পণ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Bengali Number Conversion Utility
  const toBengaliNumerals = (num) => {
    if (num === undefined || num === null) return '';
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (digit) => bnNums[digit]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-lg text-gray-500 font-['Hind_Siliguri']">
        পণ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-lg text-red-600 font-['Hind_Siliguri']">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#f2f5f1] min-h-screen p-6 md:p-10 font-['Hind_Siliguri']">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">সব পণ্য</h1>
          <p className="text-sm text-gray-500">
            মোট {toBengaliNumerals(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </header>

        {/* Products Grid Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id || product.slug || index} 
              product={product} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllProducts;