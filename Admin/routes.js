import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Master from './pages/Master';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Review from './pages/Review';
import Category from './pages/Category';
import Table from './pages/Table';
import Login from './sections/FoodAPI/Login';
import Registration from './sections/FoodAPI/Registration';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/counsellorDB" />, index: true },
        { path: 'counsellorDB', element: <DashboardAppPage /> },
        { path: 'order', element: <Order /> },
        { path: 'menu', element: <Menu /> },
        { path: 'master', element: <Master /> },
        { path: 'review', element: <Review /> },
      ],
    },

    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'registration',
      element: <Registration />,
    },
    // ----------------------------------------------

    {
      path: 'category',
      element: <Category />,
    },
    {
      path: 'Table',
      element: <Table />,
    },

    // ----------------------------------------------
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
