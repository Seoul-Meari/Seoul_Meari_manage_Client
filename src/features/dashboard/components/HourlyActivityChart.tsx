import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HourlyActivityChart = () => {
    const data = {
        labels: ['00', '04', '08', '12', '16', '20'],
        datasets: [
            {
                label: '사용자 활동',
                data: [120, 80, 450, 700, 540, 380],
                fill: false,
                borderColor: '#2c7a7b', // teal-700
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg" style={{ height: '450px' }}>
            <h3 className="text-lg font-semibold text-gray-900">시간대별 사용자 활동</h3>
            <div className="mt-4 h-full pb-8">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default HourlyActivityChart;
