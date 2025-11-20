import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartLine = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
        {
            label: 'Utilisateurs',
            data: [30, 50, 20, 40],
            borderColor: '#1E90FF',
            backgroundColor: '#87CEFA',
        },
        ],
    };

    return <Line data={data} />;
};

export default ChartLine;
