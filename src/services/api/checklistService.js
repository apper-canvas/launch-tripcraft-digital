class ChecklistService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'checklist_item'
    this.allFields = ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'trip_id', 'item', 'category', 'checked']
    this.updateableFields = ['Name', 'Tags', 'Owner', 'trip_id', 'item', 'category', 'checked']
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      return response?.data || []
    } catch (error) {
      console.error('Error fetching checklist items:', error)
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
      console.error(`Error fetching checklist item with ID ${id}:`, error)
      throw error
    }
  }

  async create(itemData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {}
      this.updateableFields.forEach(field => {
        if (itemData.hasOwnProperty(field)) {
          filteredData[field] = itemData[field]
        }
      })

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data
      } else {
        throw new Error(response?.results?.[0]?.message || 'Failed to create checklist item')
      }
    } catch (error) {
      console.error('Error creating checklist item:', error)
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
        throw new Error(response?.results?.[0]?.message || 'Failed to update checklist item')
      }
    } catch (error) {
      console.error('Error updating checklist item:', error)
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
        throw new Error(response?.results?.[0]?.message || 'Failed to delete checklist item')
      }
    } catch (error) {
      console.error('Error deleting checklist item:', error)
      throw error
    }
  }
}

export default new ChecklistService()