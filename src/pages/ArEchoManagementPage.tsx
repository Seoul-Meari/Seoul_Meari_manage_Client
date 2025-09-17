import { useState } from 'react';
import AiStatCard from '../features/ai-diagnosis/components/AiStatCard';
import ArEchoFilterPanel from '../features/ar-echo/components/ArEchoFilterPanel';
import ArEchoCard from '../features/ar-echo/components/ArEchoCard';
import ArEchoMap from '../features/ai-diagnosis/components/ArEchoMap';
import DistrictStat from '../features/ai-diagnosis/components/DistrictStat';
import MapLegend from '../features/ai-diagnosis/components/MapLegend';


const ArEchoManagementPage = () => {
    const [view, setView] = useState<'list' | 'map'>('list');

    const stats = [
        { title: '총 메아리', value: '5', change: '+23', icon: <CollectionIcon />, iconBgColor: 'bg-green-100 text-green-600' },
        { title: '활성 메아리', value: '4', change: '+18', icon: <LocationMarkerIcon />, iconBgColor: 'bg-teal-100 text-teal-600' },
        { title: '신고된 메아리', value: '1', change: '+2', icon: <ExclamationCircleIcon />, iconBgColor: 'bg-red-100 text-red-600' },
        { title: '오늘 생성', value: '15', change: '+8', icon: <CalendarIcon />, iconBgColor: 'bg-orange-100 text-orange-600' },
    ];

    const echoData = [
        { id: 1, type: '텍스트', status: '활성', content: '여기서 친구들과 맛있는 한식을 먹었어요! 정말 좋은 추억이네요 😊', location: '광화문광장', author: '김민수', timestamp: '2024-01-15 14:30', likes: 23, views: 156 },
        { id: 2, type: '이미지', status: '활성', reportCount: 1, content: '[이미지] 덕수궁의 아름다운 석조전', location: '덕수궁', author: '이서영', timestamp: '2024-01-15 13:45', likes: 45, views: 289, comments: 1 },
    ];

    const districtData = [
        { district: '강남구', active: 15, total: 42 },
        { district: '종로구', active: 23, total: 67 },
        { district: '마포구', active: 18, total: 55 },
        { district: '서초구', active: 12, total: 38 },
        { district: '용산구', active: 20, total: 51 },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">AR 메아리 관리</h1>
                <p className="text-md text-gray-500 mt-1">사용자가 생성한 AR 콘텐츠 관리</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <AiStatCard key={item.title} {...item} />
                ))}
            </div>

            {/* Filter Panel */}
            <ArEchoFilterPanel activeView={view} onViewChange={setView} />

            {/* Conditional Content */}
            {view === 'list' ? (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">메아리 목록 ({echoData.length}개)</h3>
                    {echoData.map((data, index) => (
                        <ArEchoCard key={data.id} {...data} />
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    <ArEchoMap />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {districtData.map(data => <DistrictStat key={data.district} {...data} />)}
                    </div>
                    <MapLegend />
                </div>
            )}
        </div>
    );
};

// Icons
const CollectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ExclamationCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


export default ArEchoManagementPage;
