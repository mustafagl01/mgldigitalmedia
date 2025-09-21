import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) return null

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">
            {user.user_metadata?.full_name || user.email}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <button
        onClick={handleSignOut}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Çıkış
      </button>
    </div>
  )
}

export default UserMenu
