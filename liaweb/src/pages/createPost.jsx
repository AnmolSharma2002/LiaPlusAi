// src/pages/CreatePost.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/postForm'
import { blogService } from '../services/blog'

const CreatePost = () => {
  const navigate = useNavigate()

  const handleCreatePost = async (postData) => {
    await blogService.createPost(postData)
    navigate('/admin')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleCreatePost} buttonText="Create Post" />
    </div>
  )
}

export default CreatePost