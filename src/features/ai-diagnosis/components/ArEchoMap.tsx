const ArEchoMap = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapIcon />
                <span className="ml-2">AR 메아리 지도</span>
            </h3>
            <div className="mt-4 h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">실시간 AR 메아리 위치 (시뮬레이션)</p>
                {/* 실제 지도 라이브러리가 여기에 통합됩니다. */}
            </div>
        </div>
    );
};

const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


export default ArEchoMap;
