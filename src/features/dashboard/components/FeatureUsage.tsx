const FeatureUsage = () => {
    const features = [
        { rank: 1, name: 'AR 메아리 생성', usage: '2,847회 사용', change: '+12%' },
        { rank: 2, name: '시간 탐험 체험', usage: '1,653회 사용', change: '+18%' },
        { rank: 3, name: '위치 공유', usage: '1,234회 사용', change: '+18%' },
        { rank: 4, name: '문제 신고', usage: '987회 사용', change: '+23%' },
    ];
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">기능별 사용 통계</h3>
            <div className="mt-4 space-y-3">
                {features.map(f => (
                    <div key={f.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-sm">{f.rank}</span>
                            <div className="ml-4">
                                <p className="font-semibold text-gray-800">{f.name}</p>
                                <p className="text-sm text-gray-500">{f.usage}</p>
                            </div>
                        </div>
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-orange-100 text-orange-800">{f.change}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureUsage;
