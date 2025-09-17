import AdminAccountListItem from "./AdminAccountListItem";

interface AdminAccountListProps {
    onAddAdmin: () => void;
}

const AdminAccountList = ({ onAddAdmin }: AdminAccountListProps) => {
    const admins = [
        {
            name: '김민준',
            email: 'mj.kim@seoul-echo.dev',
            role: '슈퍼 관리자',
            lastLogin: '2025-09-16 10:30:15',
            avatar: '김민'
        },
        {
            name: '이수빈',
            email: 'sb.lee@seoul-echo.dev',
            role: '콘텐츠 관리자',
            lastLogin: '2025-09-16 09:15:42',
            avatar: '이수'
        },
        {
            name: '박도현',
            email: 'dh.park@seoul-echo.dev',
            role: '사용자 관리자',
            lastLogin: '2025-09-15 17:55:01',
            avatar: '박도'
        },
    ];

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">전체 관리자 ({admins.length}명)</h3>
                <button 
                    onClick={onAddAdmin}
                    className="flex items-center px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700"
                >
                    <PlusIcon className="h-4 w-4 mr-1" /> 새 관리자 추가
                </button>
            </div>
            <div className="divide-y divide-gray-200">
                {admins.map((admin, index) => (
                    <AdminAccountListItem key={index} admin={admin} />
                ))}
            </div>
        </div>
    );
}

const PlusIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export default AdminAccountList;
