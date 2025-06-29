import React, { createContext, useContext, useReducer } from 'react'

const PostContext = createContext()

const initialState = {
  posts: [],
  categories: [],
  loading: false,
  error: null,
}

const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false, error: null }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false, error: null }
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      }
    default:
      return state
  }
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState)

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}