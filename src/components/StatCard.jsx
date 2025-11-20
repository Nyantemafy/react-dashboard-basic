import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, growth, icon: iconName, gradient, iconMap }) => {
    const Icon = iconMap[iconName] || iconMap.DollarSign;
    
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

export default StatCard;