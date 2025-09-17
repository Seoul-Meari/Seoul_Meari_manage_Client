import React from 'react';

interface Admin {
    name: string;
    // ... other properties
}

interface PermissionEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: Admin;
}

const PermissionCheckbox: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="flex items-start">
        <div className="flex items-center h-5">
            <input type="checkbox" className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded" />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-800">{title}</label>
            <p className="text-gray-500">{description}</p>
        </div>
    </div>
);

const PermissionEditModal: React.FC<PermissionEditModalProps> = ({ isOpen, onClose, admin }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-5 border-b">
                    <h2 className="text-xl font-bold text-gray-900">{admin.name}님 권한 수정</h2>
                    <p className="text-sm text-gray-500 mt-1">카테고리별 세부 권한을 설정합니다.</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* 도시 진단 권한 */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800">도시 진단 권한</h3>
                        <div className="mt-3 space-y-3">
                           <PermissionCheckbox title="진단 보기 (읽기)" description="AI 도시 진단 페이지의 모든 데이터를 조회합니다." />
                           <PermissionCheckbox title="진단 처리 (쓰기)" description="진단 결과를 '처리 완료' 상태로 변경합니다." />
                           <PermissionCheckbox title="진단 삭제 (삭제)" description="진단 데이터를 시스템에서 영구적으로 삭제합니다." />
                        </div>
                    </div>
                     {/* AR 메아리 권한 */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800">AR 메아리 권한</h3>
                        <div className="mt-3 space-y-3">
                           <PermissionCheckbox title="메아리 보기 (읽기)" description="AR 메아리 관리 페이지의 모든 데이터를 조회합니다." />
                           <PermissionCheckbox title="메아리 숨김/복원 (쓰기)" description="부적절한 메아리를 숨기거나 복원 처리합니다." />
                           <PermissionCheckbox title="메아리 삭제 (삭제)" description="메아리 데이터를 시스템에서 영구적으로 삭제합니다." />
                        </div>
                    </div>
                     {/* 시스템 권한 */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800">시스템 권한</h3>
                         <div className="mt-3 space-y-3">
                           <PermissionCheckbox title="사용자 관리 접근" description="일반 사용자 계정 목록을 보고 관리합니다." />
                           <PermissionCheckbox title="관리자 계정 설정 접근" description="관리자 계정을 추가, 수정, 삭제하고 권한을 부여합니다." />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-100">
                        취소
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700">
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionEditModal;
