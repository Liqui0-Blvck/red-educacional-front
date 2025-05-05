// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { useRouteGuard } from '../../hooks/useRouterGuard';

const LAST_PATH_KEY = 'lastAllowedPath';

export const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const signedIn = useAppSelector(s => s.auth.session.signedIn);
  const location = useLocation();
  const { isAllowed } = useRouteGuard();

  // 1) Si no está autenticado → login
  if (!signedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 2) Si está autenticado pero la ruta NO está permitida → última válida o dashboard
  if (!isAllowed) {
    const last = localStorage.getItem(LAST_PATH_KEY) || '/dashboard';
    return <Navigate to={last} replace />;
  }

  // 3) Ruta permitida → renderiza children u Outlet
  return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
