import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const HeaderBrand = () => {
    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Map" className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-heading font-bold text-surface-900 dark:text-white">TripCraft</h1>
                <p className="text-sm text-surface-600 dark:text-surface-400">Plan Your Perfect Journey</p>
            </div>
        </div>
    );
};

export default HeaderBrand;