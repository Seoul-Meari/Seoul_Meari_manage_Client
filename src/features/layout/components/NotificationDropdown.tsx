import React from 'react';

interface NotificationDropdownProps {
    isOpen: boolean;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    const notifications = [
        { message: '새로운 AI 진단 결과가 등록되었습니다.', time: '5분 전' },
        { message: '박지훈 사용자가 새로운 AR 메아리를 생성했습니다.', time: '28분 전' },
        { message: '시스템 점검이 30분 후에 시작될 예정입니다.', time: '1시간 전' },
    ];

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">알림</h3>
            </div>
            <div className="divide-y">
                {notifications.map((notif, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50">
                        <p className="text-sm text-gray-700">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationDropdown;
