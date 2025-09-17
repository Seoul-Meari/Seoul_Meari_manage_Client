import { useState } from 'react';
import PermissionEditModal from './PermissionEditModal';

interface Admin {
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    avatar: string;
}

interface AdminAccountListItemProps {
    admin: Admin;
}

const AdminAccountListItem: React.FC<AdminAccountListItemProps> = ({ admin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-700 flex-shrink-0">
                        {admin.avatar}
                    </div>
                    <div className="ml-4">
                        <p className="font-bold text-gray-900">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                </div>
                
                <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-700">{admin.role}</p>
                </div>

                <div className="hidden lg:block">
                    <p className="text-sm text-gray-500">마지막 로그인: {admin.lastLogin}</p>
                </div>

                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsModalOpen(true)} className="px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100">
                        권한 수정
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
                            <DotsVerticalIcon className="h-5 w-5" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">계정 비활성화</a>
                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">계정 삭제</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <PermissionEditModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                admin={admin}
            />
        </>
    );
};

const DotsVerticalIcon = ({ className="h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>;

export default AdminAccountListItem;
