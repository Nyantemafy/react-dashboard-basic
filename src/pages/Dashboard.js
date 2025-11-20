import React, { useState } from 'react';
import { Upload, TrendingUp, Users, DollarSign, BarChart3, Download, Settings, Eye, Trash2, ShoppingCart, Activity, Target, PieChart, LineChart } from 'lucide-react';
import * as XLSX from 'xlsx';

// Configuration du dashboard (facilement modifiable)
const defaultConfig = {
    title: "Dashboard Analytique Pro",
    theme: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899"
    },
    cards: [
        { id: 1, title: "Ventes Totales", icon: "DollarSign", color: "from-blue-500 to-cyan-500", dataKey: "Ventes" },
        { id: 2, title: "Nouveaux Clients", icon: "Users", color: "from-purple-500 to-pink-500", dataKey: "Clients" },
        { id: 3, title: "Commandes", icon: "ShoppingCart", color: "from-green-500 to-emerald-500", dataKey: "Commandes" },
        { id: 4, title: "Taux de Conversion", icon: "Target", color: "from-orange-500 to-red-500", dataKey: "Conversion", suffix: "%" }
    ],
    charts: {
        bar: true,
        line: true,
        pie: true
    }
    };

    const Dashboard = () => {
    const [excelData, setExcelData] = useState(null);
    const [config, setConfig] = useState(defaultConfig);
    const [isDragging, setIsDragging] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [activeChart, setActiveChart] = useState('bar');

    // Icônes disponibles
    const iconMap = {
        DollarSign,
        Users,
        ShoppingCart,
        Target,
        Activity,
        TrendingUp
    };

    // Gestion de l'upload Excel
    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setExcelData(jsonData);
        setShowPreview(false);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
        handleFileUpload(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
    };

    // Calcul des statistiques depuis Excel
    const calculateStats = () => {
        if (!excelData || excelData.length === 0) {
        return [
            { value: "1,250 €", growth: "+12.5%" },
            { value: "48", growth: "+8%" },
            { value: "127", growth: "+15%" },
            { value: "24.8", growth: "+3.2%" }
        ];
        }
        
        return config.cards.map(card => {
        const key = card.dataKey;
        const values = excelData.map(row => parseFloat(row[key] || row[key.toLowerCase()] || 0));
        const total = values.reduce((sum, val) => sum + val, 0);
        const avg = total / values.length;
        
        // Calcul de la croissance (simplifié)
        const growth = values.length > 1 ? 
            (((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1) : 0;
        
        return {
            value: card.suffix ? `${avg.toFixed(1)}${card.suffix}` : `${total.toLocaleString('fr-FR')} €`,
            growth: `${growth > 0 ? '+' : ''}${growth}%`
        };
        });
    };

    const stats = calculateStats();

    // Préparation des données pour les graphiques
    const getChartData = () => {
        if (!excelData || excelData.length === 0) {
        return {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [
            { label: 'Ventes', data: [12, 19, 8, 15, 22, 18], color: '#6366f1' },
            { label: 'Clients', data: [8, 12, 6, 10, 16, 14], color: '#8b5cf6' }
            ],
            pieData: [
            { label: 'Produit A', value: 35, color: '#6366f1' },
            { label: 'Produit B', value: 30, color: '#8b5cf6' },
            { label: 'Produit C', value: 20, color: '#ec4899' },
            { label: 'Autres', value: 15, color: '#10b981' }
            ]
        };
        }

        const labels = excelData.slice(0, 6).map((row, i) => row.Mois || row.Month || row.Date || `Item ${i+1}`);
        const ventes = excelData.slice(0, 6).map(row => parseFloat(row.Ventes || row.Sales || row.Valeur || 0));
        const clients = excelData.slice(0, 6).map(row => parseFloat(row.Clients || row.Customers || 0));
        
        // Données Pie - Agrégation par catégorie si disponible
        const categories = {};
        excelData.forEach(row => {
        const cat = row.Categorie || row.Category || row.Produit || 'Autres';
        const val = parseFloat(row.Ventes || row.Sales || row.Valeur || 0);
        categories[cat] = (categories[cat] || 0) + val;
        });
        
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
        const pieData = Object.entries(categories).slice(0, 6).map(([label, value], i) => ({
        label,
        value: Math.round(value),
        color: colors[i % colors.length]
        }));
        
        return {
        labels,
        datasets: [
            { label: 'Ventes', data: ventes, color: '#6366f1' },
            { label: 'Clients', data: clients, color: '#8b5cf6' }
        ],
        pieData: pieData.length > 0 ? pieData : [
            { label: 'Produit A', value: 35, color: '#6366f1' },
            { label: 'Produit B', value: 30, color: '#8b5cf6' },
            { label: 'Produit C', value: 20, color: '#ec4899' },
            { label: 'Autres', value: 15, color: '#10b981' }
        ]
        };
    };

    const chartData = getChartData();

    // Composant Card
    const StatCard = ({ title, value, growth, icon: iconName, gradient }) => {
        const Icon = iconMap[iconName] || DollarSign;
        return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 group`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <Icon size={32} className="opacity-80" />
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold flex items-center gap-1">
                <TrendingUp size={12} />
                {growth}
                </div>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
            </div>
        </div>
        );
    };

    // Graphique à barres
    const SimpleBarChart = ({ data }) => {
        const maxValue = Math.max(...data.datasets[0].data);
        return (
        <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="mr-3 text-indigo-600" size={24} />
            Évolution des Ventes
            </h3>
            <div className="flex items-end justify-between h-64 gap-3">
            {data.datasets[0].data.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 cursor-pointer relative group"
                        style={{ height: `${height}%`, minHeight: '20px' }}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {value}
                    </div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 font-medium">{data.labels[index]}</span>
                </div>
                );
            })}
            </div>
        </div>
        );
    };

    // Graphique en ligne
    const SimpleLineChart = ({ data }) => {
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
            <LineChart className="mr-3 text-purple-600" size={24} />
            Tendances Comparatives
            </h3>
            <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grille */}
                {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.2" />
                ))}
                
                {/* Ligne 1 */}
                <path
                d={createPath(data.datasets[0].data)}
                fill="none"
                stroke={data.datasets[0].color}
                strokeWidth="0.5"
                className="transition-all duration-300"
                />
                
                {/* Ligne 2 */}
                <path
                d={createPath(data.datasets[1].data)}
                fill="none"
                stroke={data.datasets[1].color}
                strokeWidth="0.5"
                className="transition-all duration-300"
                />
                
                {/* Points ligne 1 */}
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
                
                {/* Points ligne 2 */}
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
            
            {/* Labels */}
            <div className="flex justify-between mt-4">
                {data.labels.map((label, i) => (
                <span key={i} className="text-xs text-gray-600 font-medium">{label}</span>
                ))}
            </div>
            
            {/* Légende */}
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

    // Graphique Pie
    const SimplePieChart = ({ data }) => {
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
            <PieChart className="mr-3 text-pink-600" size={24} />
            Répartition des Ventes
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
                    <p className="text-xs text-gray-600">Total</p>
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
                <p className="text-gray-600">Pack BASIC - Dashboard Professionnel avec 3 Types de Graphiques</p>
                </div>
                <div className="flex gap-3">
                <button className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-all duration-300 transform hover:scale-110">
                    <Settings size={20} />
                </button>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all duration-300">
                <div 
                className={`text-center ${isDragging ? 'scale-105' : ''} transition-transform duration-300`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                >
                <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                    <Upload size={48} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Importez vos données Excel
                </h3>
                <p className="text-gray-600 mb-6">
                    Glissez-déposez votre fichier .xlsx ou .xls ici
                </p>
                <label className="inline-block">
                    <input 
                    type="file" 
                    accept=".xlsx,.xls" 
                    onChange={handleFileInput}
                    className="hidden"
                    />
                    <span className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block">
                    Choisir un fichier
                    </span>
                </label>
                {excelData && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                    <Download size={16} />
                    {excelData.length} lignes importées
                    <button 
                        onClick={() => setExcelData(null)}
                        className="ml-2 p-1 hover:bg-green-200 rounded transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                    </div>
                )}
                </div>
            </div>
            )}

            {/* Cards statistiques - 4 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.cards.map((card, index) => (
                <StatCard 
                key={card.id}
                title={card.title}
                value={stats[index].value}
                growth={stats[index].growth}
                icon={card.icon}
                gradient={card.color}
                />
            ))}
            </div>

            {/* Sélecteur de graphique */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-center gap-4">
                <button
                onClick={() => setActiveChart('bar')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                    activeChart === 'bar' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                <BarChart3 size={20} />
                Graphique à Barres
                </button>
                <button
                onClick={() => setActiveChart('line')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                    activeChart === 'line' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                <LineChart size={20} />
                Graphique Linéaire
                </button>
                <button
                onClick={() => setActiveChart('pie')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                    activeChart === 'pie' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                <PieChart size={20} />
                Graphique Circulaire
                </button>
            </div>
            </div>

            {/* Graphiques */}
            {activeChart === 'bar' && <SimpleBarChart data={chartData} />}
            {activeChart === 'line' && <SimpleLineChart data={chartData} />}
            {activeChart === 'pie' && <SimplePieChart data={chartData.pieData} />}

            {/* Footer Info */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                <h3 className="text-lg font-bold mb-1">✨ Dashboard Complet & Personnalisable</h3>
                <p className="text-sm opacity-90">4 Cards + 3 Types de Graphiques • Adapté automatiquement à vos données Excel</p>
                </div>
                <div className="text-right">
                <p className="text-2xl font-bold">20€</p>
                <p className="text-sm opacity-90">Pack BASIC</p>
                </div>
            </div>
            </div>
        </div>

        {/* Instructions pour le développeur */}
        <div className="max-w-7xl mx-auto mt-8 bg-gray-800 text-white rounded-2xl p-6 shadow-xl">
            <h4 className="font-bold text-lg mb-3 flex items-center">
            <Settings className="mr-2" size={20} />
            Guide de Configuration Rapide
            </h4>
            <div className="text-sm space-y-2 opacity-90">
            <p>📊 <strong>Structure Excel:</strong> Colonnes "Mois", "Ventes", "Clients", "Commandes", "Conversion", "Categorie"</p>
            <p>🎨 <strong>4 Cards:</strong> Modifiez config.cards pour changer titres, icônes, couleurs</p>
            <p>📈 <strong>3 Graphiques:</strong> Bar (évolution), Line (tendances), Pie (répartition)</p>
            <p>🔧 <strong>Adapter calculs:</strong> Fonction calculateStats() ligne 54</p>
            <p>💡 <strong>Icônes disponibles:</strong> DollarSign, Users, ShoppingCart, Target, Activity, TrendingUp</p>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;