const DistrictStatus = () => {
    const districts = [
        { name: '강남구', resolved: 234, pending: 13, total: 258, solvedRate: 94.4 },
        { name: '종로구', resolved: 189, pending: 14, total: 217, solvedRate: 92.6 },
        { name: '마포구', resolved: 168, pending: 9, total: 186, solvedRate: 94.6 },
        { name: '중구', resolved: 145, pending: 5, total: 155, solvedRate: 96.6 },
        { name: '용산구', resolved: 132, pending: 7, total: 146, solvedRate: 92.5 },
    ];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">자치구별 진단 현황</h3>
            <div className="mt-4 space-y-5">
                {districts.map(d => (
                    <div key={d.name}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-md font-semibold text-gray-800">{d.name}</span>
                            <div className="flex items-center space-x-2 text-xs">
                                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">총 {d.resolved}</span>
                                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">해결 {d.pending}</span>
                                <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800">대기 {d.total - d.resolved - d.pending}</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${d.solvedRate}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>해결률: {d.solvedRate}%</span>
                            <span>{d.pending}건 처리 중</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DistrictStatus;
