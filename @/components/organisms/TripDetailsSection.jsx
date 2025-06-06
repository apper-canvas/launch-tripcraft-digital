import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import TabButton from '@/components/molecules/TabButton';
import TripOverview from '@/components/organisms/TripOverview';
import ItineraryManager from '@/components/organisms/ItineraryManager';
import BudgetManager from '@/components/organisms/BudgetManager';
import ChecklistManager from '@/components/organisms/ChecklistManager';
import { differenceInDays, parseISO } from 'date-fns';

const TripDetailsSection = ({
    selectedTrip,
    activeTab,
    setActiveTab,
    activities,
    expenses,
    checklistItems,
    setActivities,
    setExpenses,
    setChecklistItems,
    stats
}) => {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'Home' },
        { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
        { id: 'budget', label: 'Budget', icon: 'DollarSign' },
        { id: 'checklist', label: 'Checklist', icon: 'CheckSquare' }
    ];

    const tripDuration = selectedTrip ?
        differenceInDays(parseISO(selectedTrip.endDate), parseISO(selectedTrip.startDate)) + 1 : 0;

    const renderContent = () => {
        if (!selectedTrip) {
            return (
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-12 border border-surface-200 dark:border-surface-700 text-center">
                    <ApperIcon name="MapPin" className="w-16 h-16 mx-auto mb-4 text-surface-400" />
                    <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">
                        Select a Trip to Get Started
                    </h2>
                    <p className="text-surface-600 dark:text-surface-400">
                        Choose a trip from the sidebar to view and manage your itinerary
                    </p>
                </div>
            );
        }

        switch (activeTab) {
            case 'overview':
                return (
                    <TripOverview
                        tripDuration={tripDuration}
                        activitiesCount={stats.activitiesCount}
                        budgetSpent={stats.budgetSpent}
                        budgetRemaining={(selectedTrip?.budget || 0) - stats.budgetSpent}
                    />
                );
            case 'itinerary':
                return (
                    <ItineraryManager
                        selectedTrip={selectedTrip}
                        activities={activities}
                        setActivities={setActivities}
                        tripDuration={tripDuration}
                    />
                );
            case 'budget':
                return (
                    <BudgetManager
                        selectedTrip={selectedTrip}
                        expenses={expenses}
                        setExpenses={setExpenses}
                    />
                );
            case 'checklist':
                return (
                    <ChecklistManager
                        selectedTrip={selectedTrip}
                        checklistItems={checklistItems}
                        setChecklistItems={setChecklistItems}
                    />
                );
            default:
                return null;
        }
    };

    if (!selectedTrip) {
        return renderContent(); // Render "Select a Trip" message if no trip is selected
    }

    return (
        <div className="space-y-6">
            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-2">
                            {selectedTrip.name}
                        </h1>
                        <p className="text-surface-600 dark:text-surface-400 flex items-center">
                            <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                            {selectedTrip.destination}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{stats.checklistProgress}%</div>
                                <div className="text-surface-600 dark:text-surface-400">Packed</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-1 bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            activeTab={activeTab}
                            onClick={setActiveTab}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TripDetailsSection;