import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ActivityItem = ({ activity, onDelete }) => {
    return (
        <motion.div
            layout
            className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg"
        >
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-primary">{activity.startTime}</span>
                    <h4 className="font-medium text-surface-900 dark:text-white">{activity.title}</h4>
                </div>
                {activity.location && (
                    <p className="text-sm text-surface-600 dark:text-surface-400 flex items-center">
                        <ApperIcon name="MapPin" className="w-3 h-3 mr-1" />
                        {activity.location}
                    </p>
                )}
            </div>
            <Button
                onClick={() => onDelete(activity.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
                <ApperIcon name="Trash2" size={16} />
            </Button>
        </motion.div>
    );
};

export default ActivityItem;