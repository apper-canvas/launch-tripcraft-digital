import React from 'react';
import HeaderBrand from '@/components/molecules/HeaderBrand';
import HeaderStats from '@/components/molecules/HeaderStats';
import DarkModeToggle from '@/components/molecules/DarkModeToggle';

const AppHeader = ({ stats, darkMode, onDarkModeToggle }) => {
    return (
        <header className="bg-white/80 dark:bg-surface-800/80 glass border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <HeaderBrand />
                    <div className="flex items-center space-x-4">
                        {stats && <HeaderStats stats={stats} />}
                        <DarkModeToggle darkMode={darkMode} onToggle={onDarkModeToggle} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;