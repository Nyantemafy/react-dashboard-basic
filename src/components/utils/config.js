import { DollarSign, Users, ShoppingCart, Target, Activity, TrendingUp } from 'lucide-react';

export const defaultConfig = {
    title: "Dashboard de Gestion de Projets",
    theme: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899"
    },
    cards: [
        { id: 1, title: "Projets Actifs", icon: "Activity", color: "from-blue-500 to-cyan-500", dataKey: "Active" },
        { id: 2, title: "Budget Total", icon: "DollarSign", color: "from-purple-500 to-pink-500", dataKey: "Budget" },
        { id: 3, title: "Dépenses Totales", icon: "ShoppingCart", color: "from-green-500 to-emerald-500", dataKey: "Spent" },
        { id: 4, title: "Progression Moyenne", icon: "Target", color: "from-orange-500 to-red-500", dataKey: "Progress", suffix: "%" }
    ],
    charts: {
        bar: true,
        line: true,
        pie: true
    }
};

export const iconMap = {
    DollarSign,
    Users,
    ShoppingCart,
    Target,
    Activity,
    TrendingUp
};