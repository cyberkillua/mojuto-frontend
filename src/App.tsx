import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "@/pages/auth/login";
import SignUp from './pages/auth/signup';
import AuthLayout from './layouts/authLayout';
import Home from './pages/home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />} >
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
