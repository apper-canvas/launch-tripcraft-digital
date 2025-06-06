class ExpenseService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'expense'
    this.allFields = ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'trip_id', 'category', 'amount', 'description', 'date']
    this.updateableFields = ['Name', 'Tags', 'Owner', 'trip_id', 'category', 'amount', 'description', 'date']
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields
      }
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      return response?.data || []
    } catch (error) {
      console.error('Error fetching expenses:', error)
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
      console.error(`Error fetching expense with ID ${id}:`, error)
      throw error
    }
  }

  async create(expenseData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {}
      this.updateableFields.forEach(field => {
        if (expenseData.hasOwnProperty(field)) {
          filteredData[field] = expenseData[field]
        }
      })

      const params = {
        records: [filteredData]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data
      } else {
        throw new Error(response?.results?.[0]?.message || 'Failed to create expense')
      }
    } catch (error) {
      console.error('Error creating expense:', error)
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
        throw new Error(response?.results?.[0]?.message || 'Failed to update expense')
      }
    } catch (error) {
      console.error('Error updating expense:', error)
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
        throw new Error(response?.results?.[0]?.message || 'Failed to delete expense')
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
      throw error
    }
  }
}

export default new ExpenseService()