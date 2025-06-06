import checklistData from '../mockData/checklist.json'

class ChecklistService {
  constructor() {
    this.checklistItems = [...checklistData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.checklistItems]
  }

  async getById(id) {
    await this.delay()
    const item = this.checklistItems.find(c => c.id === id)
    return item ? { ...item } : null
  }

  async create(itemData) {
    await this.delay()
    const newItem = {
      ...itemData,
      id: Date.now().toString()
    }
    this.checklistItems.push(newItem)
    return { ...newItem }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.checklistItems.findIndex(c => c.id === id)
    if (index !== -1) {
      this.checklistItems[index] = { ...this.checklistItems[index], ...updateData }
      return { ...this.checklistItems[index] }
    }
    throw new Error('Checklist item not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.checklistItems.findIndex(c => c.id === id)
    if (index !== -1) {
      const deleted = this.checklistItems.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Checklist item not found')
  }
}

export default new ChecklistService()