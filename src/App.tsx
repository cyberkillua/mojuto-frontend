import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Suspense, lazy, type ReactElement } from 'react'
import { AuthProvider } from './contexts/AuthContexts'
import Home from './pages/home'

// Dynamic imports using React.lazy
const Login = lazy(() => import("@/pages/auth/login"))
const SignUp = lazy(() => import('./pages/auth/signup'))
const AuthLayout = lazy(() => import('./layouts/authLayout'))
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
  <div className="flex items-center  justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7EF9FF]"></div>
  </div>
)

const withSuspense = (element: ReactElement) => (
  <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
)

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth routes - accessible only when not authenticated */}
        <Route element={withSuspense(<AuthLayout />)}>
          <Route path="login" element={withSuspense(<Login />)} />
          <Route path="signup" element={withSuspense(<SignUp />)} />
          <Route path="forgot-password" element={withSuspense(<ForgotPassword />)} />
        </Route>

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={withSuspense(
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          )}
        >
          <Route path="home" element={withSuspense(<DashboardHome />)} />
          <Route path="uploads" element={withSuspense(<Analytics />)} />
          <Route path="settings" element={withSuspense(<Settings />)} />
          <Route path="help" element={withSuspense(<Help />)} />
          <Route path="changeLog" element={withSuspense(<ChangeLog />)} />
          <Route path="uploads/:id" element={withSuspense(<Upload />)} />
          <Route path="uploads/:id/analyze" element={withSuspense(<Analyze />)} />
          <Route path="uploads/:id/analyze/evm-chains" element={withSuspense(<EvmChains />)} />
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