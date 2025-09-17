const AiAnalysisResult = () => {
    const confidenceScores = [
        { name: '객체 인식', score: 94 },
        { name: '위험도 평가', score: 87 },
        { name: '상황 분류', score: 92 },
    ];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <SparklesIcon />
                <span className="ml-2">AI 분석 결과</span>
            </h3>

            <div className="mt-4 space-y-4">
                {/* 감지된 객체 */}
                <div>
                    <h4 className="font-semibold text-gray-800">감지된 객체</h4>
                    <div className="mt-2 flex space-x-2">
                        <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-800">보도블록</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800">균열</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800">아스팔트</span>
                    </div>
                </div>
                
                {/* 위험 요소 */}
                <div>
                    <h4 className="font-semibold text-gray-800">위험 요소</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li className="flex items-center"><WarningIcon /> <span className="ml-2">보행자 안전에 잠재적 위험</span></li>
                        <li className="flex items-center"><WarningIcon /> <span className="ml-2">우천 시 미끄러짐 위험 증가</span></li>
                        <li className="flex items-center"><WarningIcon /> <span className="ml-2">균열 확산 가능성</span></li>
                    </ul>
                </div>

                {/* 권장 조치 */}
                <div>
                    <h4 className="font-semibold text-gray-800">권장 조치</h4>
                     <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li className="flex items-center"><CheckIcon /> <span className="ml-2">정기 점검 스케쥴 추가</span></li>
                        <li className="flex items-center"><CheckIcon /> <span className="ml-2">균열 보수 작업 계획</span></li>
                        <li className="flex items-center"><CheckIcon /> <span className="ml-2">주변 보도블록 상태 확인</span></li>
                    </ul>
                </div>
                
                {/* 신뢰도 점수 */}
                <div>
                    <h4 className="font-semibold text-gray-800">신뢰도 점수</h4>
                    <div className="mt-2 space-y-2">
                        {confidenceScores.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{item.name}</span>
                                    <span>{item.score}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${item.score}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Icons
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const WarningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export default AiAnalysisResult;
