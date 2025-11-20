import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';

const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    
    const slices = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        currentAngle += angle;
        
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (currentAngle * Math.PI) / 180;
        
        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);
        
        const largeArc = angle > 180 ? 1 : 0;
        
        return {
            d: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
            color: item.color,
            label: item.label,
            value: item.value,
            percentage: percentage.toFixed(1)
        };
    });

    return (
        <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PieChartIcon className="mr-3 text-pink-600" size={24} />
                Répartition des Projets par Priorité
            </h3>
            <div className="flex items-center gap-8">
                <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                        {slices.map((slice, i) => (
                            <path
                                key={i}
                                d={slice.d}
                                fill={slice.color}
                                className="hover:opacity-80 transition-all duration-300 cursor-pointer"
                                style={{ transformOrigin: '50% 50%' }}
                            />
                        ))}
                        <circle cx="50" cy="50" r="20" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{total}</p>
                            <p className="text-xs text-gray-600">Total projets</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 space-y-3">
                    {slices.map((slice, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: slice.color }}></div>
                                <span className="text-sm font-medium text-gray-700">{slice.label}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">{slice.value}</p>
                                <p className="text-xs text-gray-500">{slice.percentage}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChart;