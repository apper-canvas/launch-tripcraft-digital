import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import activityService from '../services/api/activityService'
import expenseService from '../services/api/expenseService'
import checklistService from '../services/api/checklistService'
import { format, parseISO, differenceInDays } from 'date-fns'
import Chart from 'react-apexcharts'

function MainFeature({ 
  activeTab, 
  selectedTrip, 
  activities, 
  expenses, 
  checklistItems,
  setActivities,
  setExpenses,
  setChecklistItems
}) {
  const [newActivity, setNewActivity] = useState({
    title: '',
    day: 1,
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    notes: '',
    cost: 0
  })
  const [newExpense, setNewExpense] = useState({
    category: 'Food',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [newChecklistItem, setNewChecklistItem] = useState({
    item: '',
    category: 'Clothing'
  })

  const tripActivities = activities.filter(a => a.tripId === selectedTrip?.id) || []
  const tripExpenses = expenses.filter(e => e.tripId === selectedTrip?.id) || []
  const tripChecklist = checklistItems.filter(c => c.tripId === selectedTrip?.id) || []

  const tripDuration = selectedTrip ? 
    differenceInDays(parseISO(selectedTrip.endDate), parseISO(selectedTrip.startDate)) + 1 : 0

  const handleAddActivity = async () => {
    if (!newActivity.title.trim()) {
      toast.error("Please enter an activity title")
      return
    }

    try {
      const activity = await activityService.create({
        ...newActivity,
        tripId: selectedTrip.id
      })
      setActivities(prev => [...prev, activity])
      setNewActivity({
        title: '',
        day: 1,
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        notes: '',
        cost: 0
      })
      toast.success("Activity added successfully!")
    } catch (error) {
      toast.error("Failed to add activity")
    }
  }

  const handleAddExpense = async () => {
    if (!newExpense.description.trim() || newExpense.amount <= 0) {
      toast.error("Please enter valid expense details")
      return
    }

    try {
      const expense = await expenseService.create({
        ...newExpense,
        tripId: selectedTrip.id
      })
      setExpenses(prev => [...prev, expense])
      setNewExpense({
        category: 'Food',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
      toast.success("Expense added successfully!")
    } catch (error) {
      toast.error("Failed to add expense")
    }
  }

  const handleAddChecklistItem = async () => {
    if (!newChecklistItem.item.trim()) {
      toast.error("Please enter an item name")
      return
    }

    try {
      const item = await checklistService.create({
        ...newChecklistItem,
        tripId: selectedTrip.id,
        checked: false
      })
      setChecklistItems(prev => [...prev, item])
      setNewChecklistItem({
        item: '',
        category: 'Clothing'
      })
      toast.success("Item added to checklist!")
    } catch (error) {
      toast.error("Failed to add checklist item")
    }
  }

  const handleToggleChecklistItem = async (itemId, checked) => {
    try {
      const updatedItem = await checklistService.update(itemId, { checked })
      setChecklistItems(prev => prev.map(item => 
        item.id === itemId ? updatedItem : item
      ))
      toast.success(checked ? "Item checked!" : "Item unchecked!")
    } catch (error) {
      toast.error("Failed to update item")
    }
  }

  const handleDeleteActivity = async (activityId) => {
    try {
      await activityService.delete(activityId)
      setActivities(prev => prev.filter(a => a.id !== activityId))
      toast.success("Activity deleted!")
    } catch (error) {
      toast.error("Failed to delete activity")
    }
  }

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expenseService.delete(expenseId)
      setExpenses(prev => prev.filter(e => e.id !== expenseId))
      toast.success("Expense deleted!")
    } catch (error) {
      toast.error("Failed to delete expense")
    }
  }

  const getExpensesByCategory = () => {
    const categories = {}
    tripExpenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount
    })
    return categories
  }

  const budgetSpent = tripExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const budgetRemaining = (selectedTrip?.budget || 0) - budgetSpent
  const expenseCategories = getExpensesByCategory()

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white">Trip Duration</h3>
          <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
        </div>
        <div className="text-3xl font-bold text-primary mb-2">{tripDuration}</div>
        <p className="text-surface-600 dark:text-surface-400">Days</p>
      </div>

      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white">Total Activities</h3>
          <ApperIcon name="MapPin" className="w-5 h-5 text-secondary" />
        </div>
        <div className="text-3xl font-bold text-secondary mb-2">{tripActivities.length}</div>
        <p className="text-surface-600 dark:text-surface-400">Planned</p>
      </div>

      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white">Budget Status</h3>
          <ApperIcon name="DollarSign" className="w-5 h-5 text-accent" />
        </div>
        <div className="text-3xl font-bold text-accent mb-2">
          ${budgetRemaining >= 0 ? budgetRemaining : Math.abs(budgetRemaining)}
        </div>
        <p className="text-surface-600 dark:text-surface-400">
          {budgetRemaining >= 0 ? 'Remaining' : 'Over Budget'}
        </p>
      </div>
    </div>
  )

  const renderItinerary = () => (
    <div className="space-y-6">
      {/* Add Activity Form */}
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add New Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Activity title"
            value={newActivity.title}
            onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
          <select
            value={newActivity.day}
            onChange={(e) => setNewActivity(prev => ({ ...prev, day: parseInt(e.target.value) }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          >
            {Array.from({ length: tripDuration }, (_, i) => (
              <option key={i + 1} value={i + 1}>Day {i + 1}</option>
            ))}
          </select>
          <input
            type="time"
            value={newActivity.startTime}
            onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Location"
            value={newActivity.location}
            onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>
        <button
          onClick={handleAddActivity}
          className="w-full md:w-auto px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          Add Activity
        </button>
      </div>

      {/* Activities by Day */}
      {Array.from({ length: tripDuration }, (_, dayIndex) => {
        const dayNumber = dayIndex + 1
        const dayActivities = tripActivities.filter(a => a.day === dayNumber)
        
        return (
          <div key={dayNumber} className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
            <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">
              Day {dayNumber}
            </h3>
            {dayActivities.length > 0 ? (
              <div className="space-y-3">
                {dayActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    layout
                    className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-primary">{activity.startTime}</span>
                        <h4 className="font-medium text-surface-900 dark:text-white">{activity.title}</h4>
                      </div>
                      {activity.location && (
                        <p className="text-sm text-surface-600 dark:text-surface-400 flex items-center">
                          <ApperIcon name="MapPin" className="w-3 h-3 mr-1" />
                          {activity.location}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-surface-500 dark:text-surface-400 text-center py-8">
                No activities planned for this day
              </p>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderBudget = () => (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Total Budget</h3>
          <div className="text-2xl font-bold text-primary">${selectedTrip?.budget || 0}</div>
        </div>
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Spent</h3>
          <div className="text-2xl font-bold text-red-500">${budgetSpent}</div>
        </div>
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-2">Remaining</h3>
          <div className={`text-2xl font-bold ${budgetRemaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${budgetRemaining >= 0 ? budgetRemaining : Math.abs(budgetRemaining)}
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add Expense</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Activities">Activities</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="w-full md:w-auto px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          Add Expense
        </button>
      </div>

      {/* Expense Chart */}
      {Object.keys(expenseCategories).length > 0 && (
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Expenses by Category</h3>
          <Chart
            options={{
              chart: { type: 'donut' },
              labels: Object.keys(expenseCategories),
              colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
              legend: { show: true },
              plotOptions: {
                pie: {
                  donut: {
                    size: '70%'
                  }
                }
              }
            }}
            series={Object.values(expenseCategories)}
            type="donut"
            height={300}
          />
        </div>
      )}

      {/* Expense List */}
      <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
        <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Recent Expenses</h3>
        {tripExpenses.length > 0 ? (
          <div className="space-y-3">
            {tripExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                      {expense.category}
                    </span>
                    <h4 className="font-medium text-surface-900 dark:text-white">{expense.description}</h4>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {format(parseISO(expense.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-surface-900 dark:text-white">
                    ${expense.amount}
                  </span>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-surface-500 dark:text-surface-400 text-center py-8">
            No expenses recorded yet
          </p>
        )}
      </div>
    </div>
  )

  const renderChecklist = () => {
    const categories = ['Clothing', 'Documents', 'Electronics', 'Toiletries', 'Other']
    
    return (
      <div className="space-y-6">
        {/* Add Item Form */}
        <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">Add Checklist Item</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={newChecklistItem.item}
              onChange={(e) => setNewChecklistItem(prev => ({ ...prev, item: e.target.value }))}
              className="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            />
            <select
              value={newChecklistItem.category}
              onChange={(e) => setNewChecklistItem(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={handleAddChecklistItem}
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Checklist by Category */}
        {categories.map(category => {
          const categoryItems = tripChecklist.filter(item => item.category === category)
          
          if (categoryItems.length === 0) return null
          
          return (
            <div key={category} className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-6 border border-surface-200 dark:border-surface-700">
              <h3 className="font-heading font-semibold text-surface-900 dark:text-white mb-4">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center space-x-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                  >
                    <button
                      onClick={() => handleToggleChecklistItem(item.id, !item.checked)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.checked 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-surface-300 dark:border-surface-600'
                      }`}
                    >
                      {item.checked && <ApperIcon name="Check" size={12} />}
                    </button>
                    <span className={`flex-1 ${item.checked ? 'line-through text-surface-500' : 'text-surface-900 dark:text-white'}`}>
                      {item.item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}

        {tripChecklist.length === 0 && (
          <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-xl p-12 border border-surface-200 dark:border-surface-700 text-center">
            <ApperIcon name="CheckSquare" className="w-16 h-16 mx-auto mb-4 text-surface-400" />
            <h3 className="text-xl font-heading font-semibold text-surface-900 dark:text-white mb-2">
              No Items in Checklist
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Add items to keep track of what you need to pack
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'itinerary':
        return renderItinerary()
      case 'budget':
        return renderBudget()
      case 'checklist':
        return renderChecklist()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  )
}

export default MainFeature