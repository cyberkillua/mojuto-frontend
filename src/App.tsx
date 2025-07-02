import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "@/pages/auth/login";
import SignUp from './pages/auth/signup';
import AuthLayout from './layouts/authLayout';
import Home from './pages/home';
import ForgotPassword from './pages/auth/forgot-password';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />} >
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default App
