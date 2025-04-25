
import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import { blogService } from '../services/blog'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts()
        setPosts(data)
      } catch (err) {
        setError('Failed to fetch blog posts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div>
  
  if (error) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '40px', color: '#d32f2f' }}>
      {error}
    </div>
  )

  return (
    <div className="container posts-container">
      <h1 className="page-title">Latest Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p>No posts yet. Check back soon!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;