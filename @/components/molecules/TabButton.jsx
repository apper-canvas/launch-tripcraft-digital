import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TabButton = ({ tab, activeTab, onClick }) => {
    return (
        <Button
            onClick={() => onClick(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                    ? 'bg-white dark:bg-surface-600 text-primary shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
        >
            <ApperIcon name={tab.icon} size={16} />
            <span className="font-medium">{tab.label}</span>
        </Button>
    );
};

export default TabButton;