import React from 'react';

interface DistrictStatProps {
  district: string;
  active: number;
  total: number;
}

const DistrictStat: React.FC<DistrictStatProps> = ({ district, active, total }) => {
  const percentage = total > 0 ? (active / total) * 100 : 0;

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-800">{district}</span>
        <span className="px-2 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
          {active}/{total}
        </span>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>활성</span>
          <span>총 {total}개</span>
        </div>
      </div>
    </div>
  );
};

export default DistrictStat;
