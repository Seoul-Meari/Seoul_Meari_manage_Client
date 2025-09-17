import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/features/layout/components/ProfileDropdown';
import NotificationDropdown from '@/features/layout/components/NotificationDropdown';
import AccountEditModal from '@/features/layout/components/AccountEditModal';


const Header = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleToggleProfile = () => {
        setIsProfileOpen(prev => !prev);
        setIsNotificationsOpen(false);
    }
    
    const handleToggleNotifications = () => {
        setIsNotificationsOpen(prev => !prev);
        setIsProfileOpen(false);
    }

    const openAccountModal = () => {
        setIsProfileOpen(false);
        setIsAccountModalOpen(true);
    };

    const handleLogout = () => {
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <>
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
                {/* Search Bar */}
                <div className="flex items-center">
                    {/* Placeholder for a menu button or logo if sidebar is collapsible */}
                </div>
                
                <div className="flex items-center space-x-4">
                     {/* Notifications */}
                    <div ref={notificationsRef} className="relative">
                        <button onClick={handleToggleNotifications} className="p-2 rounded-full hover:bg-gray-100">
                             <BellIcon />
                        </button>
                        <NotificationDropdown isOpen={isNotificationsOpen} />
                    </div>

                    {/* Profile */}
                    <div ref={profileRef} className="relative">
                        <button onClick={handleToggleProfile} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
                           <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-700">
                                김민
                           </div>
                           <ChevronDownIcon />
                        </button>
                        <ProfileDropdown 
                            isOpen={isProfileOpen} 
                            onEditAccountClick={openAccountModal}
                            onLogoutClick={handleLogout}
                        />
                    </div>
                </div>
            </header>

            <AccountEditModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />
        </>
    );
}

// Icons
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export default Header;
