import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="p-10 text-center text-slate-500">...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};
