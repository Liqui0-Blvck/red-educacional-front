// src/components/Layout/PageWrapper.tsx

import React, { FC, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useColorApp from '../../../hooks/useColorApp';
import { appPages, authPages, userPages } from '../../../config/pages.config';
import { extractRoutes } from '../../../utils/getRoutesPath.util';
import { useRouteGuard } from '../../../hooks/useRouterGuard';

interface IPageWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  isProtectedRoute?: boolean;
  name?: string;
}

const PageWrapper: FC<IPageWrapperProps> = ({
  children,
  className,
  isProtectedRoute = true,
  title,
  name,
}) => {
  useDocumentTitle({ title, name });
  const { pathname } = useLocation();
  const isSignedIn = useAppSelector(state => state.auth.session.signedIn);
  const { configuracion } = useAppSelector(state => state.auth.user);
  const { setColorAppTheme } = useColorApp();

  const { isAllowed } = useRouteGuard()

  if (pathname === authPages.loginPage.to) {
    setColorAppTheme('blue');
  }

  if (!isAllowed && pathname !== '/404') {
    const to = isSignedIn ? appPages.dashboard.to : authPages.loginPage.to;
    return <Navigate to={to} replace />;
  }

  // Si la ruta está permitida, renderizamos el contenido
  const fontMap: Record<string, string> = {
    'Arial, sans-serif': 'font-arial',
    'Helvetica, sans-serif': 'font-helvetica',
    'Verdana, sans-serif': 'font-verdana',
    'Tahoma, sans-serif': 'font-tahoma',
    'Georgia, serif': 'font-georgia',
    'Times New Roman, serif': 'font-times',
    'Courier New, monospace': 'font-courier',
    'Lucida Console, monospace': 'font-lucida',
    'Roboto, sans-serif': 'font-roboto',
    'Open Sans, sans-serif': 'font-opensans',
    'Lato, sans-serif': 'font-lato',
    'Montserrat, sans-serif': 'font-montserrat',
    'Poppins, sans-serif': 'font-sans',
    'Raleway, sans-serif': 'font-raleway',
    'Oswald, sans-serif': 'font-oswald',
    'Roboto Slab, serif': 'font-robotoslab',
    'Merriweather, serif': 'font-merriweather',
    'Playfair Display, serif': 'font-playfair',
  };
  const fontClass = fontMap[configuracion?.fuente_aplicacion!] || 'font-sans';

  return (
    <main
      data-component-name="PageWrapper"
      className={classNames('flex flex-col grow shrink-0', fontClass, className)}
    >
      {children}
    </main>
  );
};

PageWrapper.defaultProps = {
  className: undefined,
  title: undefined,
  name: undefined,
};

export default PageWrapper;
