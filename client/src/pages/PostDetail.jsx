import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { postsAPI } from '../services/api'

const PostDetail = () => {
  const { id } = useParams()
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

  if (loading) return <div className="loading">Loading post...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!post) return <div className="error">Post not found</div>

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>Category: {post.category?.name || 'Uncategorized'}</span>
        <span> • Created: {new Date(post.createdAt).toLocaleDateString()}</span>
        <span> • Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
        <Link to={`/edit/${post._id}`} className="btn btn-primary">
          Edit Post
        </Link>
      </div>
    </div>
  )
}

export default PostDetail