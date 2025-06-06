import React from 'react';
import TripCard from '@/components/molecules/TripCard';

const TripList = ({ trips, selectedTrip, onSelectTrip }) => {
    return (
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
            <h2 className="text-lg font-heading font-semibold mb-4 text-surface-900 dark:text-white">Your Trips</h2>
            <div className="space-y-3">
                {trips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        isSelected={selectedTrip?.id === trip.id}
                        onClick={() => onSelectTrip(trip)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TripList;