import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const signedIn = useAppSelector(s => s.auth.session.signedIn);
  const location = useLocation();

  if (!signedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Si recibe children, los renderiza; si no, usa el <Outlet/>
  return <>{children ?? <Outlet />}</>;
};
