import React from 'react';

// Utility helper to convert numbers to Bengali numerals
const toBengaliNumerals = (num) => {
  if (num === undefined || num === null) return '';
  const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bnNums[digit]);
};

// Unit formatting helper
const formatUnit = (unit) => {
  if (unit === 'kg') return 'প্রতি কেজি';
  if (unit === 'litre' || unit === 'liter') return 'প্রতি লিটার';
  return unit ? `প্রতি ${unit}` : 'প্রতি কেজি';
};

const ProductCard = ({ product }) => {
  const name = product.nameBn || 'পণ্য';
  const unit = formatUnit(product.unit);
  const price = product.today || 0;
  
  const changeData = product.change || {};
  const changePct = Number(changeData.pct) || 0;
  
  // Determine direction: check dir property or number sign
  const isUp = changeData.dir === 'up' || changePct > 0;
  const isDown = changeData.dir === 'down' || changePct < 0;

  // Always display absolute percentage value formatted in Bengali
  const formattedPercent = toBengaliNumerals(Math.abs(changePct).toFixed(1));

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#eef2ed] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Card Top: Icon + Name/Unit */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 bg-[#f4f6f3] rounded-full flex items-center justify-center text-2xl flex-shrink-0">
          {product.categoryIcon || product.image || '🛒'}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug">{name}</h3>
          <span className="text-xs text-gray-500 mt-0.5 block">{unit}</span>
        </div>
      </div>

      {/* Card Bottom: Price + Badge */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
          <span className="text-xl font-bold text-gray-900">
            {toBengaliNumerals(price)} <span className="text-base font-medium">টাকা</span>
          </span>
        </div>

        <div>
          {/* Price Increased (Red Badge) */}
          {isUp && changePct !== 0 && (
            <span className="inline-flex items-center gap-1 bg-[#fde8e8] text-[#e02424] px-2.5 py-1 rounded-full text-xs font-semibold">
              ▲ {formattedPercent}%
            </span>
          )}

          {/* Price Decreased (Green Badge) */}
          {isDown && changePct !== 0 && (
            <span className="inline-flex items-center gap-1 bg-[#edf7ed] text-[#0e9f6e] px-2.5 py-1 rounded-full text-xs font-semibold">
              ▼ {formattedPercent}%
            </span>
          )}

          {/* Price Unchanged (Gray Badge) */}
          {changePct === 0 && (
            <span className="inline-flex items-center gap-1 bg-[#f3f4f6] text-[#6b7280] px-2.5 py-1 rounded-full text-xs font-semibold">
              — {toBengaliNumerals('0.0')}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;