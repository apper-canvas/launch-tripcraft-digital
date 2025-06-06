import activityData from '../mockData/activity.json'

class ActivityService {
  constructor() {
    this.activities = [...activityData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.activities]
  }

  async getById(id) {
    await this.delay()
    const activity = this.activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  }

  async create(activityData) {
    await this.delay()
    const newActivity = {
      ...activityData,
      id: Date.now().toString()
    }
    this.activities.push(newActivity)
    return { ...newActivity }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.activities.findIndex(a => a.id === id)
    if (index !== -1) {
      this.activities[index] = { ...this.activities[index], ...updateData }
      return { ...this.activities[index] }
    }
    throw new Error('Activity not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.activities.findIndex(a => a.id === id)
    if (index !== -1) {
      const deleted = this.activities.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Activity not found')
  }
}

export default new ActivityService()