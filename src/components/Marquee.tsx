import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const result = await res.json();
    
    // Safely extract the products array regardless of wrapper structure
    const products = Array.isArray(result) ? result : result.data || [];

    return (
        <div className="overflow-hidden whitespace-nowrap bg-white border-y py-2 border-none shadow-sm">
            <MarqueeText direction="right" duration={15} className="py-1">
            <div className="inline-flex space-x-6 items-center">
                {
                    products.map((d) => (
                        <span key={d.id} className="inline-flex items-center space-x-2 text-sm">
                            {/* Icon & Product Name */}
                            <span>{d.categoryIcon}</span>
                            <span className="font-semibold text-gray-800">{d.nameBn}</span>
                            
                            {/* Price & Unit (e.g., 148 টাকা/kg) */}
                            <span className="text-gray-600">{d.today} টাকা/{d.unit}</span>
                            
                            {/* Price Change Direction & Percentage */}
                            <span className={`font-medium ${d.change?.dir === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                                {d.change?.dir === 'up' ? '▲' : '▼'} {d.change?.pct}%
                            </span>
                            
                            {/* Divider */}
                            <span className='mx-3 text-gray-200'>|</span>
                        </span>
                    )) 
                }
            </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;