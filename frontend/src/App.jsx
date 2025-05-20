import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import { ProtectedRoute } from "./routes.jsx/ProtectedRoutes"
import Home from "./pages/Home"
import { ToastContainer, toast } from 'react-toastify';
import Layout from "./layout/Layout"

export default function App() {
  return (
    <BrowserRouter>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
              {/* Auth Page */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
               {/* Protected Routes */}
          <Route element={<ProtectedRoute />} >
            <Route element={<Layout/>}>
            <Route path='/' element={<Home />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}