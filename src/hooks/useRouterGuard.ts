// src/hooks/useRouteGuard.ts
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { authPages, appPages, userPages } from '../config/pages.config';
import { extractRoutes } from '../utils/getRoutesPath.util';

type RouteGuard = {
  isAllowed: boolean;
  showAside: boolean;
};

export function useRouteGuard(): RouteGuard {
  const { pathname } = useLocation();
  const signedIn = useAppSelector(s => s.auth.session.signedIn);

  // EXCEPCIÓN: siempre permitimos ver el 404 (y no mostramos Aside nunca)
  if (pathname === '/404') {
    return {
      isAllowed: true,
      showAside: signedIn,  // sólo mostramos Aside si está logueado
    };
  }

  const authRoutes = useMemo(() => extractRoutes(authPages), []);
  const appRoutes = useMemo(
    () => [...extractRoutes(appPages), ...extractRoutes(userPages)],
    []
  );

  const matches = (routes: string[]) =>
    routes.some(pattern =>
      new RegExp(`^${pattern.replace(/:[^/]+/g, '[^/]+')}$`).test(pathname)
    );

  let isAllowed = true;
  let showAside = true;

  if (!signedIn) {
    // No autenticado → sólo authPages
    isAllowed = matches(authRoutes);
    showAside = false;
  } else {
    // Autenticado → bloquea authPages
    if (matches(authRoutes)) {
      isAllowed = false;
    } else {
      isAllowed = matches(appRoutes);
    }
    // Aside sólo en rutas de appPages/userPages
    showAside = matches(appRoutes);
  }

  return { isAllowed, showAside };
}
