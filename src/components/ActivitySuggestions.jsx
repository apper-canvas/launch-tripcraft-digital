import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import activitySuggestionsService from '../services/api/activitySuggestionsService'

function ActivitySuggestions({ 
  selectedTrip, 
  onAddActivity, 
  onClose,
  nextAvailableDay = 1,
  nextAvailableTime = '09:00'
}) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    type: 'All',
    priceRange: [0, 200],
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [addingActivity, setAddingActivity] = useState(null)

  // Available activity types
  const activityTypes = useMemo(() => 
    activitySuggestionsService.getActivityTypes(), []
  )

  // Load suggestions when trip destination changes
  useEffect(() => {
    const loadSuggestions = async () => {
      if (!selectedTrip?.destination) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await activitySuggestionsService.getSuggestionsByDestination(
          selectedTrip.destination,
          filters
        )
        setSuggestions(data)
      } catch (err) {
        console.error('Error loading activity suggestions:', err)
        setError('Failed to load activity suggestions')
      } finally {
        setLoading(false)
      }
    }

    loadSuggestions()
  }, [selectedTrip?.destination, filters])

  // Handle adding activity to itinerary
  const handleAddActivity = async (suggestion) => {
    if (!onAddActivity) return
    
    setAddingActivity(suggestion.id)
    
    try {
      const activityData = activitySuggestionsService.convertToActivity(
        suggestion,
        selectedTrip.id,
        nextAvailableDay,
        nextAvailableTime
      )
      
      await onAddActivity(activityData)
      toast.success(`"${suggestion.title}" added to your itinerary!`)
    } catch (error) {
      console.error('Error adding activity:', error)
      toast.error('Failed to add activity to itinerary')
    } finally {
      setAddingActivity(null)
    }
  }

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: 'All',
      priceRange: [0, 200],
      search: ''
    })
  }

  // Format price display
  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `$${price}`
  }

  // Format rating display
  const formatRating = (rating) => {
    return rating.toFixed(1)
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
            Activity Suggestions
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          )}
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <ApperIcon name="Loader2" className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
            <p className="text-surface-600 dark:text-surface-400">Finding amazing activities...</p>
          </div>
        </div>
      </div>
    )
  }

  // No trip selected state
  if (!selectedTrip) {
    return (
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <div className="text-center py-8">
          <ApperIcon name="MapPin" className="w-12 h-12 mx-auto mb-4 text-surface-400" />
          <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-2">
            Select a Trip
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            Choose a trip to see activity suggestions for your destination
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
              Discover {selectedTrip.destination}
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              Popular attractions and activities for your trip
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                showFilters
                  ? 'bg-primary text-white border-primary'
                  : 'border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Activity Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Activity Type
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white text-sm"
                      >
                        {activityTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={filters.priceRange[1]}
                          onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                          className="flex-1"
                        />
                        <button
                          onClick={clearFilters}
                          className="text-xs text-primary hover:text-primary-dark font-medium"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertCircle" className="w-4 h-4 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {suggestions.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <ApperIcon name="Compass" className="w-12 h-12 mx-auto mb-4 text-surface-400" />
            <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
              No Activities Found
            </h4>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <motion.div
                key={suggestion.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 dark:bg-surface-800/90 text-xs font-medium text-surface-700 dark:text-surface-300 rounded-full">
                      {suggestion.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary/90 text-white text-xs font-bold rounded-full">
                      {formatPrice(suggestion.price)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h4 className="font-semibold text-surface-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                      {suggestion.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-surface-600 dark:text-surface-400">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Star" className="w-3 h-3 fill-current text-yellow-400" />
                        <span>{formatRating(suggestion.rating)}</span>
                        <span>({suggestion.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Clock" className="w-3 h-3" />
                        <span>{suggestion.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                    {suggestion.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {suggestion.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-xs text-surface-600 dark:text-surface-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {suggestion.tags.length > 3 && (
                      <span className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-xs text-surface-600 dark:text-surface-400 rounded">
                        +{suggestion.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-surface-500 dark:text-surface-400">
                      <ApperIcon name="MapPin" className="w-3 h-3" />
                      <span>{suggestion.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {suggestion.bookingUrl && (
                        <button
                          onClick={() => window.open(suggestion.bookingUrl, '_blank')}
                          className="px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
                        >
                          <ApperIcon name="ExternalLink" className="w-3 h-3 mr-1" />
                          Book
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleAddActivity(suggestion)}
                        disabled={addingActivity === suggestion.id}
                        className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {addingActivity === suggestion.id ? (
                          <>
                            <ApperIcon name="Loader2" className="w-3 h-3 mr-1 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ApperIcon name="Plus" className="w-3 h-3 mr-1" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Best Time & Tips */}
                  {suggestion.bestTime && (
                    <div className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700">
                      <div className="text-xs text-surface-500 dark:text-surface-400">
                        <span className="font-medium">Best time:</span> {suggestion.bestTime}
                      </div>
                      {suggestion.tips && (
                        <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          <span className="font-medium">Tip:</span> {suggestion.tips}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivitySuggestions