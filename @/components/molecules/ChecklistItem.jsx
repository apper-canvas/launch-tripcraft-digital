import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ChecklistItem = ({ item, onToggle }) => {
    return (
        <motion.div
            layout
            className="flex items-center space-x-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
        >
            <Button
                onClick={() => onToggle(item.id, !item.checked)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    item.checked
                        ? 'bg-primary border-primary text-white'
                        : 'border-surface-300 dark:border-surface-600'
                }`}
            >
                {item.checked && <ApperIcon name="Check" size={12} />}
            </Button>
            <span className={`flex-1 ${item.checked ? 'line-through text-surface-500' : 'text-surface-900 dark:text-white'}`}>
                {item.item}
            </span>
        </motion.div>
    );
};

export default ChecklistItem;