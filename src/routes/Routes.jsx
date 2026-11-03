/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import App from '../App';
import { useLogin } from '../context/LoginContext';
import Login from '../views/Login';
import Register from '../views/Register';
import NewEncounter from '../components/NewEncounter';
import Encounter from '../views/Encounter';
import EncounterDetails from '../views/EncounterDetails';
import MergeRequest from '../views/MergeRequest';
import MyEncounter from '../views/MyEncounter';

function ProtectedRoute() {
  const { isAuthenticated, isLoading, authError } = useLogin()

  if (isLoading) {
    return <main className="login-shell"><p>Checking your session...</p></main>
  }

  if (authError && !isAuthenticated) {
    return <main className="login-shell"><p className="login-error">{authError}</p></main>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Encounter /> },
      { path: 'encounter/:id', element: <EncounterDetails /> },
      {
        element: <ProtectedRoute />,
        children: [
          
          { path: 'NewEncounter', element: <NewEncounter /> },
          { path: 'mergeRequest', element: <MergeRequest /> },
          { path: 'MyEncounters', element: <MyEncounter /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
])
