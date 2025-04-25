
import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <h2 className="blog-title">{post.title}</h2>
      <p className="blog-meta">
        {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
      </p>
      <p className="blog-excerpt">
        {post.content.substring(0, 150)}
        {post.content.length > 150 ? '...' : ''}
      </p>
      <Link 
        to={`/blog/${post._id}`} 
        className="read-more"
      >
        Read more
      </Link>
    </div>
  )
}

export default BlogCard