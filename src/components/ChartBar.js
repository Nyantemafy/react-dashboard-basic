import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBar = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
        {
            label: 'Ventes',
            data: [12, 19, 3, 5],
            backgroundColor: '#1E90FF',
        },
        ],
    };
    
    return <Bar data={data} />;
};

export default ChartBar;
