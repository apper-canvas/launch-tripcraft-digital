import React from 'react';
import StatCard from '@/components/molecules/StatCard';
// ApperIcon already imported by StatCard

const TripOverview = ({ tripDuration, activitiesCount, budgetSpent, budgetRemaining }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
                title="Trip Duration"
                value={tripDuration}
                unit="Days"
                icon="Calendar"
                iconColorClass="text-primary"
            />
            <StatCard
                title="Total Activities"
                value={activitiesCount}
                unit="Planned"
                icon="MapPin"
                iconColorClass="text-secondary"
            />
            <StatCard
                title="Budget Status"
                value={`$${budgetRemaining >= 0 ? budgetRemaining : Math.abs(budgetRemaining)}`}
                unit={budgetRemaining >= 0 ? 'Remaining' : 'Over Budget'}
                icon="DollarSign"
                iconColorClass="text-accent"
            />
        </div>
    );
};

export default TripOverview;