"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import ProductCard from './ProductCard'; 

const PriceIncreasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
        const data = await response.json();

        // Safely extract product array
        const productList = Array.isArray(data) 
          ? data 
          : (data.data || data.products || []);

        // Filter products where price direction is "up" (or change percentage > 0)
        const increasedProducts = productList.filter(
          (product) => product.change?.dir === 'up' || product.changePercent > 0
        );

        setProducts(increasedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('পণ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle click logic: Blocks unauthenticated users and redirects to signup
  const handleCardClick = (product, e) => {
    const productId = product.id || product.slug;
    
    if (!user) {
      e.preventDefault(); // Stop the link from opening the details page
      router.push('/signup'); // Send to signup if not logged in
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-lg text-gray-500 font-['Hind_Siliguri']">
        লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-lg text-red-600 font-['Hind_Siliguri']">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#f2f5f1] min-h-screen p-6 md:p-10 font-['Hind_Siliguri']">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header matching the screenshot */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#e02424] text-lg font-bold">▲</span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
        </div>

        {/* Filtered Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => {
            const productId = product.id || product.slug || index;

            return (
              <Link 
                key={productId}
                href={`/products/${productId}`}
                onClick={(e) => handleCardClick(product, e)}
                className="cursor-pointer transition-transform hover:scale-[1.01] block"
              >
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PriceIncreasedProducts;