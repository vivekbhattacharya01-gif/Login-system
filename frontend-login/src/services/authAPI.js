//     authApi.js

// registerUser()
// loginUser()
// getCurrentUser()
import axios from 'axios'

const TOKEN_KEY = 'northstar_auth_token'
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

authClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function getAuthToken() {
  return window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token, remember = true) {
  clearAuthToken()
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.sessionStorage.removeItem(TOKEN_KEY)
}

function getErrorMessage(error, fallback) {
  if (error.response?.data?.message) return error.response.data.message
  if (error.response) return fallback
  if (error.code === 'ECONNABORTED') return 'The server took too long to respond. Please try again.'
  return 'Could not connect to the server. Check that the backend is running and try again.'
}

function toApiError(error, fallback) {
  const apiError = new Error(getErrorMessage(error, fallback))
  apiError.status = error.response?.status
  return apiError
}

function requireUser(user, operation) {
  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    throw new Error(`Unexpected ${operation} response. Expected a user object from the API.`)
  }
  return user
}

export async function registerUser({ name, email, password }) {
  try {
    const { data } = await authClient.post('/auth/register', { name, email, password })
    requireUser(data?.user, 'registration')
    return data
  } catch (error) {
    if (error.response || error.code) throw toApiError(error, 'Registration failed. Please try again.')
    throw error
  }
}

export async function loginUser({ email, password }) {
  try {
    const { data } = await authClient.post('/auth/login', { email, password })
    if (typeof data?.token !== 'string' || !data.token.trim()) {
      throw new Error('Unexpected login response. Expected a JWT token and user object from the API.')
    }
    return { token: data.token, user: requireUser(data.user, 'login') }
  } catch (error) {
    if (error.response || error.code) throw toApiError(error, 'Sign in failed. Please try again.')
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await authClient.get('/auth/me')
    return requireUser(data?.user, 'session verification')
  } catch (error) {
    if (error.response || error.code) throw toApiError(error, 'Could not verify your session.')
    throw error
  }
}