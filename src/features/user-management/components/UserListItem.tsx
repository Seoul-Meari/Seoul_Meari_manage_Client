import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountEditModal from '@/features/layout/components/AccountEditModal';
import ConfirmModal from '@/components/common/ConfirmModal';

interface User {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    location: string;
    status: '활성' | '비활성' | '정지';
    role: '사용자' | '운영자';
    lastActivity: string;
    echoes: number;
    reports: number;
}

interface UserListItemProps {
    user: User;
}

const getStatusBadgeClass = (status: User['status']) => {
    switch (status) {
        case '활성': return 'bg-teal-100 text-teal-800';
        case '비활성': return 'bg-orange-100 text-orange-800';
        case '정지': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getRoleBadgeClass = (role: User['role']) => {
    switch (role) {
        case '운영자': return 'bg-sky-100 text-sky-800';
        default: return 'bg-gray-200 text-gray-800';
    }
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{ type: string; message: string; title: string } | null>(null);
    
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAction = (action: string) => {
        setIsMenuOpen(false);
        
        switch (action) {
            case '상세보기':
                navigate(`/users/${user.name.toLowerCase().replace(/\s+/g, '-')}`);
                break;
            case '계정 수정':
                setIsEditModalOpen(true);
                break;
            case '비밀번호 초기화':
                setConfirmAction({
                    type: 'password-reset',
                    title: '비밀번호 초기화',
                    message: `${user.name}님의 비밀번호를 초기화하시겠습니까?`
                });
                setIsConfirmModalOpen(true);
                break;
            case '계정 정지':
                setConfirmAction({
                    type: 'suspend',
                    title: '계정 정지',
                    message: `${user.name}님의 계정을 정지하시겠습니까?`
                });
                setIsConfirmModalOpen(true);
                break;
            case '계정 활성화':
                setConfirmAction({
                    type: 'activate',
                    title: '계정 활성화',
                    message: `${user.name}님의 계정을 활성화하시겠습니까?`
                });
                setIsConfirmModalOpen(true);
                break;
            case '계정 삭제':
                setConfirmAction({
                    type: 'delete',
                    title: '계정 삭제',
                    message: `${user.name}님의 계정을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
                });
                setIsConfirmModalOpen(true);
                break;
        }
    };

    const handleConfirm = () => {
        if (confirmAction) {
            console.log(`${confirmAction.type} confirmed for user: ${user.name}`);
            // 여기서 실제 API 호출을 할 수 있습니다
        }
        setIsConfirmModalOpen(false);
        setConfirmAction(null);
    };

    return (
        <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center w-full md:w-1/3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                    {user.avatar}
                </div>
                <div className="ml-4">
                    <div className="flex items-center">
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>{user.status}</span>
                        <span className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>{user.role}</span>
                    </div>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                        <span><MailIcon className="inline h-4 w-4 mr-1"/>{user.email}</span>
                        <span><PhoneIcon className="inline h-4 w-4 mr-1"/>{user.phone}</span>
                        <span><LocationMarkerIcon className="inline h-4 w-4 mr-1"/>{user.location}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 md:space-x-8">
                <div className="flex space-x-6 text-center">
                    <div>
                        <p className="text-xs text-gray-500">마지막 활동</p>
                        <p className="font-semibold text-gray-800">{user.lastActivity}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">메아리</p>
                        <p className="font-semibold text-gray-800">{user.echoes}개</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">신고</p>
                        <p className="font-semibold text-gray-800">{user.reports}건</p>
                    </div>
                </div>
                <div ref={menuRef} className="relative">
                    <button 
                        onClick={handleMenuToggle}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                        <DotsVerticalIcon className="h-5 w-5" />
                    </button>
                    
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                            <div className="py-1">
                                <button
                                    onClick={() => handleAction('상세보기')}
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    상세보기
                                </button>
                                <button
                                    onClick={() => handleAction('계정 수정')}
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    계정 수정
                                </button>
                                <button
                                    onClick={() => handleAction('비밀번호 초기화')}
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    비밀번호 초기화
                                </button>
                                <hr className="my-1" />
                                {user.status === '활성' ? (
                                    <button
                                        onClick={() => handleAction('계정 정지')}
                                        className="w-full text-left block px-4 py-2 text-sm text-orange-600 hover:bg-gray-100"
                                    >
                                        계정 정지
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAction('계정 활성화')}
                                        className="w-full text-left block px-4 py-2 text-sm text-teal-600 hover:bg-gray-100"
                                    >
                                        계정 활성화
                                    </button>
                                )}
                                <button
                                    onClick={() => handleAction('계정 삭제')}
                                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    계정 삭제
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 계정 수정 모달 */}
            <AccountEditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                mode="edit"
            />

            {/* 확인 모달 */}
            {confirmAction && (
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => {
                        setIsConfirmModalOpen(false);
                        setConfirmAction(null);
                    }}
                    onConfirm={handleConfirm}
                    title={confirmAction.title}
                    message={confirmAction.message}
                    type={confirmAction.type === 'delete' ? 'danger' : 'warning'}
                />
            )}
        </div>
    );
};

// Icons
const MailIcon = ({ className="h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = ({ className="h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LocationMarkerIcon = ({ className="h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const DotsVerticalIcon = ({ className="h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>;


export default UserListItem;
