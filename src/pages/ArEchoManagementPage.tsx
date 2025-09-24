import { useState, useEffect } from 'react';
import AiStatCard from '../features/ai-diagnosis/components/AiStatCard';
import ArEchoFilterPanel from '../features/ar-echo/components/ArEchoFilterPanel';
import ArEchoCard from '../features/ar-echo/components/ArEchoCard';
import ArEchoMap from '../features/ai-diagnosis/components/ArEchoMap';
import DistrictStat from '../features/ai-diagnosis/components/DistrictStat';
import MapLegend from '../features/ai-diagnosis/components/MapLegend';

const fetchEchoList = async () => {
    try {
        // 이부분 배포버전일때 실제 백엔드 서버 주소로 변경하기기
      const response = await fetch(`http://localhost:3000/echo/echo-list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('메아리 목록을을 가져오는 중 오류 발생:', error);
      throw error;
    }
  };

const ArEchoManagementPage = () => {
    const [view, setView] = useState<'list' | 'map'>('list');
    const [echoData, setEchoData] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const loadComplaintsData = async () => {
          
          try {
            const data = await fetchEchoList();
            setEchoData(data);
            console.log('민원 데이터 로드 완료:', data);
          } catch (err) {
            console.error('민원 데이터 로드 실패:', err);
          } finally {
          }
        };
    
        loadComplaintsData();
      }, []);
    // 오늘 생성된 메아리 개수 계산
    const getTodayCreatedCount = () => {
        if (!Array.isArray(echoData)) return 0;
        
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
        return echoData.filter(item => {
            if (!item.created_at) return false;
            
            try {
                // varchar로 저장된 ISO 형식 문자열 처리
                // 2025-09-17T07:29:33.2146580Z 형식을 Date 객체로 변환
                const itemDate = new Date(item.created_at);
                
                // 유효한 날짜인지 확인
                if (isNaN(itemDate.getTime())) {
                    console.warn('Invalid date format in created_at:', item.created_at);
                    return false;
                }
                
                const itemDateString = itemDate.toISOString().split('T')[0];
                return itemDateString === today;
            } catch (error) {
                console.error('Date parsing error:', error, 'created_at:', item.created_at);
                return false;
            }
        }).length;
    };

    const todayCreatedCount = getTodayCreatedCount();

    // 필터링된 데이터 계산
    const getFilteredData = () => {
        if (!Array.isArray(echoData)) return [];
        
        return echoData.filter(item => {
            // 검색어 필터링 (writer 또는 content에서 검색)
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const matchesWriter = item.writer && item.writer.toLowerCase().includes(searchLower);
                const matchesContent = item.content && item.content.toLowerCase().includes(searchLower);
                
                if (!matchesWriter && !matchesContent) {
                    return false;
                }
            }
            
            return true;
        });
    };

    const filteredData = getFilteredData();

    const stats = [
        { title: '총 메아리', value: Array.isArray(echoData) ? echoData.length.toString() : '0', change: `+${todayCreatedCount}`, icon: <CollectionIcon />, iconBgColor: 'bg-green-100 text-green-600' },
        { title: '활성 메아리', value: '4', change: '+18', icon: <LocationMarkerIcon />, iconBgColor: 'bg-teal-100 text-teal-600' },
        { title: '신고된 메아리', value: '1', change: '+2', icon: <ExclamationCircleIcon />, iconBgColor: 'bg-red-100 text-red-600' },
        { title: '오늘 생성', value: todayCreatedCount.toString(), change: `+${todayCreatedCount}`, icon: <CalendarIcon />, iconBgColor: 'bg-orange-100 text-orange-600' },
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
            <ArEchoFilterPanel 
                activeView={view} 
                onViewChange={setView}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* Conditional Content */}
            {view === 'list' ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">
                            메아리 목록 ({filteredData.length}개)
                        </h3>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                검색 초기화
                            </button>
                        )}
                    </div>
                    {filteredData.length > 0 ? (
                        filteredData.map((data: any) => (
                            <ArEchoCard key={data.id} {...data} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm 
                                ? '검색 조건에 맞는 메아리가 없습니다.' 
                                : '메아리가 없습니다.'
                            }
                        </div>
                    )}
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
