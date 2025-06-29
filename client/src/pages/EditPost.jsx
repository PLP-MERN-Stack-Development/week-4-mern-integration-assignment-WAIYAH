import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { postsAPI } from '../services/api'
import PostForm from '../components/PostForm'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updatePost } = usePosts()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getById(id)
        setPost(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      await updatePost(id, formData)
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading post...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!post) return <div className="error">Post not found</div>

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      {error && <div className="error">Error: {error}</div>}
      <PostForm post={post} onSubmit={handleSubmit} isEditing={true} />
    </div>
  )
}

export default EditPost