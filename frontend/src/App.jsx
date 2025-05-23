import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import { ProtectedRoute } from "./routes/ProtectedRoutes"
import Home from "./pages/Home"
import { ToastContainer } from 'react-toastify';
import Layout from "./layout/Layout"
import { AuthProvider } from "./context/AuthContext"
import ProfilePage from "./pages/Profile"

export default function App() {
  return (
    <BrowserRouter>
       <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
              {/* Auth Page */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
               {/* Protected Routes */}
          <Route element={<ProtectedRoute />} >
            <Route element={<AuthProvider/>}>
            <Route element={<Layout/>}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:id' element={<ProfilePage/>}/>
            </Route>
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}