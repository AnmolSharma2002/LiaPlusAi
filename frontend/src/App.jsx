import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogDetails from './pages/Blog/BlogDetails';
import MyBlogs from './pages/Blog/MyBlogs';
import Dashboard from './pages/Admin/Dashboard';
import ManageBlogs from './pages/Admin/ManageBlogs';
import ManageUsers from './pages/Admin/ManageUsers';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blogs/:id" element={<BlogDetails />} />
        
        {/* Protected Routes - Any authenticated user */}
        <Route element={<PrivateRoute />}>
          <Route path="my-blogs" element={<MyBlogs />} />
        </Route>
        
        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/manage-blogs" element={<ManageBlogs />} />
          <Route path="admin/manage-users" element={<ManageUsers />} />
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;