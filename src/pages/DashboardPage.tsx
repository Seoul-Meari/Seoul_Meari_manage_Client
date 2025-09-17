import DashboardStatCard from '../features/dashboard/components/DashboardStatCard';
import { WeeklyDiagnosisChart, RiskDistributionChart } from '../features/dashboard/components/Charts';
import HourlyActivityChart from '../features/dashboard/components/HourlyActivityChart';
import DistrictStatus from '../features/dashboard/components/DistrictStatus';
import FeatureUsage from '../features/dashboard/components/FeatureUsage';
import { useState } from 'react';
import CustomDropdown from '@/components/common/CustomDropdown';

type Tab = '진단 분석' | '사용량 분석' | '지역별 분석' | '기능별 분석';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('진단 분석');
    const [dateRange, setDateRange] = useState('7일');

    const dateRangeOptions = ['7일', '30일', '90일'];

    const stats = [
        { title: '총 진단 건수', value: '2,847', change: '+12% 증가', subtitle: '지난 7일 대비', icon: <TrendingUpIcon /> },
        { title: '해결률', value: '94.2%', change: '+2.1% 향상', subtitle: '지난 7일 대비', icon: <CheckBadgeIcon /> },
        { title: '활성 사용자', value: '18,492', change: '+8% 증가', subtitle: '어제 대비', icon: <UsersIcon /> },
        { title: '평균 처리시간', value: '2.3초', change: '-0.2초 단축', subtitle: '지난 7일 대비', icon: <ClockIcon /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case '진단 분석':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <div className="lg:col-span-2">
                            <WeeklyDiagnosisChart />
                        </div>
                        <div className="h-full">
                            <RiskDistributionChart />
                        </div>
                    </div>
                );
            case '사용량 분석':
                return <HourlyActivityChart />;
            case '지역별 분석':
                return <DistrictStatus />;
            case '기능별 분석':
                return <FeatureUsage />;
            default:
                return null;
        }
    };
    
    const TabButton: React.FC<{ tabName: Tab }> = ({ tabName }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === tabName
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-500 hover:bg-white/60'
            }`}
        >
            {tabName}
        </button>
    );

    return (
        <div className="space-y-8">
            {/* 페이지 헤더 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">통계 분석</h1>
                    <p className="text-md text-gray-500 mt-1">데이터 분석 및 인사이트</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-28">
                        <CustomDropdown options={dateRangeOptions} value={dateRange} onChange={setDateRange} />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50">
                        <DownloadIcon /> <span className="ml-2">내보내기</span>
                    </button>
                </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <DashboardStatCard key={item.title} {...item} />
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                <TabButton tabName="진단 분석" />
                <TabButton tabName="사용량 분석" />
                <TabButton tabName="지역별 분석" />
                <TabButton tabName="기능별 분석" />
            </div>

            {/* Main Content based on Tab */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

// Icons
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

export default DashboardPage;
