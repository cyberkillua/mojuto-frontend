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
import Analytics from './pages/dashboard/uploads';
import Settings from './pages/dashboard/setting';
import ChangeLog from './pages/dashboard/changeLog';
import Help from './pages/dashboard/help';
import Upload from './pages/dashboard/upload';
import Analyze from './pages/dashboard/analyze';
import EvmChains from './pages/dashboard/evm-chains';

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
          <Route path="uploads" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="changeLog" element={<ChangeLog />} />
          <Route path="uploads/:id" element={<Upload />} />
          <Route path="uploads/:id/analyze" element={<Analyze />} />
          <Route path="analyze/:id/evm-chains" element={<EvmChains />} />
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