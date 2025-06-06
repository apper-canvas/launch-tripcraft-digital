import React, { useState } from 'react';
import { toast } from 'react-toastify';
import activityService from '@/services/api/activityService';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ActivityItem from '@/components/molecules/ActivityItem';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon'; // Used for the "No activities planned" section icon

const ItineraryManager = ({ selectedTrip, activities, setActivities, tripDuration }) => {
    const [newActivity, setNewActivity] = useState({
        title: '',
        day: 1,
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        notes: '',
        cost: 0
    });

    const tripActivities = activities.filter(a => a.tripId === selectedTrip?.id) || [];

    const handleAddActivity = async () => {
        if (!newActivity.title.trim()) {
            toast.error("Please enter an activity title");
            return;
        }

        try {
            const activity = await activityService.create({
                ...newActivity,
                tripId: selectedTrip.id
            });
            setActivities(prev => [...prev, activity]);
            setNewActivity({
                title: '',
                day: 1,
                startTime: '09:00',
                endTime: '10:00',
                location: '',
                notes: '',
                cost: 0
            });
            toast.success("Activity added successfully!");
        } catch (error) {
            toast.error("Failed to add activity");
        }
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            await activityService.delete(activityId);
            setActivities(prev => prev.filter(a => a.id !== activityId));
            toast.success("Activity deleted!");
        } catch (error) {
            toast.error("Failed to delete activity");
        }
    };

    const dayOptions = Array.from({ length: tripDuration }, (_, i) => ({
        value: i + 1,
        label: `Day ${i + 1}`
    }));

    return (
        <div className="space-y-6">
            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add New Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <Input
                        type="text"
                        placeholder="Activity title"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Select
                        value={newActivity.day}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, day: parseInt(e.target.value) }))}
                        options={dayOptions}
                    />
                    <Input
                        type="time"
                        value={newActivity.startTime}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                    <Input
                        type="text"
                        placeholder="Location"
                        value={newActivity.location}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>
                <Button
                    onClick={handleAddActivity}
                    className="w-full md:w-auto px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                    Add Activity
                </Button>
            </div>

            {Array.from({ length: tripDuration }, (_, dayIndex) => {
                const dayNumber = dayIndex + 1;
                const dayActivities = tripActivities.filter(a => a.day === dayNumber);

                return (
                    <div key={dayNumber} className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
                        <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">
                            Day {dayNumber}
                        </h3>
                        {dayActivities.length > 0 ? (
                            <div className="space-y-3">
                                {dayActivities.map((activity) => (
                                    <ActivityItem key={activity.id} activity={activity} onDelete={handleDeleteActivity} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-surface-500 dark:text-surface-400 text-center py-8">
                                No activities planned for this day
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ItineraryManager;