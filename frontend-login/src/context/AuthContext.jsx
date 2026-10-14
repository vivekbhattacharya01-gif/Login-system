import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  clearAuthToken,
  getAuthToken,
  getCurrentUser,
  loginUser,
  registerUser,
  setAuthToken,
} from '../services/authAPI'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionError, setSessionError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function restoreSession() {
      const token = getAuthToken()
      if (!token) {
        if (isCurrent) setIsLoading(false)
        return
      }

      try {
        const currentUser = await getCurrentUser()
        if (isCurrent) setUser(currentUser)
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          clearAuthToken()
        } else if (isCurrent) {
          setSessionError('We could not verify your saved session. Please sign in again.')
        }
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    restoreSession()
    return () => {
      isCurrent = false
    }
  }, [])

  async function login(credentials) {
    const { token, user: authenticatedUser } = await loginUser(credentials)
    setAuthToken(token, credentials.remember)
    setSessionError('')
    setUser(authenticatedUser)
    return authenticatedUser
  }

  async function register(details) {
    return registerUser(details)
  }

  function logout() {
    clearAuthToken()
    setUser(null)
    setSessionError('')
  }

  const value = useMemo(
    () => ({ user, isLoading, sessionError, login, register, logout }),
    [user, isLoading, sessionError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Keep the provider and its context hook co-located for this small auth module.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}