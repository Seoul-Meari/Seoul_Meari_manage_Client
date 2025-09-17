import { useParams, useNavigate } from 'react-router-dom';

const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Mock data - 실제로는 API에서 가져올 데이터
    const user = {
        id: id,
        name: '김민수',
        avatar: '김민',
        email: 'minsu.kim@example.com',
        phone: '010-1234-5678',
        location: '서울시 강남구',
        status: '활성' as const,
        role: '사용자' as const,
        joinDate: '2024-01-15',
        lastActivity: '2024-01-20 14:30',
        echoes: 23,
        reports: 1,
        totalEchoes: 45,
        totalReports: 3,
        profile: {
            age: 28,
            gender: '남성',
            interests: ['AR', '도시 탐험', '사진'],
            bio: '서울의 숨겨진 매력을 찾아다니는 것을 좋아합니다.'
        },
        activity: [
            { date: '2024-01-20', action: 'AR 메아리 생성', location: '광화문광장', details: '덕수궁의 아름다운 석조전' },
            { date: '2024-01-19', action: '메아리 좋아요', location: '덕수궁', details: '이서영님의 메아리에 좋아요' },
            { date: '2024-01-18', action: 'AR 메아리 생성', location: '한강공원', details: '한강의 아름다운 일몰' },
        ]
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case '활성': return 'bg-teal-100 text-teal-800';
            case '비활성': return 'bg-orange-100 text-orange-800';
            case '정지': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleBadgeClass = (role: string) => {
        switch (role) {
            case '운영자': return 'bg-sky-100 text-sky-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/users')}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">사용자 상세 정보</h1>
                        <p className="text-md text-gray-500 mt-1">사용자 {user.name}님의 상세 정보</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700">
                        계정 수정
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700">
                        계정 정지
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 사용자 기본 정보 */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center font-bold text-2xl text-gray-600 mb-4">
                                {user.avatar}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
                            <div className="flex space-x-2 mb-4">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                                    {user.status}
                                </span>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">이메일</label>
                                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">전화번호</label>
                                <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">위치</label>
                                <p className="mt-1 text-sm text-gray-900">{user.location}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">가입일</label>
                                <p className="mt-1 text-sm text-gray-900">{user.joinDate}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">마지막 활동</label>
                                <p className="mt-1 text-sm text-gray-900">{user.lastActivity}</p>
                            </div>
                        </div>
                    </div>

                    {/* 프로필 정보 */}
                    <div className="bg-white shadow rounded-lg p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">프로필 정보</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">나이</label>
                                <p className="mt-1 text-sm text-gray-900">{user.profile.age}세</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">성별</label>
                                <p className="mt-1 text-sm text-gray-900">{user.profile.gender}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">관심사</label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {user.profile.interests.map((interest, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">소개</label>
                                <p className="mt-1 text-sm text-gray-900">{user.profile.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 통계 및 활동 */}
                <div className="lg:col-span-2">
                    {/* 통계 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-teal-100 rounded-lg">
                                    <CollectionIcon className="h-6 w-6 text-teal-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">총 메아리</p>
                                    <p className="text-2xl font-bold text-gray-900">{user.totalEchoes}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <ExclamationIcon className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">총 신고</p>
                                    <p className="text-2xl font-bold text-gray-900">{user.totalReports}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">활성 메아리</p>
                                    <p className="text-2xl font-bold text-gray-900">{user.echoes}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 최근 활동 */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
                        <div className="space-y-4">
                            {user.activity.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.date}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{activity.location}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Icons
const ArrowLeftIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const CollectionIcon = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const ExclamationIcon = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export default UserDetailPage;
