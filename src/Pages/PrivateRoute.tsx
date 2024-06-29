import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute: React.FC = () => {
  const isAuthenticated: boolean = auth.currentUser?.displayName ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;