import tripData from '../mockData/trip.json'

class TripService {
  constructor() {
    this.trips = [...tripData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.trips]
  }

  async getById(id) {
    await this.delay()
    const trip = this.trips.find(t => t.id === id)
    return trip ? { ...trip } : null
  }

  async create(tripData) {
    await this.delay()
    const newTrip = {
      ...tripData,
      id: Date.now().toString()
    }
    this.trips.push(newTrip)
    return { ...newTrip }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.trips.findIndex(t => t.id === id)
    if (index !== -1) {
      this.trips[index] = { ...this.trips[index], ...updateData }
      return { ...this.trips[index] }
    }
    throw new Error('Trip not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.trips.findIndex(t => t.id === id)
    if (index !== -1) {
      const deleted = this.trips.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Trip not found')
  }
}

export default new TripService()