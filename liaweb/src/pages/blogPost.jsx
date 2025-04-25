
import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogService } from '../services/blog'
import { AuthContext } from '../context/authContext'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await blogService.getPostById(id)
        setPost(data)
      } catch (err) {
        setError('Failed to fetch blog post')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(id)
        navigate('/')
      } catch (err) {
        alert('Failed to delete post')
        console.error(err)
      }
    }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  
  if (error) return (
    <div className="text-center mt-10 text-red-600">
      {error}
    </div>
  )
  
  if (!post) return (
    <div className="text-center mt-10">
      Post not found
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="text-gray-600 mb-6">
        Published on {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
      </div>
      
      <div className="prose mb-6">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      
      {user?.role === 'admin' && (
        <div className="flex space-x-4 mt-8">
          <Link 
            to={`/admin/edit/${post._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
      
      <Link to="/" className="block mt-8 text-blue-500 hover:underline">
        ← Back to all posts
      </Link>
    </div>
  )
}

export default BlogPost;