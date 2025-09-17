import React, { useState } from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';

type ViewType = 'list' | 'map';

interface ArEchoFilterPanelProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ArEchoFilterPanel: React.FC<ArEchoFilterPanelProps> = ({ activeView, onViewChange }) => {
  const [type, setType] = useState('전체 유형');
  const [status, setStatus] = useState('전체 상태');

  const typeOptions = ['전체 유형', '불편사항', '개선제안', '정보공유'];
  const statusOptions = ['전체 상태', '활성', '비활성'];

  const getButtonClass = (view: ViewType) => {
    return `px-3 py-1 text-sm font-medium rounded-md transition-colors ${
      activeView === view
        ? 'bg-white text-gray-800 shadow'
        : 'text-gray-500 hover:bg-white/60'
    }`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* 검색창 */}
            <div className="md:col-span-1 relative">
                <SearchIcon />
                <input type="text" placeholder="내용 또는 작성자로 검색" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            {/* 필터 */}
            <div className="md:col-span-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                     <div className="w-48">
                        <CustomDropdown options={typeOptions} value={type} onChange={setType} />
                    </div>
                     <div className="w-48">
                        <CustomDropdown options={statusOptions} value={status} onChange={setStatus} />
                    </div>
                </div>
                {/* 탭 */}
                <div className="flex items-center bg-gray-100 p-1 rounded-md">
                    <button className={getButtonClass('list')} onClick={() => onViewChange('list')}>
                        목록 보기
                    </button>
                    <button className={getButtonClass('map')} onClick={() => onViewChange('map')}>
                        지도 보기
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

const SearchIcon = () => (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </div>
);

export default ArEchoFilterPanel;
