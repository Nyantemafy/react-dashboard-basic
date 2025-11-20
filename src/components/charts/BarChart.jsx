import React from 'react';
import { BarChart3 } from 'lucide-react';

const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.datasets[0].data, ...data.datasets[1].data);
    
    return (
        <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="mr-3 text-indigo-600" size={24} />
                Projets par Statut
            </h3>
            <div className="flex items-end justify-between h-64 gap-3">
                {data.labels.map((label, index) => {
                    const height1 = (data.datasets[0].data[index] / maxValue) * 100;
                    const height2 = (data.datasets[1].data[index] / maxValue) * 100;
                    
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col gap-1">
                                <div 
                                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 cursor-pointer relative group"
                                    style={{ height: `${height1}%`, minHeight: '20px' }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {data.datasets[0].data[index]} projets
                                    </div>
                                </div>
                                <div 
                                    className="w-full bg-gradient-to-t from-pink-500 to-rose-500 rounded-t-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer relative group"
                                    style={{ height: `${height2}%`, minHeight: '20px' }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {data.datasets[1].data[index]} k€
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600 mt-2 font-medium text-center leading-tight">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <div className="flex justify-center gap-6 mt-4">
                {data.datasets.map((dataset, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-pink-500'}`}></div>
                        <span className="text-sm text-gray-700 font-medium">{dataset.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChart;