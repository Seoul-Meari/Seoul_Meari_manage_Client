import { useState } from 'react';
import AdminAccountList from "@/features/admin/components/AdminAccountList";
import AccountEditModal from "@/features/layout/components/AccountEditModal";

const AdminPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* 페이지 헤더 */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">관리자 계정 설정</h1>
                <p className="text-md text-gray-500 mt-1">관리자 계정을 추가, 수정, 삭제합니다.</p>
            </div>

            {/* 관리자 목록 */}
            <AdminAccountList onAddAdmin={() => setIsAddModalOpen(true)} />

            {/* 새 관리자 추가 모달 */}
            <AccountEditModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)}
                mode="add"
            />
        </div>
    );
};

export default AdminPage;
