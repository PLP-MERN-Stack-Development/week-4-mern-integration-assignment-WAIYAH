import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user, updateProfile, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  })
  const [avatar, setAvatar] = useState(null)
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const profileData = { ...formData }
      if (avatar) {
        profileData.avatar = avatar
      }
      
      await updateProfile(profileData)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      // Error is handled by the auth hook
    }
  }

  if (!user) return <div className="loading">Loading...</div>

  return (
    <div className="form-container">
      <h2>Profile</h2>
      {error && <div className="error">Error: {error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            style={{ backgroundColor: '#f5f5f5' }}
          />
          <small>Email cannot be changed</small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile