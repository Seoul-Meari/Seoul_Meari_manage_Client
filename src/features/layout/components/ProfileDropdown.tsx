import React from 'react';

interface ProfileDropdownProps {
    isOpen: boolean;
    onEditAccountClick: () => void;
    onLogoutClick: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onEditAccountClick, onLogoutClick }) => {
    if (!isOpen) return null;
    
    return (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20">
            <div className="p-4 border-b">
                <p className="font-bold text-gray-800">김민준 (관리자)</p>
                <p className="text-sm text-gray-500">mj.kim@seoul-echo.dev</p>
            </div>
            <div className="p-2">
                <button
                    onClick={onEditAccountClick}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                >
                    계정 정보 수정
                </button>
                <button
                    onClick={onLogoutClick}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 rounded-md hover:bg-gray-100"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;
