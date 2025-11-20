import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = () => {
    const data = {
        labels: ['Produit A', 'Produit B', 'Produit C'],
        datasets: [
        {
            label: 'Répartition',
            data: [40, 35, 25],
            backgroundColor: ['#1E90FF', '#00CED1', '#87CEFA'],
        },
        ],
    };

    return <Pie data={data} />;
};

export default ChartPie;
