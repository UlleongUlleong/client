import React from 'react';

export const AlcoholCategorySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg animate-pulse">
          {/* 카테고리 제목 스켈레톤 */}
          <div className="h-6 bg-gray-300 w-1/2 mb-4 rounded"></div>

          {/* 술 아이템들 스켈레톤 */}
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
