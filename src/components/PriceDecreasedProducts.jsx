"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import router
import { authClient } from '@/lib/auth-client'; // 2. Import auth client
import ProductCard from './ProductCard'; // Reusing your existing card component

const PriceDecreasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // 3. Initialize router
  const { data: session } = authClient.useSession(); // 4. Get session status
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

        // Filter products where price direction is "down" or change percentage < 0
        const decreasedProducts = productList.filter(
          (product) => product.change?.dir === 'down' || (product.change?.pct < 0)
        );

        setProducts(decreasedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('পণ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 5. Handle product card click logic
  const handleCardClick = (product) => {
    if (!user) {
      // If user is NOT logged in, redirect to sign-up page
      router.push('/signup');
    } else {
      // If user IS logged in, go to product details or proceed
      router.push(`/products/${product.id || product.slug}`);
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
        
        {/* Section Header matching the screenshot with green arrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#0e9f6e] text-lg font-bold">▼</span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">আজ দাম কমেছে</h2>
        </div>

        {/* Filtered Products Grid with Click Guard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <div 
              key={product.id || product.slug || index} 
              onClick={() => handleCardClick(product)}
              className="cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <ProductCard 
                product={product} 
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PriceDecreasedProducts;