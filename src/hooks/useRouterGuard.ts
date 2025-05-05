import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { authPages, appPages, userPages } from '../config/pages.config';
import { extractRoutes } from '../utils/getRoutesPath.util';

type RouteGuard = {
  isAllowed: boolean;
  showAside: boolean;
};

const LAST_PATH_KEY = 'lastAllowedPath';

export function useRouteGuard(): RouteGuard {
  const { pathname } = useLocation();
  const signedIn = useAppSelector(s => s.auth.session.signedIn);

  // Siempre permitimos 404
  if (pathname === '/404') {
    return {
      isAllowed: true,
      showAside: signedIn,
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

  // Chequeo principal
  let isAllowed: boolean;
  let showAside: boolean;

  if (!signedIn) {
    isAllowed = matches(authRoutes);
    showAside = false;
  } else {
    if (matches(authRoutes)) {
      isAllowed = false;
    } else {
      isAllowed = matches(appRoutes);
    }
    showAside = matches(appRoutes);
  }

  // Si es ruta de appPages válida, la guardamos
  if (signedIn && isAllowed && showAside) {
    localStorage.setItem(LAST_PATH_KEY, pathname);
  }

  return { isAllowed, showAside };
}
