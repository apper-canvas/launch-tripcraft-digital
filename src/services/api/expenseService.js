import expenseData from '../mockData/expense.json'

class ExpenseService {
  constructor() {
    this.expenses = [...expenseData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.expenses]
  }

  async getById(id) {
    await this.delay()
    const expense = this.expenses.find(e => e.id === id)
    return expense ? { ...expense } : null
  }

  async create(expenseData) {
    await this.delay()
    const newExpense = {
      ...expenseData,
      id: Date.now().toString()
    }
    this.expenses.push(newExpense)
    return { ...newExpense }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.expenses.findIndex(e => e.id === id)
    if (index !== -1) {
      this.expenses[index] = { ...this.expenses[index], ...updateData }
      return { ...this.expenses[index] }
    }
    throw new Error('Expense not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.expenses.findIndex(e => e.id === id)
    if (index !== -1) {
      const deleted = this.expenses.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Expense not found')
  }
}

export default new ExpenseService()