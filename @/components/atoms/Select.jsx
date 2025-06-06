import React from 'react';

const Select = ({ value, onChange, options, className, ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white ${className}`}
            {...props}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;