import React from 'react';
import { format, parseISO } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ExpenseItem = ({ expense, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                        {expense.category}
                    </span>
                    <h4 className="font-medium text-surface-900 dark:text-white">{expense.description}</h4>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                    {format(parseISO(expense.date), 'MMM dd, yyyy')}
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-surface-900 dark:text-white">
                    ${expense.amount}
                </span>
                <Button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <ApperIcon name="Trash2" size={16} />
                </Button>
            </div>
        </div>
    );
};

export default ExpenseItem;