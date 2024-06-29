import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import OwnerPage from './Pages/OwnerPage';
import PublicPage from './Pages/PublicPage';
import PrivateRoute from './Pages/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import PublicRoute from './Pages/PublicRoute';
import Home from './Pages/Home';
import Header from './components/Header';

function App() {

  const router = createBrowserRouter([
    {
      element: <Header />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: '/my-portfolio',
              element: <OwnerPage />
            },
          ]
        },
        {
          element: <PublicRoute />,
          children: [
            {
              path: '/signin',
              element: <SignIn />
            },
            {
              path: '/:username',
              element: <PublicPage />
            },
            {
              path: '/signup',
              element: <SignUp />
            }
          ]
        },
      ]
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
