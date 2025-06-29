import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import PostForm from '../components/PostForm'

const CreatePost = () => {
  const navigate = useNavigate()
  const { createPost } = usePosts()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      await createPost(formData)
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      {error && <div className="error">Error: {error}</div>}
      {loading ? (
        <div className="loading">Creating post...</div>
      ) : (
        <PostForm onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default CreatePost