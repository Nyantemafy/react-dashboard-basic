import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import UploadZone from './UploadZone';
import StatCard from './StatCard';
import ChartSelector from './ChartSelector';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import { calculateStats, getChartData } from './utils/dataCalculations';
import { defaultConfig, iconMap } from './utils/config';

const Dashboard = () => {
    const [excelData, setExcelData] = useState(null);
    const [config] = useState(defaultConfig);
    const [showPreview, setShowPreview] = useState(true);
    const [activeChart, setActiveChart] = useState('bar');

    const stats = calculateStats(excelData, config);
    const chartData = getChartData(excelData);

    const handleFileUpload = (data) => {
        setExcelData(data);
        setShowPreview(false);
    };

    const handleClearData = () => {
        setExcelData(null);
        setShowPreview(true);
    };

    const renderChart = () => {
        switch (activeChart) {
            case 'bar':
                return <BarChart data={chartData} />;
            case 'line':
                return <LineChart data={chartData} />;
            case 'pie':
                return <PieChart data={chartData.pieData} />;
            default:
                return <BarChart data={chartData} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {config.title}
                            </h1>
                            <p className="text-gray-600">Dashboard de suivi des projets et budget</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowPreview(!showPreview)}
                                className="p-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all duration-300 transform hover:scale-110"
                            >
                                <Eye size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Zone d'upload */}
                {showPreview && (
                    <UploadZone 
                        onFileUpload={handleFileUpload}
                        excelData={excelData}
                        onClearData={handleClearData}
                    />
                )}

                {/* Cards statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {config.cards.map((card, index) => (
                        <StatCard 
                            key={card.id}
                            title={card.title}
                            value={stats[index].value}
                            growth={stats[index].growth}
                            icon={card.icon}
                            gradient={card.color}
                            iconMap={iconMap}
                        />
                    ))}
                </div>

                {/* Sélecteur de graphique */}
                <ChartSelector 
                    activeChart={activeChart}
                    onChartChange={setActiveChart}
                />

                {/* Graphiques */}
                {renderChart()}

                {/* Footer Info */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold mb-1">✨ Dashboard Projets & Budget</h3>
                            <p className="text-sm opacity-90">Suivi des projets, budget et progression • Adapté à vos données Excel</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">15€</p>
                            <p className="text-sm opacity-90">Pack BASIC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;