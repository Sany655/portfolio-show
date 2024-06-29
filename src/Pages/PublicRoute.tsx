import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

function PublicRoute() {
    const isAuthenticated: boolean = auth.currentUser?.displayName ? true : false;

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PublicRoute