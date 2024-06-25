import React from 'react'
import { Route, Routes } from "react-router-dom";

import { Categories, Favorites, Home, Movies, NotFound, TvShows } from '../pages';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminPage } from '../pages/admin/AdminPage';
import {Cover, Login, Profile, Resgister} from '../pages/profile'
import { AdminProtected, AdminUnAvailRoute } from './AdminProtected';
import { ProtectedRoute, UnavailRoute } from './ProtectedRoute';

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/tvshows" element={<ProtectedRoute><TvShows /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/register" element={<UnavailRoute><Resgister /></UnavailRoute>} />
        <Route path="/login" element={<UnavailRoute><Login /></UnavailRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cover" element={<UnavailRoute><Cover /></UnavailRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtected><AdminPage /></AdminProtected>} />
        <Route path="/admin/login" element={<AdminUnAvailRoute><AdminLogin /></AdminUnAvailRoute>} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
