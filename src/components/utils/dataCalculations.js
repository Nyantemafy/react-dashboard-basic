export const calculateStats = (excelData, config) => {
    if (!excelData || excelData.length === 0) {
        return [
            { value: "5", growth: "+2" },
            { value: "85,000 €", growth: "+15%" },
            { value: "43,500 €", growth: "+8%" },
            { value: "45.5", growth: "+5.2%" }
        ];
    }
    
    return config.cards.map(card => {
        const key = card.dataKey;
        
        switch(key) {
            case 'Active':
                const activeProjects = excelData.filter(project => 
                    project.Status === 'Active' || project.Status === 'En cours'
                ).length;
                const totalProjects = excelData.length;
                return {
                    value: `${activeProjects}`,
                    growth: `${totalProjects} au total`
                };
                
            case 'Budget':
                const totalBudget = excelData.reduce((sum, project) => 
                    sum + parseFloat(project.Budget || 0), 0
                );
                const avgBudget = totalBudget / excelData.length;
                return {
                    value: `${totalBudget.toLocaleString('fr-FR')} €`,
                    growth: `Moy: ${avgBudget.toLocaleString('fr-FR')} €`
                };
                
            case 'Spent':
                const totalSpent = excelData.reduce((sum, project) => 
                    sum + parseFloat(project.Spent || 0), 0
                );
                const budgetUtilization = (totalSpent / excelData.reduce((sum, p) => 
                    sum + parseFloat(p.Budget || 1), 0)) * 100;
                return {
                    value: `${totalSpent.toLocaleString('fr-FR')} €`,
                    growth: `${budgetUtilization.toFixed(1)}% utilisé`
                };
                
            case 'Progress':
                const totalProgress = excelData.reduce((sum, project) => 
                    sum + parseFloat(project.Progress || 0), 0
                );
                const avgProgress = totalProgress / excelData.length;
                return {
                    value: `${avgProgress.toFixed(1)}%`,
                    growth: `${excelData.filter(p => p.Progress == 100).length} terminés`
                };
                
            default:
                return { value: "0", growth: "0%" };
        }
    });
};

export const getChartData = (excelData) => {
    if (!excelData || excelData.length === 0) {
        return {
            labels: ['En cours', 'Terminé', 'Planifié', 'En attente'],
            datasets: [
                { label: 'Nombre de Projets', data: [3, 4, 3, 1], color: '#6366f1' },
                { label: 'Budget (k€)', data: [23, 22, 21, 30], color: '#8b5cf6' }
            ],
            pieData: [
                { label: 'High', value: 5, color: '#ef4444' },
                { label: 'Medium', value: 3, color: '#f59e0b' },
                { label: 'Low', value: 2, color: '#10b981' }
            ]
        };
    }

    const statusCount = {};
    const statusBudget = {};
    
    excelData.forEach(project => {
        const status = project.Status;
        statusCount[status] = (statusCount[status] || 0) + 1;
        statusBudget[status] = (statusBudget[status] || 0) + parseFloat(project.Budget || 0);
    });

    const labels = Object.keys(statusCount);
    const projectCounts = Object.values(statusCount);
    const budgets = Object.values(statusBudget).map(budget => budget / 1000);

    const priorityCount = {};
    excelData.forEach(project => {
        const priority = project.Priority || 'Medium';
        priorityCount[priority] = (priorityCount[priority] || 0) + 1;
    });

    const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6'];
    const pieData = Object.entries(priorityCount).map(([label, value], i) => ({
        label,
        value,
        color: colors[i % colors.length]
    }));

    return {
        labels,
        datasets: [
            { label: 'Nombre de Projets', data: projectCounts, color: '#6366f1' },
            { label: 'Budget (k€)', data: budgets, color: '#8b5cf6' }
        ],
        pieData: pieData.length > 0 ? pieData : [
            { label: 'High', value: 5, color: '#ef4444' },
            { label: 'Medium', value: 3, color: '#f59e0b' },
            { label: 'Low', value: 2, color: '#10b981' }
        ]
    };
};