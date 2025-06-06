import React from 'react';

const Input = ({ value, onChange, placeholder, type = 'text', className, ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white ${className}`}
            {...props}
        />
    );
};

export default Input;