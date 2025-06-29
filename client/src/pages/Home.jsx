import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import PostCard from '../components/PostCard'
import SearchAndFilter from '../components/SearchAndFilter'

const Home = () => {
  const { posts, loading, error, deletePost, categories, fetchPosts } = usePosts()
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useState({})

  const handleSearch = (search) => {
    const params = { ...searchParams, search, page: 1 }
    setSearchParams(params)
    fetchPosts(params)
  }

  const handleFilter = (category) => {
    const params = { ...searchParams, category, page: 1 }
    setSearchParams(params)
    fetchPosts(params)
  }

  const canDeletePost = (post) => {
    return user && (user._id === post.author._id || user.role === 'admin')
  }

  if (loading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div>
      <h1>Latest Blog Posts</h1>
      
      <SearchAndFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
      />
      
      {posts.length === 0 ? (
        <p>No posts available. Create your first post!</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={canDeletePost(post) ? deletePost : null}
              canEdit={user && user._id === post.author._id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home