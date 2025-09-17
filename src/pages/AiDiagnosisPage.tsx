import { useState } from 'react';
import AiStatCard from '../features/ai-diagnosis/components/AiStatCard';
import FilterPanel from '../features/ai-diagnosis/components/FilterPanel';
import DiagnosisCard from '../features/ai-diagnosis/components/DiagnosisCard';
import ArEchoMap from '../features/ai-diagnosis/components/ArEchoMap';
import DistrictStat from '../features/ai-diagnosis/components/DistrictStat';
import MapLegend from '../features/ai-diagnosis/components/MapLegend';


const AiDiagnosisPage = () => {
  const [view, setView] = useState<'list' | 'map'>('list');

  // Mock Data
  const stats = [
    { title: '총 진단 건수', value: '2,847', change: '+127', icon: <ChartBarIcon />, iconBgColor: 'bg-blue-100 text-blue-600' },
    { title: '고위험 알림', value: '23', change: '+3', icon: <ExclamationTriangleIcon />, iconBgColor: 'bg-red-100 text-red-600' },
    { title: '중위험 알림', value: '89', change: '+12', icon: <ClockIcon />, iconBgColor: 'bg-yellow-100 text-yellow-600' },
    { title: '해결 완료', value: '2,735', change: '+98', icon: <CheckCircleIcon />, iconBgColor: 'bg-green-100 text-green-600' },
  ];

  const diagnosisData = [
    { title: '광화문광장 북측', description: '보도블록 모서리에 경미한 균열 발견. 보행자 안전에 잠재적 위험 요소로 판단됨. 향후 확산 가능성을 모니터링 권장.', timestamp: '2024-01-15 14:30', location: '37.5759, 126.9768', confidence: 87, status: '대기' as const, severity: '보통' as const },
    { title: '덕수궁 돌담길', description: '가로등 하단부 부식 감지. 장기 방치 시 전기 점검을 통한 사전 보수 필요. 현재 안전성에는 문제없음.', timestamp: '2024-01-15 13:45', location: '37.5658, 126.9750', confidence: 73, status: '해결됨' as const, severity: '낮음' as const },
    { title: '청계천 입구', description: '계단 난간 연결부 느슨함 발견. 즉시 점검 및 보수 권장. 보행자 안전에 직접적 영향 가능.', timestamp: '2024-01-15 12:20', location: '37.5707, 126.9772', confidence: 94, status: '대기' as const, severity: '높음' as const },
    { title: '명동성당 앞', description: '보도 타일 일부 들뜸 현상 관찰. 우천 시 미끄러짐 위험 증가 예상.', timestamp: '2024-01-15 11:15', location: '37.5633, 126.9840', confidence: 82, status: '대기' as const, severity: '보통' as const },
  ];
  
  const districtData = [
      { district: '강남구', active: 15, total: 42 },
      { district: '종로구', active: 23, total: 67 },
      { district: '마포구', active: 18, total: 55 },
      { district: '서초구', active: 12, total: 38 },
      { district: '용산구', active: 20, total: 51 },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI 도시 진단</h1>
          <p className="text-md text-gray-500 mt-1">실시간 위험 요소 분석 및 관리</p>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <AiStatCard key={item.title} {...item} />
        ))}
      </div>
      
      {/* Filter Panel */}
      <FilterPanel activeView={view} onViewChange={setView} />
      
      {/* Conditional Content */}
      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {diagnosisData.map((data, index) => (
            <DiagnosisCard key={index} {...data} />
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


// Icons (ensure all necessary icons are here)
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ExclamationTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default AiDiagnosisPage;
