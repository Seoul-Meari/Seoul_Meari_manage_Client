import { Link, useParams } from 'react-router-dom';
import AttachedImage from '../features/diagnosis-detail/components/AttachedImage';
import QuickActions from '../features/diagnosis-detail/components/QuickActions';
import DiagnosisInfo from '../features/diagnosis-detail/components/DiagnosisInfo';
import AiAnalysisResult from '../features/diagnosis-detail/components/AiAnalysisResult';

const DiagnosisDetailPage = () => {
    const { id } = useParams(); // URL에서 ID를 가져옵니다.

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div>
                <Link to="/ai-diagnosis" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <ArrowLeftIcon />
                    <span className="ml-2">돌아가기</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">진단 상세보기</h1>
                <p className="text-md text-gray-500">ID: {id}</p>
            </div>
            
            {/* 메인 콘텐츠 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* 왼쪽 컬럼 */}
                <div className="lg:col-span-2 space-y-6">
                    <DiagnosisInfo />
                    <AiAnalysisResult />
                </div>
                
                {/* 오른쪽 컬럼 */}
                <div className="space-y-6">
                    <AttachedImage />
                    <QuickActions />
                </div>
            </div>
        </div>
    );
};

const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

export default DiagnosisDetailPage;
