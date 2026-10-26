import Image from 'next/image';
import React from 'react';

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-[#F7FAF8] border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 gap-6 sm:gap-8 lg:gap-12 shadow-sm">
        
        {/* Left Content Area */}
        <div className="flex-1 space-y-3 sm:space-y-4 text-left w-full">
          {/* Date Badge */}
          <div className="inline-block bg-[#E3F2E9] text-[#008A45] font-medium text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
            {date}
          </div>

          {/* Main Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug sm:leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h2>

          {/* Subtitle / Description */}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl lg:max-w-2xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <button className="w-full sm:w-auto bg-[#008A45] hover:bg-[#007038] text-white font-medium text-xs sm:text-sm md:text-base px-6 py-2.5 sm:py-3 rounded-lg shadow-md shadow-green-700/20 transition-all duration-200 cursor-pointer">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end flex-shrink-0">
          <div className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto">
            <Image
              src="/bazar-hero.png"
              alt="bazar hero image"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;