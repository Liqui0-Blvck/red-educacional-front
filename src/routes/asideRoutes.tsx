import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';
import { authPages } from '../config/pages.config';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const asideRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: authPages.signUp.to, element: null },
	{ path: authPages.confirmPage.to, element: null },
	{ path: authPages.resetPasswordPage.to, element: null },
	

	{
    path: '*',
    element: (
      <ProtectedRoute>
        <DefaultAsideTemplate />
      </ProtectedRoute>
    ),
  },
];

export default asideRoutes;
