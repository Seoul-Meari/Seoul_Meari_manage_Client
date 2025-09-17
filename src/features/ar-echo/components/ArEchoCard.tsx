import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

type EchoType = '텍스트' | '이미지';
type EchoStatus = '활성' | '신고';

interface ArEchoCardProps {
    id: number;
    type: EchoType;
    status: EchoStatus;
    reportCount?: number;
    content: string;
    location: string;
    author: string;
    timestamp: string;
    likes: number;
    views: number;
    comments?: number;
}

const Tag: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${color}`}>
    {children}
  </span>
);


const ArEchoCard: React.FC<ArEchoCardProps> = (props) => {
    const { id, type, status, reportCount, content, location, author, timestamp, likes, views, comments } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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


    return (
        <div className="bg-white p-5 shadow rounded-lg">
            <div className="flex justify-between items-start">
                {/* Left Side: Tags and Content */}
                <div>
                    <div className="flex items-center space-x-2">
                        <Tag color={type === '텍스트' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
                            {type === '텍스트' ? '📝 텍스트' : '🖼️ 이미지'}
                        </Tag>
                        <Tag color="bg-teal-100 text-teal-800">{status}</Tag>
                        {reportCount && (
                             <Tag color="bg-red-100 text-red-800">🚨 신고 {reportCount}건</Tag>
                        )}
                    </div>
                    <p className="mt-3 text-gray-800">{content}</p>
                    <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                        <span>📍 {location}</span>
                        <span>👤 {author}</span>
                        <span>🕒 {timestamp}</span>
                    </div>
                </div>
                {/* Right Side: Actions */}
                <div className="flex items-center space-x-3 relative" ref={menuRef}>
                    <Link to={`/ar-echo/${id}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center bg-gray-100 px-3 py-1 rounded-md">👁️ 보기</Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-sm text-gray-600 hover:text-gray-900">...</button>
                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <ul className="py-1">
                                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">수정</a></li>
                                <li><a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">빠른 삭제</a></li>
                                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">사용자 제재</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* Footer: Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">👍 {likes}</span>
                <span className="flex items-center">👁️ {views}</span>
                {comments !== undefined && <span className="flex items-center">💬 {comments}</span>}
            </div>
        </div>
    );
};

export default ArEchoCard;
