import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ApperIcon name="MapPin" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-surface-900 dark:text-white mb-4">
            Destination Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            Looks like you've wandered off the beaten path. Let's get you back to planning your next adventure!
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors"
          >
            <ApperIcon name="Home" size={20} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound