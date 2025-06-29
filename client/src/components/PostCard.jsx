import { Link } from 'react-router-dom'

const PostCard = ({ post, onDelete, canEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id)
    }
  }

  return (
    <div className="post-card">
      {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="post-image"
        />
      )}
      
      <h3>{post.title}</h3>
      
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      
      <p>{post.content.substring(0, 150)}...</p>
      
      <div className="post-meta">
        <span>By: {post.author?.name || 'Unknown'}</span>
        <span> • Category: {post.category?.name || 'Uncategorized'}</span>
        <span> • {new Date(post.createdAt).toLocaleDateString()}</span>
        {post.viewCount > 0 && <span> • Views: {post.viewCount}</span>}
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="post-actions">
        <Link to={`/posts/${post._id}`} className="btn btn-primary">
          Read More
        </Link>
        {canEdit && (
          <Link to={`/edit/${post._id}`} className="btn btn-secondary">
            Edit
          </Link>
        )}
        {onDelete && (
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default PostCard