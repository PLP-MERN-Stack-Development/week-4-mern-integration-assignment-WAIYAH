import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { authAPI } from '../services/api'

export const useAuth = () => {
  const { state, dispatch } = useAuthContext()

  // Load user on app start if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await authAPI.getMe()
          dispatch({ type: 'LOAD_USER', payload: response.data.data })
        } catch (error) {
          dispatch({ type: 'AUTH_ERROR', payload: error.response?.data?.error || 'Authentication failed' })
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadUser()
  }, [state.token])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authAPI.login(credentials)
      const { data } = response.data
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data,
          token: data.token
        }
      })
      
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw new Error(errorMessage)
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authAPI.register(userData)
      const { data } = response.data
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data,
          token: data.token
        }
      })
      
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      dispatch({ type: 'LOAD_USER', payload: response.data.data })
      return response.data.data
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Profile update failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw new Error(errorMessage)
    }
  }

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  }
}