import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'
import travelTimeService from '../services/api/travelTimeService'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function InteractiveMap({ activities = [], tripId }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [travelTimes, setTravelTimes] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [mapCenter, setMapCenter] = useState([35.6762, 139.6503]) // Default to Tokyo
  const [mapZoom, setMapZoom] = useState(12)

  // Process activities with coordinates
  const activitiesWithCoords = useMemo(() => {
    if (!activities.length) return []
    
    const withCoords = travelTimeService.getActivityCoordinates(activities)
    
    // Calculate map center based on activities
    if (withCoords.length > 0) {
      const avgLat = withCoords.reduce((sum, act) => sum + act.coordinates[0], 0) / withCoords.length
      const avgLng = withCoords.reduce((sum, act) => sum + act.coordinates[1], 0) / withCoords.length
      setMapCenter([avgLat, avgLng])
      
      // Adjust zoom based on spread of activities
      const latRange = Math.max(...withCoords.map(a => a.coordinates[0])) - Math.min(...withCoords.map(a => a.coordinates[0]))
      const lngRange = Math.max(...withCoords.map(a => a.coordinates[1])) - Math.min(...withCoords.map(a => a.coordinates[1]))
      const maxRange = Math.max(latRange, lngRange)
      
      if (maxRange > 0.1) setMapZoom(10)
      else if (maxRange > 0.05) setMapZoom(12)
      else setMapZoom(14)
    }
    
    return withCoords
  }, [activities])

  // Sort activities by day and time for route calculation
  const sortedActivities = useMemo(() => {
    return [...activitiesWithCoords].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day
      return a.startTime.localeCompare(b.startTime)
    })
  }, [activitiesWithCoords])

  // Load travel times and route data
  useEffect(() => {
    const loadTravelData = async () => {
      if (!sortedActivities.length) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const times = await travelTimeService.getTravelTimesForRoute(sortedActivities)
        setTravelTimes(times)
      } catch (err) {
        console.error('Error loading travel data:', err)
        setError('Failed to calculate travel routes. Map will show activity locations only.')
      } finally {
        setLoading(false)
      }
    }

    loadTravelData()
  }, [sortedActivities])

  // Create custom marker icon for activities
  const createActivityIcon = (activity, isSelected = false) => {
    const iconSize = isSelected ? 35 : 30
    const iconHtml = `
      <div style="
        background-color: ${isSelected ? '#1d4ed8' : '#2563eb'};
        width: ${iconSize}px;
        height: ${iconSize}px;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: ${iconSize > 30 ? '14px' : '12px'};
      ">
        ${activity.day}
      </div>
    `
    
    return divIcon({
      html: iconHtml,
      className: 'custom-marker',
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize / 2]
    })
  }

  // Create route polylines
  const routePolylines = useMemo(() => {
    return travelTimes.map((travelInfo, index) => {
      if (!travelInfo.fromCoords || !travelInfo.toCoords) return null
      
      return {
        id: `route-${index}`,
        positions: [travelInfo.fromCoords, travelInfo.toCoords],
        color: '#2563eb',
        weight: 3,
        opacity: 0.8,
        travelTime: travelInfo.travelTime,
        distance: travelInfo.distance,
        from: travelInfo.from,
        to: travelInfo.to
      }
    }).filter(Boolean)
  }, [travelTimes])

  // Format time for display
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':')
    const hour12 = hours % 12 || 12
    const ampm = hours < 12 ? 'AM' : 'PM'
    return `${hour12}:${minutes} ${ampm}`
  }

  // Loading state
  if (loading && activitiesWithCoords.length > 0) {
    return (
      <div className="h-full flex items-center justify-center bg-surface-50 dark:bg-surface-800">
        <div className="text-center">
          <ApperIcon name="Loader2" className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p className="text-surface-600 dark:text-surface-400">Loading map and calculating routes...</p>
        </div>
      </div>
    )
  }

  // No activities state
  if (!activitiesWithCoords.length) {
    return (
      <div className="h-full flex items-center justify-center bg-surface-50 dark:bg-surface-800">
        <div className="text-center">
          <ApperIcon name="MapPin" className="w-12 h-12 mx-auto mb-4 text-surface-400" />
          <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-2">
            No Activities to Map
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            Add activities with locations to see them on the map
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* Error banner */}
      {error && (
        <div className="absolute top-4 left-4 right-4 z-[1000] bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <ApperIcon name="AlertTriangle" className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-lg p-3 border border-surface-200 dark:border-surface-700">
        <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
            <span className="text-surface-600 dark:text-surface-400">Activity location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-primary rounded"></div>
            <span className="text-surface-600 dark:text-surface-400">Travel route</span>
          </div>
        </div>
      </div>

      {/* Travel time info panel */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 right-4 z-[1000] bg-white/95 dark:bg-surface-800/95 backdrop-blur-sm rounded-lg p-4 border border-surface-200 dark:border-surface-700"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-surface-900 dark:text-white">{selectedActivity.title}</h4>
            <button
              onClick={() => setSelectedActivity(null)}
              className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
            >
              <ApperIcon name="X" size={16} />
            </button>
          </div>
          <div className="text-sm text-surface-600 dark:text-surface-400 space-y-1">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={14} />
              <span>Day {selectedActivity.day} • {formatTime(selectedActivity.startTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="MapPin" size={14} />
              <span>{selectedActivity.location}</span>
            </div>
            {selectedActivity.notes && (
              <div className="flex items-start space-x-2">
                <ApperIcon name="FileText" size={14} className="mt-0.5" />
                <span>{selectedActivity.notes}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Map container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Activity markers */}
        {activitiesWithCoords.map((activity) => (
          <Marker
            key={activity.id}
            position={activity.coordinates}
            icon={createActivityIcon(activity, selectedActivity?.id === activity.id)}
            eventHandlers={{
              click: () => setSelectedActivity(activity),
              mouseover: (e) => {
                e.target.openTooltip()
              }
            }}
          >
            <Tooltip permanent={false} direction="top" offset={[0, -10]}>
              <div className="text-xs">
                <div className="font-semibold">{activity.title}</div>
                <div>Day {activity.day} • {formatTime(activity.startTime)}</div>
              </div>
            </Tooltip>
            
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-surface-900 mb-2">{activity.title}</h3>
                <div className="text-sm text-surface-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Clock" size={14} />
                    <span>Day {activity.day} • {formatTime(activity.startTime)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="MapPin" size={14} />
                    <span>{activity.location}</span>
                  </div>
                  {activity.cost > 0 && (
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="DollarSign" size={14} />
                      <span>${activity.cost}</span>
                    </div>
                  )}
                  {activity.notes && (
                    <div className="mt-2 pt-2 border-t border-surface-200">
                      <p className="text-sm">{activity.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route polylines */}
        {routePolylines.map((route) => (
          <Polyline
            key={route.id}
            positions={route.positions}
            color={route.color}
            weight={route.weight}
            opacity={route.opacity}
          >
            <Tooltip sticky>
              <div className="text-xs">
                <div className="font-semibold">
                  {route.from.title} → {route.to.title}
                </div>
                <div>
                  🚶 {route.travelTime} min • {route.distance} km
                </div>
              </div>
            </Tooltip>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  )
}

export default InteractiveMap