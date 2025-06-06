import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import tripService from '../services/api/tripService'
import activityService from '../services/api/activityService'
import expenseService from '../services/api/expenseService'
import checklistService from '../services/api/checklistService'
import { format, differenceInDays, parseISO } from 'date-fns'

function Home() {
  const [trips, setTrips] = useState([])
  const [activities, setActivities] = useState([])
  const [expenses, setExpenses] = useState([])
  const [checklistItems, setChecklistItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tripsData, activitiesData, expensesData, checklistData] = await Promise.all([
          tripService.getAll(),
          activityService.getAll(),
          expenseService.getAll(),
          checklistService.getAll()
        ])
        
        setTrips(tripsData || [])
        setActivities(activitiesData || [])
        setExpenses(expensesData || [])
        setChecklistItems(checklistData || [])
        
        if (tripsData?.length > 0) {
          setSelectedTrip(tripsData[0])
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load trip data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const getTripStats = (trip) => {
    if (!trip) return { daysLeft: 0, activitiesCount: 0, budgetSpent: 0, checklistProgress: 0 }
    
    const daysLeft = differenceInDays(parseISO(trip.startDate), new Date())
    const tripActivities = activities.filter(a => a.tripId === trip.id) || []
    const tripExpenses = expenses.filter(e => e.tripId === trip.id) || []
    const tripChecklist = checklistItems.filter(c => c.tripId === trip.id) || []
    
    const budgetSpent = tripExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    const checklistProgress = tripChecklist.length > 0 
      ? Math.round((tripChecklist.filter(item => item.checked).length / tripChecklist.length) * 100)
      : 0
    
    return {
      daysLeft: Math.max(0, daysLeft),
      activitiesCount: tripActivities.length,
      budgetSpent,
      checklistProgress
    }
  }

  const stats = selectedTrip ? getTripStats(selectedTrip) : { daysLeft: 0, activitiesCount: 0, budgetSpent: 0, checklistProgress: 0 }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'checklist', label: 'Checklist', icon: 'CheckSquare' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Loader2" className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-surface-600 dark:text-surface-400">Loading your trips...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen map-texture">
      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-800/80 glass border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Map" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-surface-900 dark:text-white">TripCraft</h1>
                <p className="text-sm text-surface-600 dark:text-surface-400">Plan Your Perfect Journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedTrip && (
                <div className="hidden md:flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.daysLeft}</div>
                    <div className="text-surface-600 dark:text-surface-400">Days Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{stats.activitiesCount}</div>
                    <div className="text-surface-600 dark:text-surface-400">Activities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">${stats.budgetSpent}</div>
                    <div className="text-surface-600 dark:text-surface-400">Spent</div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar - Trip Selection */}
          <div className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
              <h2 className="text-lg font-heading font-semibold mb-4 text-surface-900 dark:text-white">Your Trips</h2>
              <div className="space-y-3">
                {trips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    layoutId={`trip-${trip.id}`}
                    onClick={() => setSelectedTrip(trip)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      selectedTrip?.id === trip.id
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 border border-surface-200 dark:border-surface-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-full h-24 rounded-lg bg-cover bg-center mb-3"
                      style={{ backgroundImage: `url(${trip.coverImage})` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end p-2">
                        <span className="text-white text-sm font-medium">{trip.destination}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-surface-900 dark:text-white mb-1">{trip.name}</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      {format(parseISO(trip.startDate), 'MMM dd')} - {format(parseISO(trip.endDate), 'MMM dd, yyyy')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {selectedTrip ? (
              <div className="space-y-6">
                {/* Trip Header */}
                <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-6 border border-surface-200 dark:border-surface-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-2">
                        {selectedTrip.name}
                      </h1>
                      <p className="text-surface-600 dark:text-surface-400 flex items-center">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                        {selectedTrip.destination}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{stats.checklistProgress}%</div>
                          <div className="text-surface-600 dark:text-surface-400">Packed</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex space-x-1 bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all ${
                          activeTab === tab.id
                            ? 'bg-white dark:bg-surface-600 text-primary shadow-sm'
                            : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                        }`}
                      >
                        <ApperIcon name={tab.icon} size={16} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MainFeature 
                      activeTab={activeTab}
                      selectedTrip={selectedTrip}
                      activities={activities}
                      expenses={expenses}
                      checklistItems={checklistItems}
                      setActivities={setActivities}
                      setExpenses={setExpenses}
                      setChecklistItems={setChecklistItems}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white/80 dark:bg-surface-800/80 glass rounded-2xl p-12 border border-surface-200 dark:border-surface-700 text-center">
                <ApperIcon name="MapPin" className="w-16 h-16 mx-auto mb-4 text-surface-400" />
                <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">
                  Select a Trip to Get Started
                </h2>
                <p className="text-surface-600 dark:text-surface-400">
                  Choose a trip from the sidebar to view and manage your itinerary
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home