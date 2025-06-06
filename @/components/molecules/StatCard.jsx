import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ title, value, unit, icon, iconColorClass }) => {
    return (
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-surface-900 dark:text-white">{title}</h3>
                <ApperIcon name={icon} className={`w-5 h-5 ${iconColorClass}`} />
            </div>
            <div className="text-3xl font-bold mb-2">{value}</div>
            <p className="text-surface-600 dark:text-surface-400">{unit}</p>
        </div>
    );
};

export default StatCard;