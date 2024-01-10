import { Link, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';

import HomePage from './components/Pages/HomePage';

import SignupPage from './components/Pages/SignupPage';
import LoginPage from './components/Pages/LoginPage';
import Dashboard from './components/Pages/Dashboard';
import DetailAddressPage from './components/Pages/DetailAddressPage';
import SettingsPage from './components/Pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <div>
        <p>Oupsy , something went wrong!</p>
        <Link to="/">
          <button className="btn btn-primary">Back to homepage</button>
        </Link>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      },
      {
        path: '/address/:address',
        element: <DetailAddressPage />
      }
    ]
  }
]);
