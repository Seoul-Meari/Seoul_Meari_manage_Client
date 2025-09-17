const MapLegend = () => {
    const legendItems = [
        { name: '텍스트 메아리', color: 'bg-teal-500' },
        { name: '이미지 메아리', color: 'bg-orange-500' },
        { name: '복합 메아리', color: 'bg-sky-400' },
    ];

    return (
        <div className="bg-white p-4 shadow rounded-lg flex justify-center items-center space-x-6">
            {legendItems.map(item => (
                <div key={item.name} className="flex items-center">
                    <span className={`h-3 w-3 rounded-full ${item.color}`}></span>
                    <span className="ml-2 text-sm text-gray-600">{item.name}</span>
                </div>
            ))}
        </div>
    );
};

export default MapLegend;
