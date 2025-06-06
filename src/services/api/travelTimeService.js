class TravelTimeService {
  constructor() {
    // Mock coordinates for demo locations - in real app, would use geocoding service
    this.locationCoordinates = {
      'Tokyo': [35.6762, 139.6503],
      'Shibuya': [35.6580, 139.7016],
      'Harajuku': [35.6702, 139.7026],
      'Shinjuku': [35.6896, 139.6917],
      'Akihabara': [35.7022, 139.7749],
      'Ginza': [35.6762, 139.7649],
      'Asakusa': [35.7148, 139.7967],
      'Roppongi': [35.6627, 139.7320],
      'Ueno': [35.7131, 139.7770],
      'Tokyo Station': [35.6812, 139.7671],
      'Meiji Shrine': [35.6763, 139.6993],
      'Tsukiji': [35.6654, 139.7707],
      'Odaiba': [35.6269, 139.7849],
      'Ikebukuro': [35.7295, 139.7109],
      'Kamakura': [35.3197, 139.5500],
      // Paris locations
      'Paris': [48.8566, 2.3522],
      'Eiffel Tower': [48.8584, 2.2945],
      'Louvre Museum': [48.8606, 2.3376],
      'Notre-Dame': [48.8530, 2.3499],
      'Arc de Triomphe': [48.8738, 2.2950],
      'Sacré-Cœur': [48.8867, 2.3431],
      'Champs-Élysées': [48.8698, 2.3076],
      'Montmartre': [48.8867, 2.3431],
      'Latin Quarter': [48.8508, 2.3444],
      'Marais District': [48.8566, 2.3621],
      // New York locations
      'New York': [40.7128, -74.0060],
      'Times Square': [40.7580, -73.9855],
      'Central Park': [40.7829, -73.9654],
      'Statue of Liberty': [40.6892, -74.0445],
      'Brooklyn Bridge': [40.7061, -73.9969],
      'Empire State Building': [40.7484, -73.9857],
      'One World Trade Center': [40.7127, -74.0134],
      'High Line': [40.7480, -74.0048],
      '9/11 Memorial': [40.7115, -74.0134],
      'Rockefeller Center': [40.7587, -73.9787]
    }
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300))
  }

  // Get coordinates for a location (fuzzy matching)
  getCoordinates(location) {
    if (!location) return null
    
    const normalizedLocation = location.toLowerCase().trim()
    
    // Direct match
    for (const [key, coords] of Object.entries(this.locationCoordinates)) {
      if (key.toLowerCase() === normalizedLocation) {
        return coords
      }
    }
    
    // Partial match
    for (const [key, coords] of Object.entries(this.locationCoordinates)) {
      if (key.toLowerCase().includes(normalizedLocation) || 
          normalizedLocation.includes(key.toLowerCase())) {
        return coords
      }
    }
    
    // Default to center of Tokyo if no match found
    return [35.6762, 139.6503]
  }

  // Calculate distance between two coordinates using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c // Distance in kilometers
    return d
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // Estimate travel time based on distance and mode of transport
  estimateTravelTime(distance, mode = 'walking') {
    const speeds = {
      walking: 5, // km/h
      driving: 30, // km/h in city traffic
      transit: 20, // km/h average for public transport
      cycling: 15 // km/h
    }
    
    const speed = speeds[mode] || speeds.walking
    const timeInHours = distance / speed
    const timeInMinutes = Math.round(timeInHours * 60)
    
    return Math.max(timeInMinutes, 1) // Minimum 1 minute
  }

  // Get travel time between two locations
  async getTravelTime(fromLocation, toLocation, mode = 'walking') {
    await this.delay()
    
    try {
      const fromCoords = this.getCoordinates(fromLocation)
      const toCoords = this.getCoordinates(toLocation)
      
      if (!fromCoords || !toCoords) {
        return { error: 'Location not found', travelTime: 15 } // Default 15 minutes
      }
      
      const distance = this.calculateDistance(
        fromCoords[0], fromCoords[1],
        toCoords[0], toCoords[1]
      )
      
      const travelTime = this.estimateTravelTime(distance, mode)
      
      return {
        travelTime,
        distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
        mode,
        fromCoords,
        toCoords
      }
    } catch (error) {
      console.error('Error calculating travel time:', error)
      return { error: error.message, travelTime: 15 }
    }
  }

  // Get travel times for a sequence of activities
  async getTravelTimesForRoute(activities) {
    if (!activities || activities.length < 2) {
      return []
    }

    const sortedActivities = [...activities].sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day
      return a.startTime.localeCompare(b.startTime)
    })

    const travelTimes = []
    
    for (let i = 0; i < sortedActivities.length - 1; i++) {
      const current = sortedActivities[i]
      const next = sortedActivities[i + 1]
      
      const travelInfo = await this.getTravelTime(
        current.location, 
        next.location,
        'walking' // Default to walking
      )
      
      travelTimes.push({
        from: current,
        to: next,
        ...travelInfo
      })
    }
    
    return travelTimes
  }

  // Get all coordinates for activities
  getActivityCoordinates(activities) {
    return activities.map(activity => ({
      ...activity,
      coordinates: this.getCoordinates(activity.location)
    })).filter(activity => activity.coordinates)
  }
}

export default new TravelTimeService()