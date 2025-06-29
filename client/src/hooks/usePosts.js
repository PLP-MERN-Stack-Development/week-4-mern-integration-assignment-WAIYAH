import { useEffect } from 'react'
import { usePostContext } from '../context/PostContext'
import { postsAPI, categoriesAPI } from '../services/api'

export const usePosts = () => {
  const { state, dispatch } = usePostContext()

  const fetchPosts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await postsAPI.getAll()
      dispatch({ type: 'SET_POSTS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll()
      dispatch({ type: 'SET_CATEGORIES', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const createPost = async (postData) => {
    try {
      const response = await postsAPI.create(postData)
      dispatch({ type: 'ADD_POST', payload: response.data })
      return response.data
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const updatePost = async (id, postData) => {
    try {
      const response = await postsAPI.update(id, postData)
      dispatch({ type: 'UPDATE_POST', payload: response.data })
      return response.data
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const deletePost = async (id) => {
    try {
      await postsAPI.delete(id)
      dispatch({ type: 'DELETE_POST', payload: id })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  return {
    ...state,
    fetchPosts,
    fetchCategories,
    createPost,
    updatePost,
    deletePost,
  }
}