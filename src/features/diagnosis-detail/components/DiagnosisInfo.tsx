const DiagnosisInfo = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <LocationMarkerIcon />
                        <span className="ml-2">광화문광장 북측</span>
                    </h3>
                    <div className="mt-2 text-sm text-gray-500 space-x-4">
                        <span>좌표: 37.575900, 126.976800</span>
                        <span>처리 시간: 2.3초</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">검토 대기</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">보통</span>
                </div>
            </div>
            
            <div className="border-t my-4"></div>

            {/* Body */}
            <div>
                <div className="text-sm text-gray-500">
                    <span>신뢰도: <strong>87%</strong></span>
                    <span className="ml-4">신고자: <strong>시민 A (익명)</strong></span>
                </div>
                <h4 className="mt-4 font-semibold text-gray-800">상세 설명</h4>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    보도블록 모서리에 경미한 균열이 발견되었습니다. 해당 균열은 폭 2-3mm, 길이 약 15cm로 측정되며, 현재 상태로는 즉각적인 위험은 없으나 향후 확산 가능성을 모니터링할 필요가 있습니다. 우천 시 물이 침투하여 균열이 확대될 수 있으므로 정기 점검을 권장합니다.
                </p>
            </div>
        </div>
    );
};

const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default DiagnosisInfo;
