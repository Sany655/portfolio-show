import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PublicRoute() {
    const auth = useAuth();
    const isAuthenticated: boolean = auth.currentUser?.email ? true : false;

    if (isAuthenticated) {
        return <Navigate to="/my-portfolio" replace />;
    }

    return <Outlet />;
}

export default PublicRoute