import { useState, useEffect } from 'react'
import { usePosts } from '../hooks/usePosts'

const PostForm = ({ post, onSubmit, isEditing = false }) => {
  const { categories } = usePosts()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    excerpt: '',
    tags: '',
    isPublished: false,
  })
  const [featuredImage, setFeaturedImage] = useState(null)

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category: post.category?._id || '',
        excerpt: post.excerpt || '',
        tags: post.tags ? post.tags.join(', ') : '',
        isPublished: post.isPublished || false,
      })
    }
  }, [post])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFeaturedImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = { ...formData }
    if (featuredImage) {
      submitData.featuredImage = featuredImage
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Brief description of the post..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with commas"
        />
      </div>

      <div className="form-group">
        <label htmlFor="featuredImage">Featured Image</label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Publish immediately
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  )
}

export default PostForm