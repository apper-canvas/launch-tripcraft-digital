import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const TripCard = ({ trip, isSelected, onClick }) => {
    return (
        <motion.div
            layoutId={`trip-${trip.id}`}
            onClick={onClick}
            className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 border border-surface-200 dark:border-surface-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className="w-full h-24 rounded-lg bg-cover bg-center mb-3"
                style={{ backgroundImage: `url(${trip.coverImage})` }}
            >
                <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end p-2">
                    <span className="text-white text-sm font-medium">{trip.destination}</span>
                </div>
            </div>
            <h3 className="font-medium text-surface-900 dark:text-white mb-1">{trip.name}</h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">
                {format(parseISO(trip.startDate), 'MMM dd')} - {format(parseISO(trip.endDate), 'MMM dd, yyyy')}
            </p>
        </motion.div>
    );
};

export default TripCard;