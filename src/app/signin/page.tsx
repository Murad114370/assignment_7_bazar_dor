import React from 'react';
import Link from 'next/link';

const SignInPage = () => {
    return (
        <div className="bg-[#f2f5f1] min-h-screen py-10 px-4 font-['Hind_Siliguri'] flex flex-col items-center">
            
            {/* Top Header & Subtitle */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">সাইন ইন</h1>
                <p className="text-sm text-gray-500 mt-1">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-[#eef2ed] shadow-sm rounded-3xl p-8 w-full max-w-md">
                <form className="flex flex-col gap-4">
                    
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                        <input 
                            type="email" 
                            className="w-full bg-[#f9faf9] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500" 
                            placeholder="you@example.com" 
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
                        <input 
                            type="password" 
                            className="w-full bg-[#f9faf9] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500" 
                            placeholder="কমপক্ষে ৮ অক্ষর" 
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-[#0e9f6e] hover:bg-[#0b825b] text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
                    >
                        সাইন ইন
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="px-3 text-xs text-gray-400">অথবা</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 transition-all">
                        <span>🌐</span> Google দিয়ে চালিয়ে যান
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 py-2.5 px-3 rounded-xl text-xs font-medium text-gray-700 transition-all">
                        <span>🐙</span> GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                {/* Don't have an account link */}
                <div className="text-center mt-6 text-xs text-gray-600">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link href="/signup" className="text-[#0e9f6e] font-semibold hover:underline">
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6">
                <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>

        </div>
    );
};

export default SignInPage;