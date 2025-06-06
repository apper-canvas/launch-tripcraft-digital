class ActivitySuggestionsService {
  constructor() {
    // Comprehensive activity suggestions database organized by destination
    this.suggestions = {
      'Tokyo': [
        {
          id: 'tokyo_1',
          title: 'Senso-ji Temple & Asakusa District',
          type: 'Cultural',
          description: 'Visit Tokyo\'s oldest Buddhist temple and explore traditional Asakusa with its historic shops and street food.',
          image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
          location: 'Senso-ji Temple',
          duration: '2-3 hours',
          price: 0,
          rating: 4.6,
          reviewCount: 12847,
          popularity: 95,
          tags: ['Temple', 'Historic', 'Culture', 'Free'],
          bookingUrl: 'https://example.com/sensoji',
          bestTime: 'Morning (8-10 AM)',
          tips: 'Visit early to avoid crowds. Try traditional snacks at Nakamise shopping street.'
        },
        {
          id: 'tokyo_2',
          title: 'Tokyo Skytree Observation Deck',
          type: 'Sightseeing',
          description: 'Experience breathtaking 360° views of Tokyo from the world\'s tallest tower at 634 meters.',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop',
          location: 'Tokyo Skytree',
          duration: '1.5-2 hours',
          price: 25,
          rating: 4.4,
          reviewCount: 8924,
          popularity: 90,
          tags: ['Views', 'Modern', 'Photography', 'Landmark'],
          bookingUrl: 'https://example.com/skytree',
          bestTime: 'Sunset (5-7 PM)',
          tips: 'Book fast-track tickets online. Best views on clear days.'
        },
        {
          id: 'tokyo_3',
          title: 'Tsukiji Outer Market Food Tour',
          type: 'Food Tours',
          description: 'Discover authentic Japanese flavors with a guided tour through Tokyo\'s famous fish market and food stalls.',
          image: 'https://images.unsplash.com/photo-1566738780863-f9608f88f3a9?w=400&h=300&fit=crop',
          location: 'Tsukiji',
          duration: '3-4 hours',
          price: 65,
          rating: 4.8,
          reviewCount: 3456,
          popularity: 85,
          tags: ['Food', 'Seafood', 'Local Experience', 'Guided Tour'],
          bookingUrl: 'https://example.com/tsukiji-tour',
          bestTime: 'Early Morning (6-9 AM)',
          tips: 'Come hungry! Tour includes 8-10 food tastings.'
        },
        {
          id: 'tokyo_4',
          title: 'Shibuya Crossing & Harajuku Culture Walk',
          type: 'Cultural',
          description: 'Experience Tokyo\'s pop culture heart with the famous scramble crossing and quirky Harajuku fashion district.',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
          location: 'Shibuya',
          duration: '2-3 hours',
          price: 0,
          rating: 4.3,
          reviewCount: 6789,
          popularity: 88,
          tags: ['Modern Culture', 'Shopping', 'Photography', 'Free'],
          bookingUrl: null,
          bestTime: 'Afternoon (2-5 PM)',
          tips: 'Visit Hachiko statue and explore Takeshita Street in Harajuku.'
        },
        {
          id: 'tokyo_5',
          title: 'Traditional Tea Ceremony Experience',
          type: 'Cultural',
          description: 'Learn the art of Japanese tea ceremony in a traditional setting with authentic matcha and wagashi sweets.',
          image: 'https://images.unsplash.com/photo-1544181024-358f993cbaec?w=400&h=300&fit=crop',
          location: 'Urasenke Foundation',
          duration: '1.5 hours',
          price: 45,
          rating: 4.9,
          reviewCount: 1234,
          popularity: 70,
          tags: ['Traditional', 'Cultural Workshop', 'Tea', 'Authentic'],
          bookingUrl: 'https://example.com/tea-ceremony',
          bestTime: 'Afternoon (2-4 PM)',
          tips: 'Wear comfortable clothes. Photography may be restricted.'
        },
        {
          id: 'tokyo_6',
          title: 'TeamLab Borderless Digital Art Museum',
          type: 'Entertainment',
          description: 'Immerse yourself in interactive digital art installations that respond to your movement and touch.',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
          location: 'Odaiba',
          duration: '3-4 hours',
          price: 32,
          rating: 4.7,
          reviewCount: 5678,
          popularity: 82,
          tags: ['Art', 'Technology', 'Interactive', 'Instagram-worthy'],
          bookingUrl: 'https://example.com/teamlab',
          bestTime: 'Evening (6-9 PM)',
          tips: 'Wear comfortable shoes and avoid white clothing for better photo effects.'
        }
      ],
      'Paris': [
        {
          id: 'paris_1',
          title: 'Louvre Museum Priority Access',
          type: 'Cultural',
          description: 'Skip the lines and explore the world\'s largest art museum, home to the Mona Lisa and Venus de Milo.',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
          location: 'Louvre Museum',
          duration: '3-4 hours',
          price: 22,
          rating: 4.5,
          reviewCount: 15234,
          popularity: 95,
          tags: ['Art', 'Museum', 'History', 'Must-see'],
          bookingUrl: 'https://example.com/louvre',
          bestTime: 'Morning (9-11 AM)',
          tips: 'Download the museum app for self-guided tours. Focus on specific wings to avoid overwhelming.'
        },
        {
          id: 'paris_2',
          title: 'Eiffel Tower Summit & Seine River Cruise',
          type: 'Sightseeing',
          description: 'Combine iconic tower views with a relaxing Seine cruise to see Paris from different perspectives.',
          image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
          location: 'Eiffel Tower',
          duration: '4-5 hours',
          price: 55,
          rating: 4.6,
          reviewCount: 9876,
          popularity: 92,
          tags: ['Landmark', 'Views', 'River Cruise', 'Romantic'],
          bookingUrl: 'https://example.com/eiffel-seine',
          bestTime: 'Late Afternoon (4-8 PM)',
          tips: 'Book elevator tickets in advance. Tower lights up every hour after sunset.'
        },
        {
          id: 'paris_3',
          title: 'Montmartre & Sacré-Cœur Walking Tour',
          type: 'Cultural',
          description: 'Explore the artistic heart of Paris with its winding streets, street artists, and stunning basilica views.',
          image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop',
          location: 'Montmartre',
          duration: '2.5-3 hours',
          price: 25,
          rating: 4.7,
          reviewCount: 4567,
          popularity: 85,
          tags: ['Walking Tour', 'Art', 'Historic', 'Views'],
          bookingUrl: 'https://example.com/montmartre-tour',
          bestTime: 'Morning (10 AM-1 PM)',
          tips: 'Wear comfortable walking shoes. Bring cash for street artists and cafés.'
        },
        {
          id: 'paris_4',
          title: 'French Cooking Class & Market Tour',
          type: 'Food Tours',
          description: 'Learn to cook classic French dishes after shopping for fresh ingredients at a local Parisian market.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          location: 'Le Marais',
          duration: '5-6 hours',
          price: 120,
          rating: 4.9,
          reviewCount: 2345,
          popularity: 78,
          tags: ['Cooking', 'Food', 'Market', 'Hands-on'],
          bookingUrl: 'https://example.com/cooking-class',
          bestTime: 'Morning (9 AM-3 PM)',
          tips: 'Includes lunch and recipes to take home. Vegetarian options available.'
        },
        {
          id: 'paris_5',
          title: 'Versailles Palace & Gardens Day Trip',
          type: 'Sightseeing',
          description: 'Visit the opulent palace of French royalty with its magnificent gardens and Hall of Mirrors.',
          image: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop',
          location: 'Versailles',
          duration: '6-8 hours',
          price: 65,
          rating: 4.4,
          reviewCount: 7890,
          popularity: 88,
          tags: ['Palace', 'History', 'Gardens', 'Day Trip'],
          bookingUrl: 'https://example.com/versailles',
          bestTime: 'Full Day (9 AM-5 PM)',
          tips: 'Take RER C train from Paris. Audio guide included. Best on sunny days for gardens.'
        },
        {
          id: 'paris_6',
          title: 'Evening Seine Dinner Cruise',
          type: 'Entertainment',
          description: 'Enjoy French cuisine while cruising past illuminated landmarks including Notre-Dame and the Louvre.',
          image: 'https://images.unsplash.com/photo-1544750503-6be2fb77d6b3?w=400&h=300&fit=crop',
          location: 'Seine River',
          duration: '2.5-3 hours',
          price: 85,
          rating: 4.3,
          reviewCount: 3456,
          popularity: 72,
          tags: ['Dinner', 'Cruise', 'Romantic', 'Evening'],
          bookingUrl: 'https://example.com/dinner-cruise',
          bestTime: 'Evening (7:30-10:30 PM)',
          tips: 'Dress code: smart casual. Window seats offer best views.'
        }
      ],
      'New York': [
        {
          id: 'ny_1',
          title: 'Statue of Liberty & Ellis Island Tour',
          type: 'Sightseeing',
          description: 'Visit America\'s most iconic symbol of freedom and explore the immigration museum at Ellis Island.',
          image: 'https://images.unsplash.com/photo-1508973021160-b316878d5495?w=400&h=300&fit=crop',
          location: 'Liberty Island',
          duration: '4-5 hours',
          price: 35,
          rating: 4.4,
          reviewCount: 12456,
          popularity: 90,
          tags: ['Landmark', 'History', 'Ferry', 'Museum'],
          bookingUrl: 'https://example.com/statue-liberty',
          bestTime: 'Morning (9 AM-2 PM)',
          tips: 'Book crown access well in advance. Security screening required.'
        },
        {
          id: 'ny_2',
          title: 'Central Park Horse-Drawn Carriage Ride',
          type: 'Entertainment',
          description: 'Experience NYC\'s green oasis in a romantic horse-drawn carriage with guided commentary.',
          image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop',
          location: 'Central Park',
          duration: '45 minutes',
          price: 65,
          rating: 4.2,
          reviewCount: 3789,
          popularity: 75,
          tags: ['Romantic', 'Park', 'Carriage', 'Scenic'],
          bookingUrl: 'https://example.com/carriage-ride',
          bestTime: 'Afternoon (2-5 PM)',
          tips: 'Rates are per carriage (1-4 people). Best in spring and fall.'
        },
        {
          id: 'ny_3',
          title: 'Broadway Show: The Lion King',
          type: 'Entertainment',
          description: 'Experience Disney\'s spectacular musical with stunning costumes and African-inspired music.',
          image: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=400&h=300&fit=crop',
          location: 'Minskoff Theatre',
          duration: '2.5 hours',
          price: 95,
          rating: 4.8,
          reviewCount: 8765,
          popularity: 85,
          tags: ['Musical', 'Broadway', 'Family', 'Entertainment'],
          bookingUrl: 'https://example.com/lion-king',
          bestTime: 'Evening (7:30 PM)',
          tips: 'Book well in advance. Orchestra seats offer best experience.'
        },
        {
          id: 'ny_4',
          title: '9/11 Memorial & Museum Experience',
          type: 'Cultural',
          description: 'Pay respects at the memorial pools and learn about September 11th through multimedia exhibits.',
          image: 'https://images.unsplash.com/photo-1539321908154-04927596160d?w=400&h=300&fit=crop',
          location: '9/11 Memorial',
          duration: '2-3 hours',
          price: 28,
          rating: 4.7,
          reviewCount: 9234,
          popularity: 88,
          tags: ['Memorial', 'History', 'Museum', 'Emotional'],
          bookingUrl: 'https://example.com/911-memorial',
          bestTime: 'Afternoon (1-4 PM)',
          tips: 'Allow extra time for security. Photography restricted in museum.'
        },
        {
          id: 'ny_5',
          title: 'Food Tour: Little Italy & Chinatown',
          type: 'Food Tours',
          description: 'Taste authentic Italian and Chinese cuisines while learning about NYC\'s immigrant communities.',
          image: 'https://images.unsplash.com/photo-1564305530302-bb7ad303741b?w=400&h=300&fit=crop',
          location: 'Little Italy',
          duration: '3-4 hours',
          price: 75,
          rating: 4.6,
          reviewCount: 4567,
          popularity: 80,
          tags: ['Food', 'Walking Tour', 'Cultural', 'Neighborhoods'],
          bookingUrl: 'https://example.com/food-tour-nyc',
          bestTime: 'Afternoon (1-5 PM)',
          tips: 'Come hungry! Includes 6-8 food stops and cultural stories.'
        },
        {
          id: 'ny_6',
          title: 'Top of the Rock Observation Deck',
          type: 'Sightseeing',
          description: 'Get unobstructed views of the Empire State Building and Manhattan skyline from Rockefeller Center.',
          image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop',
          location: 'Rockefeller Center',
          duration: '1-1.5 hours',
          price: 40,
          rating: 4.5,
          reviewCount: 6789,
          popularity: 82,
          tags: ['Views', 'Observation Deck', 'Photography', 'Skyline'],
          bookingUrl: 'https://example.com/top-of-rock',
          bestTime: 'Sunset (5-7 PM)',
          tips: 'Less crowded than Empire State Building. Great for Empire State photos.'
        }
      ],
      'London': [
        {
          id: 'london_1',
          title: 'Tower of London & Crown Jewels',
          type: 'Cultural',
          description: 'Explore 1000 years of royal history and see the dazzling Crown Jewels collection.',
          image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
          location: 'Tower of London',
          duration: '3-4 hours',
          price: 32,
          rating: 4.6,
          reviewCount: 11234,
          popularity: 92,
          tags: ['History', 'Royal', 'Crown Jewels', 'Castle'],
          bookingUrl: 'https://example.com/tower-london',
          bestTime: 'Morning (9-11 AM)',
          tips: 'Join a Yeoman Warder tour for entertaining historical stories.'
        },
        {
          id: 'london_2',
          title: 'Thames River Evening Cruise',
          type: 'Sightseeing',
          description: 'See London\'s illuminated landmarks from the water including Big Ben, London Eye, and Tower Bridge.',
          image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop',
          location: 'Thames River',
          duration: '1.5-2 hours',
          price: 28,
          rating: 4.4,
          reviewCount: 5678,
          popularity: 85,
          tags: ['River Cruise', 'Views', 'Evening', 'Landmarks'],
          bookingUrl: 'https://example.com/thames-cruise',
          bestTime: 'Evening (7-9 PM)',
          tips: 'Dress warmly even in summer. Upper deck offers best views.'
        },
        {
          id: 'london_3',
          title: 'Westminster Walking Tour',
          type: 'Cultural',
          description: 'Discover British political history around Westminster Abbey, Big Ben, and Parliament Square.',
          image: 'https://images.unsplash.com/photo-1529655683826-3c2b9026bc13?w=400&h=300&fit=crop',
          location: 'Westminster',
          duration: '2-3 hours',
          price: 20,
          rating: 4.5,
          reviewCount: 3456,
          popularity: 78,
          tags: ['Walking Tour', 'Politics', 'History', 'Architecture'],
          bookingUrl: 'https://example.com/westminster-tour',
          bestTime: 'Afternoon (2-5 PM)',
          tips: 'Combine with Westminster Abbey visit. Check Parliament schedule for tours.'
        },
        {
          id: 'london_4',
          title: 'British Museum Highlights Tour',
          type: 'Cultural',
          description: 'Explore world treasures including the Rosetta Stone and Egyptian mummies with expert guidance.',
          image: 'https://images.unsplash.com/photo-1564399555744-6ad0e2a45b76?w=400&h=300&fit=crop',
          location: 'British Museum',
          duration: '2.5-3 hours',
          price: 25,
          rating: 4.7,
          reviewCount: 7890,
          popularity: 88,
          tags: ['Museum', 'History', 'Artifacts', 'Guided Tour'],
          bookingUrl: 'https://example.com/british-museum',
          bestTime: 'Morning (10 AM-1 PM)',
          tips: 'Museum entry is free, but guided tours provide valuable context.'
        },
        {
          id: 'london_5',
          title: 'Traditional Afternoon Tea Experience',
          type: 'Food Tours',
          description: 'Enjoy quintessentially British afternoon tea with finger sandwiches, scones, and fine teas.',
          image: 'https://images.unsplash.com/photo-1571167530149-c4df4d4b3f81?w=400&h=300&fit=crop',
          location: 'Fortnum & Mason',
          duration: '1.5-2 hours',
          price: 65,
          rating: 4.8,
          reviewCount: 2345,
          popularity: 75,
          tags: ['Afternoon Tea', 'Traditional', 'Fine Dining', 'Cultural'],
          bookingUrl: 'https://example.com/afternoon-tea',
          bestTime: 'Afternoon (3-5 PM)',
          tips: 'Smart casual dress code. Book well in advance for premium venues.'
        },
        {
          id: 'london_6',
          title: 'Harry Potter Studio Tour',
          type: 'Entertainment',
          description: 'Step behind the scenes of the Harry Potter films and see authentic sets, costumes, and props.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          location: 'Warner Bros. Studio',
          duration: '4-5 hours',
          price: 55,
          rating: 4.9,
          reviewCount: 8765,
          popularity: 90,
          tags: ['Harry Potter', 'Studios', 'Family', 'Movie Sets'],
          bookingUrl: 'https://example.com/harry-potter-studio',
          bestTime: 'Full Day (Various times)',
          tips: 'Must book in advance. Allow extra time for transport from central London.'
        }
      ]
    }
    
    // Default suggestions for destinations not in our database
    this.defaultSuggestions = [
      {
        id: 'default_1',
        title: 'City Walking Tour',
        type: 'Cultural',
        description: 'Explore the main attractions and learn about local history with a guided walking tour.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        location: 'City Center',
        duration: '2-3 hours',
        price: 25,
        rating: 4.3,
        reviewCount: 1500,
        popularity: 80,
        tags: ['Walking Tour', 'History', 'Local Guide'],
        bookingUrl: null,
        bestTime: 'Morning (10 AM-1 PM)',
        tips: 'Wear comfortable walking shoes and bring water.'
      },
      {
        id: 'default_2',
        title: 'Local Food Tour',
        type: 'Food Tours',
        description: 'Discover authentic local cuisine and traditional dishes with tastings at popular eateries.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        location: 'Various Locations',
        duration: '3-4 hours',
        price: 60,
        rating: 4.5,
        reviewCount: 890,
        popularity: 75,
        tags: ['Food', 'Local Cuisine', 'Tastings'],
        bookingUrl: null,
        bestTime: 'Afternoon (1-5 PM)',
        tips: 'Come hungry and let the guide know about any dietary restrictions.'
      },
      {
        id: 'default_3',
        title: 'Museum & Cultural Sites',
        type: 'Cultural',
        description: 'Visit the city\'s most important museums and cultural landmarks with skip-the-line access.',
        image: 'https://images.unsplash.com/photo-1554321586-92083ba0a115?w=400&h=300&fit=crop',
        location: 'Museum District',
        duration: '4-5 hours',
        price: 35,
        rating: 4.4,
        reviewCount: 2100,
        popularity: 85,
        tags: ['Museums', 'Culture', 'Art', 'History'],
        bookingUrl: null,
        bestTime: 'Full Day (9 AM-2 PM)',
        tips: 'Check museum schedules and book tickets in advance.'
      }
    ]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400))
  }

  // Get activity suggestions for a specific destination
  async getSuggestionsByDestination(destination, filters = {}) {
    await this.delay()
    
    if (!destination) {
      return []
    }

    // Find suggestions for the destination
    let suggestions = this.suggestions[destination] || this.defaultSuggestions
    
    // Apply filters
    if (filters.type && filters.type !== 'All') {
      suggestions = suggestions.filter(s => s.type === filters.type)
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      suggestions = suggestions.filter(s => s.price >= min && s.price <= max)
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      suggestions = suggestions.filter(s => 
        s.title.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }
    
    // Sort by popularity and rating
    suggestions = suggestions.sort((a, b) => {
      const scoreA = (a.popularity * 0.7) + (a.rating * 20 * 0.3)
      const scoreB = (b.popularity * 0.7) + (b.rating * 20 * 0.3)
      return scoreB - scoreA
    })
    
    return suggestions
  }

  // Get all available activity types
  getActivityTypes() {
    const types = new Set()
    Object.values(this.suggestions).forEach(destSuggestions => {
      destSuggestions.forEach(suggestion => {
        types.add(suggestion.type)
      })
    })
    return ['All', ...Array.from(types).sort()]
  }

  // Get popular destinations that have suggestions
  getAvailableDestinations() {
    return Object.keys(this.suggestions)
  }

  // Get a single suggestion by ID
  async getSuggestionById(id) {
    await this.delay()
    
    for (const destSuggestions of Object.values(this.suggestions)) {
      const suggestion = destSuggestions.find(s => s.id === id)
      if (suggestion) return suggestion
    }
    
    return this.defaultSuggestions.find(s => s.id === id) || null
  }

  // Convert suggestion to activity format for adding to itinerary
  convertToActivity(suggestion, tripId, day = 1, startTime = '09:00') {
    return {
      tripId,
      title: suggestion.title,
      day,
      startTime,
      endTime: this.calculateEndTime(startTime, suggestion.duration),
      location: suggestion.location,
      notes: suggestion.description,
      cost: suggestion.price,
      category: suggestion.type,
      suggestedActivity: true,
      originalSuggestionId: suggestion.id
    }
  }

  // Calculate end time based on start time and duration
  calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0, 0)
    
    // Parse duration (e.g., "2-3 hours", "45 minutes")
    let durationMinutes = 120 // default 2 hours
    
    if (duration.includes('hour')) {
      const hourMatch = duration.match(/(\d+)/)
      if (hourMatch) {
        durationMinutes = parseInt(hourMatch[1]) * 60
      }
    } else if (duration.includes('minute')) {
      const minuteMatch = duration.match(/(\d+)/)
      if (minuteMatch) {
        durationMinutes = parseInt(minuteMatch[1])
      }
    }
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000)
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`
  }

  // Get trending suggestions across all destinations
  async getTrendingSuggestions(limit = 6) {
    await this.delay()
    
    const allSuggestions = []
    Object.values(this.suggestions).forEach(destSuggestions => {
      allSuggestions.push(...destSuggestions)
    })
    
    return allSuggestions
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
  }

  // Get suggestions by type across all destinations
  async getSuggestionsByType(type, limit = 10) {
    await this.delay()
    
    const allSuggestions = []
    Object.values(this.suggestions).forEach(destSuggestions => {
      allSuggestions.push(...destSuggestions.filter(s => s.type === type))
    })
    
    return allSuggestions
      .sort((a, b) => (b.rating * b.popularity) - (a.rating * a.popularity))
      .slice(0, limit)
  }
}

export default new ActivitySuggestionsService()