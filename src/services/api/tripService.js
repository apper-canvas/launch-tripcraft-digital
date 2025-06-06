class TripService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'trip'
    this.allFields = ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'destination', 'start_date', 'end_date', 'cover_image', 'budget']
    this.updateableFields = ['Name', 'Tags', 'Owner', 'destination', 'start_date', 'end_date', 'cover_image', 'budget']
  }

  // Transform data to ensure consistency between database and legacy formats
  transformTripData(trip) {
    if (!trip) return null
    
    console.log('TripService: Transforming trip data:', trip)
    
    return {
      ...trip,
      // Ensure we have both formats for compatibility
      id: trip.id || trip.Id,
      name: trip.Name || trip.name,
      destination: trip.destination,
      startDate: trip.start_date || trip.startDate,
      endDate: trip.end_date || trip.endDate,
      start_date: trip.start_date || trip.startDate,
      end_date: trip.end_date || trip.endDate,
      coverImage: trip.cover_image || trip.coverImage,
      cover_image: trip.cover_image || trip.coverImage,
      budget: trip.budget
    }
  }

  async getAll() {
    try {
      console.log('TripService: Fetching all trips from database')
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      const trips = response?.data || []
      console.log('TripService: Raw trips data received:', trips)
      
      const transformedTrips = trips.map(trip => this.transformTripData(trip)).filter(Boolean)
      console.log('TripService: Transformed trips data:', transformedTrips)
      
      if (transformedTrips.length === 0) {
        console.warn('TripService: No trips found in database, this might indicate a data loading issue')
      }
      
      return transformedTrips
    } catch (error) {
      console.error('TripService: Error fetching trips:', error)
      console.error('TripService: Error details:', {
        message: error.message,
        stack: error.stack,
        tableName: this.tableName,
        fields: this.allFields
      })
      throw error
    }
  }

  async getById(id) {
    try {
      console.log(`TripService: Fetching trip with ID: ${id}`)
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      
      const trip = response?.data || null
      console.log('TripService: Raw trip data received:', trip)
      
      const transformedTrip = this.transformTripData(trip)
      console.log('TripService: Transformed trip data:', transformedTrip)
      
      return transformedTrip
    } catch (error) {
      console.error(`TripService: Error fetching trip with ID ${id}:`, error)
      throw error
    }
  }

  async create(tripData) {
    try {
      console.log('TripService: Creating trip with data:', tripData)
      
      // Filter to only include updateable fields and transform field names
      const filteredData = {}
      this.updateableFields.forEach(field => {
        if (tripData.hasOwnProperty(field)) {
          filteredData[field] = tripData[field]
        }
        // Handle legacy field names
        if (field === 'start_date' && tripData.hasOwnProperty('startDate')) {
          filteredData[field] = tripData.startDate
        }
        if (field === 'end_date' && tripData.hasOwnProperty('endDate')) {
          filteredData[field] = tripData.endDate
        }
        if (field === 'cover_image' && tripData.hasOwnProperty('coverImage')) {
          filteredData[field] = tripData.coverImage
        }
        if (field === 'Name' && tripData.hasOwnProperty('name')) {
          filteredData[field] = tripData.name
        }
      })

      console.log('TripService: Filtered data for creation:', filteredData)

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        const createdTrip = this.transformTripData(response.results[0].data)
        console.log('TripService: Trip created successfully:', createdTrip)
        return createdTrip
      } else {
        const errorMsg = response?.results?.[0]?.message || 'Failed to create trip'
        console.error('TripService: Trip creation failed:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (error) {
      console.error('TripService: Error creating trip:', error)
      throw error
    }
  }

  async update(id, updateData) {
    try {
      console.log(`TripService: Updating trip ${id} with data:`, updateData)
      
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id }
      this.updateableFields.forEach(field => {
        if (updateData.hasOwnProperty(field)) {
          filteredData[field] = updateData[field]
        }
        // Handle legacy field names
        if (field === 'start_date' && updateData.hasOwnProperty('startDate')) {
          filteredData[field] = updateData.startDate
        }
        if (field === 'end_date' && updateData.hasOwnProperty('endDate')) {
          filteredData[field] = updateData.endDate
        }
        if (field === 'cover_image' && updateData.hasOwnProperty('coverImage')) {
          filteredData[field] = updateData.coverImage
        }
        if (field === 'Name' && updateData.hasOwnProperty('name')) {
          filteredData[field] = updateData.name
        }
      })

      console.log('TripService: Filtered data for update:', filteredData)

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        const updatedTrip = this.transformTripData(response.results[0].data)
        console.log('TripService: Trip updated successfully:', updatedTrip)
        return updatedTrip
      } else {
        const errorMsg = response?.results?.[0]?.message || 'Failed to update trip'
        console.error('TripService: Trip update failed:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (error) {
      console.error('TripService: Error updating trip:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      console.log(`TripService: Deleting trip with ID: ${id}`)
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        console.log('TripService: Trip deleted successfully')
        return true
      } else {
        const errorMsg = response?.results?.[0]?.message || 'Failed to delete trip'
        console.error('TripService: Trip deletion failed:', errorMsg)
        throw new Error(errorMsg)
      }
    } catch (error) {
      console.error('TripService: Error deleting trip:', error)
      throw error
    }
  }
}

export default new TripService()