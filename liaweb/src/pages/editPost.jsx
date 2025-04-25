
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/postForm'
import { blogService } from '../services/blog'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await blogService.getPostById(id)
        setPost(data)
      } catch (err) {
        setError('Failed to fetch post')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleUpdatePost = async (postData) => {
    await blogService.updatePost(id, postData)
    navigate('/admin')
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  
  if (error) return (
    <div className="text-center mt-10 text-red-600">
      {error}
    </div>
  )
  
  if (!post) return <div className="text-center mt-10">Post not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm 
        initialData={post} 
        onSubmit={handleUpdatePost} 
        buttonText="Update Post" 
      />
    </div>
  )
}

export default EditPost