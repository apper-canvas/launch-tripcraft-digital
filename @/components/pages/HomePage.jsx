import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import tripService from '@/services/api/tripService';
import activityService from '@/services/api/activityService';
import expenseService from '@/services/api/expenseService';
import checklistService from '@/services/api/checklistService';
import { differenceInDays, parseISO } from 'date-fns';

import AppHeader from '@/components/organisms/AppHeader';
import TripList from '@/components/organisms/TripList';
import TripDetailsSection from '@/components/organisms/TripDetailsSection';


function HomePage() {
    const [trips, setTrips] = useState([]);
    const [activities, setActivities] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [checklistItems, setChecklistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [tripsData, activitiesData, expensesData, checklistData] = await Promise.all([
                    tripService.getAll(),
                    activityService.getAll(),
                    expenseService.getAll(),
                    checklistService.getAll()
                ]);

                setTrips(tripsData || []);
                setActivities(activitiesData || []);
                setExpenses(expensesData || []);
                setChecklistItems(checklistData || []);

                if (tripsData?.length > 0) {
                    setSelectedTrip(tripsData[0]);
                }
            } catch (err) {
                setError(err.message);
                toast.error("Failed to load trip data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const getTripStats = (trip) => {
        if (!trip) return { daysLeft: 0, activitiesCount: 0, budgetSpent: 0, checklistProgress: 0 };

        const daysLeft = differenceInDays(parseISO(trip.startDate), new Date());
        const tripActivities = activities.filter(a => a.tripId === trip.id) || [];
        const tripExpenses = expenses.filter(e => e.tripId === trip.id) || [];
        const tripChecklist = checklistItems.filter(c => c.tripId === trip.id) || [];

        const budgetSpent = tripExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
        const checklistProgress = tripChecklist.length > 0
            ? Math.round((tripChecklist.filter(item => item.checked).length / tripChecklist.length) * 100)
            : 0;

        return {
            daysLeft: Math.max(0, daysLeft),
            activitiesCount: tripActivities.length,
            budgetSpent,
            checklistProgress
        };
    };

    const stats = selectedTrip ? getTripStats(selectedTrip) : { daysLeft: 0, activitiesCount: 0, budgetSpent: 0, checklistProgress: 0 };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ApperIcon name="Loader2" className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-surface-600 dark:text-surface-400">Loading your trips...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ApperIcon name="AlertCircle" className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen map-texture">
            <AppHeader stats={selectedTrip ? stats : null} darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-3 mb-8 lg:mb-0">
                        <TripList
                            trips={trips}
                            selectedTrip={selectedTrip}
                            onSelectTrip={setSelectedTrip}
                        />
                    </div>
                    <div className="lg:col-span-9">
                        <TripDetailsSection
                            selectedTrip={selectedTrip}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            activities={activities}
                            expenses={expenses}
                            checklistItems={checklistItems}
                            setActivities={setActivities}
                            setExpenses={setExpenses}
                            setChecklistItems={setChecklistItems}
                            stats={stats}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;