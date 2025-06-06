class TravelTimeService {
  constructor() {
    // Comprehensive global location coordinates database with English names
    this.locationCoordinates = {
      // Japan - Tokyo Area
      'Tokyo': [35.6762, 139.6503],
      'Shibuya': [35.6580, 139.7016],
      'Shibuya Hotel': [35.6580, 139.7016],
      'Shibuya Crossing': [35.6598, 139.7006],
      'Harajuku': [35.6702, 139.7026],
      'Shinjuku': [35.6896, 139.6917],
      'Akihabara': [35.7022, 139.7749],
      'Ginza': [35.6762, 139.7649],
      'Asakusa': [35.7148, 139.7967],
      'Senso-ji Temple': [35.7148, 139.7967],
      'Roppongi': [35.6627, 139.7320],
      'Ueno': [35.7131, 139.7770],
      'Tokyo Station': [35.6812, 139.7671],
      'Meiji Shrine': [35.6763, 139.6993],
      'Tsukiji': [35.6654, 139.7707],
      'Odaiba': [35.6269, 139.7849],
      'Ikebukuro': [35.7295, 139.7109],
      'Kamakura': [35.3197, 139.5500],
      'Sumida': [35.7100, 139.8107],
      'Tokyo Skytree': [35.7101, 139.8107],
      
      // Japan - Other Cities
      'Osaka': [34.6937, 135.5023],
      'Kyoto': [35.0116, 135.7681],
      'Hiroshima': [34.3853, 132.4553],
      'Nara': [34.6851, 135.8048],
      'Yokohama': [35.4437, 139.6380],
      'Kobe': [34.6901, 135.1956],
      'Fukuoka': [33.5904, 130.4017],
      'Sapporo': [43.0642, 141.3469],
      
      // France - Paris Area
      'Paris': [48.8566, 2.3522],
      'Eiffel Tower': [48.8584, 2.2945],
      'Champ de Mars': [48.8560, 2.2988],
      'Louvre Museum': [48.8606, 2.3376],
      '1st Arrondissement': [48.8606, 2.3376],
      'Notre-Dame': [48.8530, 2.3499],
      'Arc de Triomphe': [48.8738, 2.2950],
      'Sacré-Cœur': [48.8867, 2.3431],
      'Champs-Élysées': [48.8698, 2.3076],
      'Montmartre': [48.8867, 2.3431],
      'Latin Quarter': [48.8508, 2.3444],
      'Marais District': [48.8566, 2.3621],
      'Seine River': [48.8566, 2.3522],
      'Versailles': [48.8014, 2.1301],
      
      // France - Other Cities
      'Lyon': [45.7640, 4.8357],
      'Marseille': [43.2965, 5.3698],
      'Nice': [43.7102, 7.2620],
      'Bordeaux': [44.8378, -0.5792],
      'Strasbourg': [48.5734, 7.7521],
      'Lille': [50.6292, 3.0573],
      'Toulouse': [43.6047, 1.4442],
      'Nantes': [47.2184, -1.5536],
      
      // United States - New York Area
      'New York': [40.7128, -74.0060],
      'New York City': [40.7128, -74.0060],
      'Manhattan': [40.7831, -73.9712],
      'Times Square': [40.7580, -73.9855],
      'Central Park': [40.7829, -73.9654],
      'Statue of Liberty': [40.6892, -74.0445],
      'Liberty Island': [40.6892, -74.0445],
      'Brooklyn Bridge': [40.7061, -73.9969],
      'Empire State Building': [40.7484, -73.9857],
      'One World Trade Center': [40.7127, -74.0134],
      'High Line': [40.7480, -74.0048],
      '9/11 Memorial': [40.7115, -74.0134],
      'Rockefeller Center': [40.7587, -73.9787],
      'Upper East Side': [40.7736, -73.9566],
      'Brooklyn': [40.6782, -73.9442],
      'Queens': [40.7282, -73.7949],
      'Bronx': [40.8448, -73.8648],
      
      // United States - Other Major Cities
      'Los Angeles': [34.0522, -118.2437],
      'Hollywood': [34.0928, -118.3287],
      'Beverly Hills': [34.0736, -118.4004],
      'Santa Monica': [34.0195, -118.4912],
      'San Francisco': [37.7749, -122.4194],
      'Golden Gate Bridge': [37.8199, -122.4783],
      'Alcatraz Island': [37.8267, -122.4233],
      'Chicago': [41.8781, -87.6298],
      'Las Vegas': [36.1699, -115.1398],
      'Miami': [25.7617, -80.1918],
      'Washington DC': [38.9072, -77.0369],
      'Boston': [42.3601, -71.0589],
      'Seattle': [47.6062, -122.3321],
      'Denver': [39.7392, -104.9903],
      'Nashville': [36.1627, -86.7816],
      'Austin': [30.2672, -97.7431],
      'Portland': [45.5152, -122.6784],
      
      // United Kingdom
      'London': [51.5074, -0.1278],
      'Big Ben': [51.4994, -0.1245],
      'Tower Bridge': [51.5055, -0.0754],
      'Buckingham Palace': [51.5014, -0.1419],
      'British Museum': [51.5194, -0.1270],
      'Edinburgh': [55.9533, -3.1883],
      'Manchester': [53.4808, -2.2426],
      'Liverpool': [53.4084, -2.9916],
      'Birmingham': [52.4862, -1.8904],
      'Glasgow': [55.8642, -4.2518],
      'Cardiff': [51.4816, -3.1791],
      'Bath': [51.3811, -2.3590],
      'Oxford': [51.7520, -1.2577],
      'Cambridge': [52.2053, 0.1218],
      
      // Germany
      'Berlin': [52.5200, 13.4050],
      'Munich': [48.1351, 11.5820],
      'Hamburg': [53.5511, 9.9937],
      'Cologne': [50.9375, 6.9603],
      'Frankfurt': [50.1109, 8.6821],
      'Stuttgart': [48.7758, 9.1829],
      'Düsseldorf': [51.2277, 6.7735],
      'Dortmund': [51.5136, 7.4653],
      'Dresden': [51.0504, 13.7373],
      'Heidelberg': [49.3988, 8.6724],
      
      // Italy
      'Rome': [41.9028, 12.4964],
      'Vatican City': [41.9029, 12.4534],
      'Colosseum': [41.8902, 12.4922],
      'Venice': [45.4408, 12.3155],
      'Florence': [43.7696, 11.2558],
      'Milan': [45.4642, 9.1900],
      'Naples': [40.8518, 14.2681],
      'Turin': [45.0703, 7.6869],
      'Bologna': [44.4949, 11.3426],
      'Pisa': [43.7228, 10.4017],
      'Amalfi Coast': [40.6340, 14.6026],
      'Cinque Terre': [44.1273, 9.7043],
      
      // Spain
      'Madrid': [40.4168, -3.7038],
      'Barcelona': [41.3851, 2.1734],
      'Seville': [37.3891, -5.9845],
      'Valencia': [39.4699, -0.3763],
      'Bilbao': [43.2627, -2.9253],
      'Granada': [37.1773, -3.5986],
      'Toledo': [39.8628, -4.0273],
      'Salamanca': [40.9701, -5.6635],
      'Santiago de Compostela': [42.8805, -8.5456],
      'Pamplona': [42.8169, -1.6432],
      
      // Netherlands
      'Amsterdam': [52.3676, 4.9041],
      'Rotterdam': [51.9244, 4.4777],
      'The Hague': [52.0705, 4.3007],
      'Utrecht': [52.0907, 5.1214],
      'Eindhoven': [51.4416, 5.4697],
      
      // Belgium
      'Brussels': [50.8503, 4.3517],
      'Antwerp': [51.2194, 4.4025],
      'Bruges': [51.2093, 3.2247],
      'Ghent': [51.0500, 3.7303],
      
      // Switzerland
      'Zurich': [47.3769, 8.5417],
      'Geneva': [46.2044, 6.1432],
      'Bern': [46.9481, 7.4474],
      'Basel': [47.5596, 7.5886],
      'Lucerne': [47.0502, 8.3093],
      'Interlaken': [46.6863, 7.8632],
      'Zermatt': [46.0207, 7.7491],
      
      // Austria
      'Vienna': [48.2082, 16.3738],
      'Salzburg': [47.8095, 13.0550],
      'Innsbruck': [47.2692, 11.4041],
      'Hallstatt': [47.5622, 13.6493],
      
      // Czech Republic
      'Prague': [50.0755, 14.4378],
      'Brno': [49.1951, 16.6068],
      'Český Krumlov': [48.8127, 14.3175],
      
      // Hungary
      'Budapest': [47.4979, 19.0402],
      'Debrecen': [47.5316, 21.6273],
      
      // Poland
      'Warsaw': [52.2297, 21.0122],
      'Krakow': [50.0647, 19.9450],
      'Gdansk': [54.3520, 18.6466],
      'Wroclaw': [51.1079, 17.0385],
      
      // Russia
      'Moscow': [55.7558, 37.6176],
      'St Petersburg': [59.9311, 30.3609],
      'Kazan': [55.8304, 49.0661],
      
      // Scandinavia
      'Stockholm': [59.3293, 18.0686],
      'Copenhagen': [55.6761, 12.5683],
      'Oslo': [59.9139, 10.7522],
      'Helsinki': [60.1699, 24.9384],
      'Bergen': [60.3913, 5.3221],
      'Gothenburg': [57.7089, 11.9746],
      
      // Iceland
      'Reykjavik': [64.1466, -21.9426],
      'Blue Lagoon': [63.8804, -22.4495],
      'Grindavik': [63.8424, -22.4348],
      'Akureyri': [65.6835, -18.1262],
      
      // Australia
      'Sydney': [-33.8688, 151.2093],
      'Melbourne': [-37.8136, 144.9631],
      'Brisbane': [-27.4698, 153.0251],
      'Perth': [-31.9505, 115.8605],
      'Adelaide': [-34.9285, 138.6007],
      'Canberra': [-35.2809, 149.1300],
      'Darwin': [-12.4634, 130.8456],
      'Hobart': [-42.8821, 147.3272],
      
      // New Zealand
      'Auckland': [-36.8485, 174.7633],
      'Wellington': [-41.2865, 174.7762],
      'Christchurch': [-43.5321, 172.6362],
      'Queenstown': [-45.0312, 168.6626],
      'Rotorua': [-38.1368, 176.2497],
      
      // Canada
      'Toronto': [43.6532, -79.3832],
      'Vancouver': [49.2827, -123.1207],
      'Montreal': [45.5017, -73.5673],
      'Calgary': [51.0447, -114.0719],
      'Ottawa': [45.4215, -75.6972],
      'Quebec City': [46.8139, -71.2080],
      'Halifax': [44.6488, -63.5752],
      'Winnipeg': [49.8951, -97.1384],
      
      // Mexico
      'Mexico City': [19.4326, -99.1332],
      'Cancun': [21.1619, -86.8515],
      'Guadalajara': [20.6597, -103.3496],
      'Tulum': [20.2114, -87.4654],
      'Puerto Vallarta': [20.6534, -105.2253],
      'Playa del Carmen': [20.6296, -87.0739],
      
      // Brazil
      'Rio de Janeiro': [-22.9068, -43.1729],
      'São Paulo': [-23.5558, -46.6396],
      'Salvador': [-12.9714, -38.5014],
      'Brasília': [-15.8267, -47.9218],
      'Recife': [-8.0476, -34.8770],
      'Fortaleza': [-3.7319, -38.5267],
      
      // Argentina
      'Buenos Aires': [-34.6118, -58.3960],
      'Mendoza': [-32.8895, -68.8458],
      'Córdoba': [-31.4201, -64.1888],
      'Bariloche': [-41.1335, -71.3103],
      
      // Chile
      'Santiago': [-33.4489, -70.6693],
      'Valparaíso': [-33.0472, -71.6127],
      'Antofagasta': [-23.6509, -70.3975],
      
      // Peru
      'Lima': [-12.0464, -77.0428],
      'Cusco': [-13.5319, -71.9675],
      'Arequipa': [-16.4090, -71.5375],
      'Machu Picchu': [-13.1631, -72.5450],
      
      // Colombia
      'Bogotá': [4.7110, -74.0721],
      'Medellín': [6.2442, -75.5812],
      'Cartagena': [10.3910, -75.4794],
      'Cali': [3.4516, -76.5320],
      
      // Ecuador
      'Quito': [-0.1807, -78.4678],
      'Guayaquil': [-2.1709, -79.9224],
      'Cuenca': [-2.9001, -79.0059],
      
      // Venezuela
      'Caracas': [10.4806, -66.9036],
      'Maracaibo': [10.6666, -71.6124],
      'Valencia': [10.1621, -68.0077],
      
      // Asia - China
      'Beijing': [39.9042, 116.4074],
      'Shanghai': [31.2304, 121.4737],
      'Guangzhou': [23.1291, 113.2644],
      'Shenzhen': [22.5431, 114.0579],
      'Chengdu': [30.5728, 104.0668],
      'Xi\'an': [34.3416, 108.9398],
      'Hangzhou': [30.2741, 120.1551],
      'Nanjing': [32.0603, 118.7969],
      
      // Asia - South Korea
      'Seoul': [37.5665, 126.9780],
      'Busan': [35.1796, 129.0756],
      'Incheon': [37.4563, 126.7052],
      'Daegu': [35.8714, 128.6014],
      'Jeju': [33.4996, 126.5312],
      
      // Asia - India
      'Mumbai': [19.0760, 72.8777],
      'Delhi': [28.7041, 77.1025],
      'Bangalore': [12.9716, 77.5946],
      'Kolkata': [22.5726, 88.3639],
      'Chennai': [13.0827, 80.2707],
      'Hyderabad': [17.3850, 78.4867],
      'Pune': [18.5204, 73.8567],
      'Ahmedabad': [23.0225, 72.5714],
      
      // Asia - Thailand
      'Bangkok': [13.7563, 100.5018],
      'Chiang Mai': [18.7883, 98.9853],
      'Phuket': [7.8804, 98.3923],
      'Pattaya': [12.9236, 100.8825],
      'Krabi': [8.0863, 98.9063],
      
      // Asia - Vietnam
      'Ho Chi Minh City': [10.8231, 106.6297],
      'Hanoi': [21.0285, 105.8542],
      'Da Nang': [16.0471, 108.2068],
      'Hue': [16.4637, 107.5909],
      'Hoi An': [15.8801, 108.3380],
      
      // Asia - Singapore & Malaysia
      'Singapore': [1.3521, 103.8198],
      'Kuala Lumpur': [3.1390, 101.6869],
      'Penang': [5.4164, 100.3327],
      'Johor Bahru': [1.4927, 103.7414],
      
      // Asia - Indonesia
      'Jakarta': [-6.2088, 106.8456],
      'Bali': [-8.4095, 115.1889],
      'Ubud': [-8.5069, 115.2625],
      'Seminyak': [-8.6906, 115.1669],
      'Tegallalang': [-8.4333, 115.2833],
      'Yogyakarta': [-7.7956, 110.3695],
      'Bandung': [-6.9175, 107.6191],
      
      // Asia - Philippines
      'Manila': [14.5995, 120.9842],
      'Cebu': [10.3157, 123.8854],
      'Davao': [7.1907, 125.4553],
      'Boracay': [11.9674, 121.9248],
      
      // Middle East
      'Dubai': [25.2048, 55.2708],
      'Abu Dhabi': [24.4539, 54.3773],
      'Doha': [25.2867, 51.5333],
      'Kuwait City': [29.3117, 47.4818],
      'Riyadh': [24.7136, 46.6753],
      'Tel Aviv': [32.0853, 34.7818],
      'Jerusalem': [31.7683, 35.2137],
      'Amman': [31.9454, 35.9284],
      'Beirut': [33.8938, 35.5018],
      'Istanbul': [41.0082, 28.9784],
      'Ankara': [39.9334, 32.8597],
      'Tehran': [35.6892, 51.3890],
      
      // Africa
      'Cairo': [30.0444, 31.2357],
      'Cape Town': [-33.9249, 18.4241],
      'Johannesburg': [-26.2041, 28.0473],
      'Lagos': [6.5244, 3.3792],
      'Nairobi': [-1.2921, 36.8219],
      'Casablanca': [33.5731, -7.5898],
      'Marrakech': [31.6295, -7.9811],
      'Tunis': [36.8065, 10.1815],
      'Algiers': [36.7538, 3.0588],
      'Addis Ababa': [9.1450, 38.7451],
      
      // Caribbean
      'Havana': [23.1136, -82.3666],
      'Kingston': [18.0179, -76.8099],
      'Santo Domingo': [18.4861, -69.9312],
      'San Juan': [18.4655, -66.1057],
      'Bridgetown': [13.1939, -59.5432],
      'Nassau': [25.0443, -77.3504]
    }
    
    // Regional fallback coordinates for better accuracy
    this.regionalFallbacks = {
      'japan': [35.6762, 139.6503], // Tokyo
      'asia': [35.6762, 139.6503],
      'france': [48.8566, 2.3522], // Paris
      'europe': [48.8566, 2.3522],
      'usa': [40.7128, -74.0060], // New York
      'america': [40.7128, -74.0060],
      'uk': [51.5074, -0.1278], // London
      'united kingdom': [51.5074, -0.1278],
      'australia': [-33.8688, 151.2093], // Sydney
      'oceania': [-33.8688, 151.2093],
      'canada': [43.6532, -79.3832], // Toronto
      'brazil': [-22.9068, -43.1729], // Rio
      'south america': [-22.9068, -43.1729],
      'mexico': [19.4326, -99.1332], // Mexico City
      'china': [39.9042, 116.4074], // Beijing
      'india': [19.0760, 72.8777], // Mumbai
      'germany': [52.5200, 13.4050], // Berlin
      'italy': [41.9028, 12.4964], // Rome
      'spain': [40.4168, -3.7038], // Madrid
      'russia': [55.7558, 37.6176], // Moscow
      'iceland': [64.1466, -21.9426], // Reykjavik
      'default': [40.7128, -74.0060] // New York as ultimate fallback
    }
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300))
  }

  // Enhanced location matching with better fallback logic
  getCoordinates(location) {
    if (!location) return null
    
    const normalizedLocation = location.toLowerCase().trim()
    
    // Direct exact match
    for (const [key, coords] of Object.entries(this.locationCoordinates)) {
      if (key.toLowerCase() === normalizedLocation) {
        return coords
      }
    }
    
    // Partial match - location contains key or key contains location
    let bestMatch = null
    let bestMatchScore = 0
    
    for (const [key, coords] of Object.entries(this.locationCoordinates)) {
      const keyLower = key.toLowerCase()
      let score = 0
      
      if (keyLower.includes(normalizedLocation)) {
        score = normalizedLocation.length / keyLower.length
      } else if (normalizedLocation.includes(keyLower)) {
        score = keyLower.length / normalizedLocation.length
      }
      
      if (score > bestMatchScore) {
        bestMatchScore = score
        bestMatch = coords
      }
    }
    
    if (bestMatch) return bestMatch
    
    // Regional fallback matching
    for (const [region, coords] of Object.entries(this.regionalFallbacks)) {
      if (normalizedLocation.includes(region) || region.includes(normalizedLocation)) {
        return coords
      }
    }
    
    // Ultimate fallback to New York (more globally neutral than Tokyo)
    console.warn(`Location "${location}" not found, using default coordinates`)
    return this.regionalFallbacks.default
  }

  // Validate if coordinates seem reasonable
  validateCoordinates(coords) {
    if (!coords || coords.length !== 2) return false
    const [lat, lng] = coords
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
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

  // Get travel time between two locations with enhanced error handling
  async getTravelTime(fromLocation, toLocation, mode = 'walking') {
    await this.delay()
    
    try {
      const fromCoords = this.getCoordinates(fromLocation)
      const toCoords = this.getCoordinates(toLocation)
      
      if (!this.validateCoordinates(fromCoords) || !this.validateCoordinates(toCoords)) {
        return { 
          error: 'Invalid coordinates', 
          travelTime: 15,
          fromCoords: fromCoords || [0, 0],
          toCoords: toCoords || [0, 0]
        }
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
        toCoords,
        fromLocation,
        toLocation
      }
    } catch (error) {
      console.error('Error calculating travel time:', error)
      return { 
        error: error.message, 
        travelTime: 15,
        fromCoords: [0, 0],
        toCoords: [0, 0]
      }
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

  // Get all coordinates for activities with validation
  getActivityCoordinates(activities) {
    return activities.map(activity => {
      const coordinates = this.getCoordinates(activity.location)
      return {
        ...activity,
        coordinates: this.validateCoordinates(coordinates) ? coordinates : null
      }
    }).filter(activity => activity.coordinates)
  }

  // Get location suggestions for partial matches
  getLocationSuggestions(partialLocation, limit = 5) {
    if (!partialLocation || partialLocation.length < 2) return []
    
    const normalized = partialLocation.toLowerCase().trim()
    const suggestions = []
    
    for (const [key] of Object.entries(this.locationCoordinates)) {
      if (key.toLowerCase().includes(normalized)) {
        suggestions.push(key)
      }
    }
    
    return suggestions.slice(0, limit)
  }

  // Check if a location exists in the database
  hasLocation(location) {
    return this.getCoordinates(location) !== null
  }
}

export default new TravelTimeService()