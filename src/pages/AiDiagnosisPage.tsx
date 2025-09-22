import { useState, useEffect } from 'react';
import AiStatCard from '../features/ai-diagnosis/components/AiStatCard';
import FilterPanel from '../features/ai-diagnosis/components/FilterPanel';
import DiagnosisCard from '../features/ai-diagnosis/components/DiagnosisCard';
import ArEchoMap from '../features/ai-diagnosis/components/ArEchoMap';
import DistrictStat from '../features/ai-diagnosis/components/DistrictStat';
import MapLegend from '../features/ai-diagnosis/components/MapLegend';

// API에서 민원 데이터를 가져오는 함수
const fetchComplaintsList = async () => {
  try {
    const response = await fetch('http://localhost:3000/complaints/complaints-list', {
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
    console.error('민원 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 민원 데이터를 DiagnosisCard 형식으로 변환하는 함수
const transformComplaintToDiagnosis = (complaint: any, index: number) => {
  // 상태 매핑 (is_confirmed에 따라)
  const getStatus = (isConfirmed: boolean) => {
    return isConfirmed ? '해결됨' : '대기';
  };

  // 위험도 한글 변환
  const getDangerText = (danger: string) => {
    const dangerMap: { [key: string]: string } = {
      'illegal_dumping': '불법 투기',
      'pothole': '도로 파손',
      'broken_sidewalk': '보도 파손',
      'damaged_sign': '표지판 손상',
      'graffiti': '낙서'
    };
    return dangerMap[danger] || danger;
  };

  return {
    id: complaint.complaint_id,
    title: getDangerText(complaint.danger) || `민원 #${index + 1}`,
    description: complaint.detail || '민원 내용 없음',
    timestamp: complaint.timestamp || new Date().toISOString(),
    location: `${complaint.latitude}, ${complaint.longitude}`,
    confidence: complaint.accuracy || 75,
    status: getStatus(complaint.is_confirmed) as '대기' | '해결됨',
    image: complaint.S3_url,
  };
};

const AiDiagnosisPage = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [complaintsData, setComplaintsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 민원 데이터 가져오기
  useEffect(() => {
    const loadComplaintsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchComplaintsList();
        setComplaintsData(data);
        console.log('민원 데이터 로드 완료:', data);
      } catch (err) {
        setError('민원 데이터를 불러오는데 실패했습니다.');
        console.error('민원 데이터 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    loadComplaintsData();
  }, []);

  // Mock Data
  const stats = [
    { title: '총 진단 건수', value: '2,847', change: '+127', icon: <ChartBarIcon />, iconBgColor: 'bg-blue-100 text-blue-600' },
    { title: '고위험 알림', value: '23', change: '+3', icon: <ExclamationTriangleIcon />, iconBgColor: 'bg-red-100 text-red-600' },
    { title: '중위험 알림', value: '89', change: '+12', icon: <ClockIcon />, iconBgColor: 'bg-yellow-100 text-yellow-600' },
    { title: '해결 완료', value: '2,735', change: '+98', icon: <CheckCircleIcon />, iconBgColor: 'bg-green-100 text-green-600' },
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
          {loading && <p className="text-sm text-blue-600 mt-1">민원 데이터를 불러오는 중...</p>}
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
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
      
      {/* 민원 데이터 정보 */}
      {complaintsData.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">
              민원 데이터 ({complaintsData.length}건) 로드 완료
            </h3>
            <span className="text-sm text-blue-600">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            위의 진단 카드들이 실제 민원 데이터로 표시됩니다.
          </p>
        </div>
      )}

      {/* Conditional Content */}
      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 민원 데이터 표시 */}
          {complaintsData.length > 0 ? (
            complaintsData.map((complaint, index) => {
              const transformedData = transformComplaintToDiagnosis(complaint, index);
              return (
                <DiagnosisCard 
                  key={`complaint-${index}`}
                  {...transformedData}
                />
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">민원 데이터가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">API에서 데이터를 가져오는 중이거나 데이터가 없습니다.</p>
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


// Icons (ensure all necessary icons are here)
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ExclamationTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default AiDiagnosisPage;
