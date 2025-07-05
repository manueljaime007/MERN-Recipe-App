import { useState } from 'react'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { Routes, Route } from 'react-router-dom'

export const App = () => {

  return (
    <>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </AuthProvider>
    </>
  )
}

