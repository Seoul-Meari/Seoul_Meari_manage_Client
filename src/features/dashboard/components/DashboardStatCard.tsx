import React from 'react';

interface DashboardStatCardProps {
    title: string;
    value: string;
    change: string;
    subtitle: string;
    icon: React.ReactNode;
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({ title, value, change, subtitle, icon }) => {
    const isPositive = change.includes('증가') || change.includes('향상') || change.includes('단축');
    const changeColor = change.includes('단축') ? 'text-green-600' : isPositive ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white p-5 shadow rounded-lg flex justify-between items-center">
            <div className="flex items-center">
                <div className="w-1.5 h-10 bg-blue-500 rounded-full mr-4"></div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <div className="flex items-baseline mt-1 space-x-2">
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
                {icon}
            </div>
        </div>
    );
};

export default DashboardStatCard;
