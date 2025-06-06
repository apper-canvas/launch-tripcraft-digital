import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DarkModeToggle = ({ darkMode, onToggle }) => {
    return (
        <Button
            onClick={onToggle}
            className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
        >
            <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
        </Button>
    );
};

export default DarkModeToggle;