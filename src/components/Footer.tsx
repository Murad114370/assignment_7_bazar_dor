import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#F7FAF8] border-t border-gray-200/80 py-4 px-4 sm:px-8 lg:px-12 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-xs sm:text-sm text-gray-700 font-normal">
                {/* বাম পাশের লেখা */}
                <p className="text-center md:text-left">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* ডান পাশের লেখা */}
                <p className="text-center md:text-right text-gray-600">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;