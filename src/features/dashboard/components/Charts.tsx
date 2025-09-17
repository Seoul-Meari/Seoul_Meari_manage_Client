import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const WeeklyDiagnosisChart = () => {
    const data = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                label: '진단 건수',
                data: [45, 42, 52, 48, 47, 42, 30],
                backgroundColor: '#4fd1c5', // teal-400
                borderRadius: 4,
            },
            {
                label: '해결 건수',
                data: [42, 38, 35, 60, 55, 30, 27],
                backgroundColor: '#2c7a7b', // teal-700
                borderRadius: 4,
            },
        ],
    };
    const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const } } };
    return (
        <div className="bg-white p-6 shadow rounded-lg flex flex-col" style={{ height: '410px' }}>
            <h3 className="text-lg font-semibold text-gray-900 flex-shrink-0">주간 진단 현황</h3>
            <div className="mt-4 relative flex-grow">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

const RiskDistributionChart = () => {
    const data = {
        labels: ['저위험', '중위험', '고위험'],
        datasets: [{
            data: [61, 31, 8],
            backgroundColor: ['#38b2ac', '#f6ad55', '#ef4444'], // teal-500, orange-400, red-500
            hoverBackgroundColor: ['#319795', '#ed8936', '#dc2626'],
            borderWidth: 0,
        }],
    };
    const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' as const } } };
    return (
        <div className="bg-white p-6 shadow rounded-lg h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 flex-shrink-0">위험도별 분포</h3>
            <div className="mt-4 relative flex-grow">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export { WeeklyDiagnosisChart, RiskDistributionChart };
