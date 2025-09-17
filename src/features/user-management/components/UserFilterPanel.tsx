import { useState } from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';

const UserFilterPanel = () => {
    const [filter, setFilter] = useState('전체');
    const filterOptions = ['전체', '활성 사용자', '비활성 사용자', '정지된 사용자', '운영자'];

    return (
        <div className="bg-white p-5 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FilterIcon className="h-5 w-5 mr-2 text-gray-400" />
                필터 및 검색
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="이름 또는 이메일로 검색..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
                <div>
                    <CustomDropdown options={filterOptions} value={filter} onChange={setFilter} />
                </div>
            </div>
        </div>
    );
};

// Icons
const FilterIcon = ({ className = "h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const SearchIcon = ({ className = "h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export default UserFilterPanel;
