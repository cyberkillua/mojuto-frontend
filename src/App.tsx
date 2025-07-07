import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from "@/pages/auth/login";
import SignUp from './pages/auth/signup';
import AuthLayout from './layouts/authLayout';
import Home from './pages/home';
import ForgotPassword from './pages/auth/forgot-password';
import SidebarLayout from './layouts/dashboard/sidebarLayout';
import DashboardHome from './pages/dashboard/dashboard-home';
import { AuthProvider } from './contexts/AuthContexts';
import ProtectedRoute from '@/components/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth routes - accessible only when not authenticated */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          {/* Redirect /dashboard to /dashboard/home */}
          <Route index element={<Navigate to="home" replace />} />
        </Route>

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App