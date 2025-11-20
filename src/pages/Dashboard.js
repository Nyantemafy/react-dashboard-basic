import React from 'react';
import Card from '../components/Card';
import ChartBar from '../components/ChartBar';
import ChartLine from '../components/ChartLine';
import ChartPie from '../components/ChartPie';
import '../styles.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
        <h1>Pack BASIC — Exemple Dashboard</h1>
        <div className="cards-container">
            <Card title="Ventes Totales" value="1,200 €" />
            <Card title="Nouveaux Clients" value="150" />
        </div>
        <div className="charts-container">
            <ChartBar />
            <ChartLine />
            <ChartPie />
        </div>
        </div>
    );
};

export default Dashboard;
