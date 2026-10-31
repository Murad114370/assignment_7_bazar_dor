

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ProductDetailsPage = () => {
    const params = useParams();
    const id = params.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
                const data = await res.json();
                const singleProduct = data.data || data.product || data;
                setProduct(singleProduct);
            } catch (err) {
                console.error("Odeeffannoo fe'uu irratti rakkoon uumameera:", err);
                setError("Odeeffannoon oomishaa argachuu hin danda'amre.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f2f5f1] font-['Hind_Siliguri']">
                <div className="text-gray-600 text-lg">Fe'amaa jira...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f5f1] font-['Hind_Siliguri'] gap-4">
                <div className="text-red-500 text-lg">{error || "Oomishni kun hin argamne."}</div>
                <Link href="/" className="text-emerald-600 font-semibold underline text-sm">
                    ← Gara fuula jalqabaatti deebi'aa
                </Link>
            </div>
        );
    }

    const markets = product.markets || [];
    
    // Gatii xiqqaa fi guddaa gabaa hunda irraa jiru herreguuf
    const overallMin = markets.length > 0 ? Math.min(...markets.map(m => m.min)) : 0;
    const overallMax = markets.length > 0 ? Math.max(...markets.map(m => m.max)) : 0;
    
    const diffAmount = Math.abs(product.today - product.yesterday);
    const isIncreased = product.change?.dir === "up";

    return (
        <div className="min-h-screen bg-[#f2f5f1] p-4 sm:p-8 font-['Hind_Siliguri'] text-gray-800">
            <div className="max-w-5xl mx-auto space-y-6">
                
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Link href="/" className="hover:underline">হোম</Link> 
                    <span>&gt;</span> 
                    <span>{product.categoryNameBn || "চাল"}</span> 
                    <span>&gt;</span> 
                    <span className="text-gray-800 font-medium">{product.nameBn}</span>
                </div>

                {/* Top Main Product Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                            {product.categoryIcon || "🍚"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
                            <p className="text-sm text-gray-500">প্রতি কেজি - {product.categoryNameBn || "চাল"}</p>
                            <p className={`text-xs mt-1 ${isIncreased ? "text-red-500" : "text-green-600"}`}>
                                গতাকালের তুলনায় আজ দাম {isIncreased ? "বেড়েছে" : "কমেছে"} - {diffAmount} টাকা
                            </p>
                        </div>
                    </div>

                    {/* Price Badge */}
                    <div className="bg-[#f9faf9] border border-gray-100 px-6 py-3 rounded-2xl text-right w-full sm:w-auto">
                        <span className="text-xs text-gray-400 block">আজকের দাম</span>
                        <span className="text-2xl font-extrabold text-gray-900">{product.today} টাকা</span>
                        <span className={`text-xs block font-semibold mt-0.5 ${isIncreased ? "text-red-500" : "text-green-600"}`}>
                            {isIncreased ? "▲" : "▼"} {product.change?.pct}%
                        </span>
                    </div>
                </div>

                {/* Price Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                        <span className="text-xs text-gray-500 block mb-1">সর্বনিম্ন দাম</span>
                        <span className="text-xl font-bold text-emerald-600">{overallMin} টাকা</span>
                        <span className="text-xs text-gray-400 block mt-1">সবচেয়ে কম দামের বাজার</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                        <span className="text-xs text-gray-500 block mb-1">সর্বাধিক দাম</span>
                        <span className="text-xl font-bold text-red-500">{overallMax} টাকা</span>
                        <span className="text-xs text-gray-400 block mt-1">সবচেয়ে বেশি দামের বাজার</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                        <span className="text-xs text-gray-500 block mb-1">গড় দাম</span>
                        <span className="text-xl font-bold text-gray-800">{product.today} টাকা</span>
                        <span className="text-xs text-gray-400 block mt-1">প্রতি কেজি-র হিসাবে</span>
                    </div>
                </div>

                {/* Market-wise Price Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200/80 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-gray-900">বাজারভিত্তিক আজকের দাম</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                    <th className="py-3.5 px-6 font-medium">বাজার</th>
                                    <th className="py-3.5 px-6 font-medium">বিভাগ</th>
                                    <th className="py-3.5 px-6 font-medium">সর্বনিম্ন</th>
                                    <th className="py-3.5 px-6 font-medium">সর্বাধিক</th>
                                    <th className="py-3.5 px-6 font-medium">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {markets.map((m, idx) => {
                                    const marketAvg = ((m.min + m.max) / 2).toFixed(1);
                                    return (
                                        <tr key={idx} className="hover:bg-gray-50/50">
                                            <td className="py-4 px-6 font-medium text-gray-900">{m.market}</td>
                                            <td className="py-4 px-6 text-gray-500">{m.division}</td>
                                            <td className="py-4 px-6">{m.min} টাকা</td>
                                            <td className="py-4 px-6">{m.max} টাকা</td>
                                            <td className="py-4 px-6">{marketAvg} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;

