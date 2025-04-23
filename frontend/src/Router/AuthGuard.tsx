import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const singIn = false;

  if (!singIn && isPrivate) {
    <Navigate to={'/login'} replace />;
  }

  if (singIn && !isPrivate) {
    <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}
