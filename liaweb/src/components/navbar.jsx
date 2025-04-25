
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="brand">Blog App</Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <button 
                onClick={logout} 
                className="nav-link"
              >
                Logout
              </button>
              <span className="welcome-text">Welcome, {user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar