class ActivityService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'Activity1'
    this.allFields = ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'title', 'day', 'start_time', 'end_time', 'location', 'notes', 'cost', 'trip_id']
    this.updateableFields = ['Name', 'Tags', 'Owner', 'title', 'day', 'start_time', 'end_time', 'location', 'notes', 'cost', 'trip_id']
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      return response?.data || []
    } catch (error) {
      console.error('Error fetching activities:', error)
      throw error
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching activity with ID ${id}:`, error)
      throw error
    }
  }

  async create(activityData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {}
      this.updateableFields.forEach(field => {
        if (activityData.hasOwnProperty(field)) {
          filteredData[field] = activityData[field]
        }
      })

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data
      } else {
        throw new Error(response?.results?.[0]?.message || 'Failed to create activity')
      }
    } catch (error) {
      console.error('Error creating activity:', error)
      throw error
    }
  }

  async update(id, updateData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: id }
      this.updateableFields.forEach(field => {
        if (updateData.hasOwnProperty(field)) {
          filteredData[field] = updateData[field]
        }
      })

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data
      } else {
        throw new Error(response?.results?.[0]?.message || 'Failed to update activity')
      }
    } catch (error) {
      console.error('Error updating activity:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        return true
      } else {
        throw new Error(response?.results?.[0]?.message || 'Failed to delete activity')
      }
    } catch (error) {
      console.error('Error deleting activity:', error)
      throw error
    }
  }
}

export default new ActivityService()