import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import ProtectedRoute from 'src/protected-routes';
import { DashboardLayout } from 'src/layouts/dashboard';


// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const TaskListPage = lazy(() => import('src/pages/task-list'));
export const NewTaskPage = lazy(() => import('src/pages/add-task'));
// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <ProtectedRoute>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </ProtectedRoute>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'tasks', element: <TaskListPage /> },
        { path: 'new-task', element: <NewTaskPage /> },
      ],
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
