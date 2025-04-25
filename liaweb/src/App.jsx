
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import BlogPost from './pages/blogPost'
import AdminDashboard from './pages/adminDashboard'
import CreatePost from './pages/createPost'
import EditPost from './pages/editPost'
import Navbar from './components/navbar'

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext)
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />
  }
  
  return children
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container mx-auto mt-4 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Protected admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/create" 
            element={
              <ProtectedRoute adminOnly={true}>
                <CreatePost />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit/:id" 
            element={
              <ProtectedRoute adminOnly={true}>
                <EditPost />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App