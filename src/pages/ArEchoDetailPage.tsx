import { Link, useParams } from 'react-router-dom';

const ArEchoDetailPage = () => {
    const { id } = useParams();

    // Mock data - in a real app, you'd fetch this based on the ID
    const echoData = {
        id: id,
        type: '이미지',
        status: '활성',
        reportCount: 1,
        content: '[이미지] 덕수궁의 아름다운 석조전',
        location: '덕수궁',
        author: '이서영',
        timestamp: '2024-01-15 13:45',
        likes: 45,
        views: 289,
        comments: 1,
        imageUrl: 'https://images.unsplash.com/photo-1574281358135-23a2d263a299?q=80&w=2940&auto=format&fit=crop',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link to="/ar-echo" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <ArrowLeftIcon />
                    <span className="ml-2">목록으로 돌아가기</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">AR 메아리 상세 정보</h1>
                <p className="text-md text-gray-500">ID: {id}</p>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 shadow rounded-lg">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Left: Image */}
                    <div className="md:w-1/3 flex-shrink-0">
                        <img src={echoData.imageUrl} alt="AR Echo" className="w-full h-auto object-cover rounded-lg" />
                    </div>

                    {/* Right: Details */}
                    <div className="md:w-2/3 mt-6 md:mt-0">
                        <div className="flex items-center space-x-2">
                             <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">🖼️ {echoData.type}</span>
                             <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800">{echoData.status}</span>
                             {echoData.reportCount && <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">🚨 신고 {echoData.reportCount}건</span>}
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{echoData.content}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                            <span>📍 {echoData.location}</span>
                            <span>👤 {echoData.author}</span>
                            <span>🕒 {echoData.timestamp}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t flex items-center space-x-6 text-md text-gray-700">
                            <span className="flex items-center font-semibold">👍 {echoData.likes}</span>
                            <span className="flex items-center font-semibold">👁️ {echoData.views}</span>
                            {echoData.comments !== undefined && <span className="flex items-center font-semibold">💬 {echoData.comments}</span>}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t">
                            <h3 className="font-semibold text-gray-800">관리자 조치</h3>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">메아리 삭제</button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">사용자 경고</button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">콘텐츠 숨김</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

export default ArEchoDetailPage;
