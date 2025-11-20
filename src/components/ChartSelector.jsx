import React from 'react';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const ChartSelector = ({ activeChart, onChartChange }) => {
    const charts = [
        { id: 'bar', label: 'Graphique à Barres', icon: BarChart3 },
        { id: 'line', label: 'Graphique Linéaire', icon: LineChart },
        { id: 'pie', label: 'Graphique Circulaire', icon: PieChart }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-center gap-4">
                {charts.map((chart) => {
                    const Icon = chart.icon;
                    return (
                        <button
                            key={chart.id}
                            onClick={() => onChartChange(chart.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                                activeChart === chart.id 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Icon size={20} />
                            {chart.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ChartSelector;