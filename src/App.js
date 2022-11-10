import './index.css'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage';
import UserRedirectPage from './pages/UserRedirectPage';

export default function App() {
  return (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/redirecting" element={<UserRedirectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}


