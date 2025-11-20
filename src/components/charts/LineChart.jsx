import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';

const LineChart = ({ data }) => {
    const maxValue = Math.max(...data.datasets[0].data, ...data.datasets[1].data);
    const minValue = Math.min(...data.datasets[0].data, ...data.datasets[1].data);
    const range = maxValue - minValue;
    
    const getY = (value) => {
        return 100 - ((value - minValue) / range) * 100;
    };

    const createPath = (values) => {
        const points = values.map((value, index) => {
            const x = (index / (values.length - 1)) * 100;
            const y = getY(value);
            return `${x},${y}`;
        });
        return `M ${points.join(' L ')}`;
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <LineChartIcon className="mr-3 text-purple-600" size={24} />
                Budget vs Nombre de Projets par Statut
            </h3>
            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.2" />
                    ))}
                    
                    <path
                        d={createPath(data.datasets[0].data)}
                        fill="none"
                        stroke={data.datasets[0].color}
                        strokeWidth="0.5"
                        className="transition-all duration-300"
                    />
                    
                    <path
                        d={createPath(data.datasets[1].data)}
                        fill="none"
                        stroke={data.datasets[1].color}
                        strokeWidth="0.5"
                        className="transition-all duration-300"
                    />
                    
                    {data.datasets[0].data.map((value, index) => (
                        <circle
                            key={`p1-${index}`}
                            cx={(index / (data.datasets[0].data.length - 1)) * 100}
                            cy={getY(value)}
                            r="1"
                            fill={data.datasets[0].color}
                            className="hover:r-2 transition-all cursor-pointer"
                        />
                    ))}
                    
                    {data.datasets[1].data.map((value, index) => (
                        <circle
                            key={`p2-${index}`}
                            cx={(index / (data.datasets[1].data.length - 1)) * 100}
                            cy={getY(value)}
                            r="1"
                            fill={data.datasets[1].color}
                            className="hover:r-2 transition-all cursor-pointer"
                        />
                    ))}
                </svg>
                
                <div className="flex justify-between mt-4">
                    {data.labels.map((label, i) => (
                        <span key={i} className="text-xs text-gray-600 font-medium">{label}</span>
                    ))}
                </div>
                
                <div className="flex justify-center gap-6 mt-4">
                    {data.datasets.map((dataset, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dataset.color }}></div>
                            <span className="text-sm text-gray-700 font-medium">{dataset.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LineChart;