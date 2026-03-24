import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthGuard({ children }) {
  const { user } = useAuth(); // Reads transparently from AuthContext

  if (!user) {
    // If no user is logged in, redirect them back to the homepage
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the requested protected component
  return children;
}
