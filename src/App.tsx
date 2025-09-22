import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from './contexts/AuthContexts'

// Dynamic imports using React.lazy
const Login = lazy(() => import("@/pages/auth/login"))
const SignUp = lazy(() => import('./pages/auth/signup'))
const AuthLayout = lazy(() => import('./layouts/authLayout'))
const Home = lazy(() => import('./pages/home'))
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'))
const SidebarLayout = lazy(() => import('./layouts/dashboard/sidebarLayout'))
const DashboardHome = lazy(() => import('./pages/dashboard/dashboard-home'))
const ProtectedRoute = lazy(() => import('@/components/protectedRoute'))
const Analytics = lazy(() => import('./pages/dashboard/uploads'))
const Settings = lazy(() => import('./pages/dashboard/setting'))
const ChangeLog = lazy(() => import('./pages/dashboard/changeLog'))
const Help = lazy(() => import('./pages/dashboard/help'))
const Upload = lazy(() => import('./pages/dashboard/upload'))
const Analyze = lazy(() => import('./pages/dashboard/analyze'))
const EvmChains = lazy(() => import('./pages/dashboard/evm-chains'))

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
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
            <Route path="uploads/:id/analyze/evm-chains" element={<EvmChains />} />
            {/* Redirect /dashboard to /dashboard/home */}
            <Route index element={<Navigate to="home" replace />} />
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default App