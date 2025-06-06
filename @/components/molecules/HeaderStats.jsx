import React from 'react';

const HeaderStats = ({ stats }) => {
    return (
        <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.daysLeft}</div>
                <div className="text-surface-600 dark:text-surface-400">Days Left</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{stats.activitiesCount}</div>
                <div className="text-surface-600 dark:text-surface-400">Activities</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-accent">${stats.budgetSpent}</div>
                <div className="text-surface-600 dark:text-surface-400">Spent</div>
            </div>
        </div>
    );
};

export default HeaderStats;