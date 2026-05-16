import { useAuth } from "./AuthContext";
import type { ReactElement } from "react";
import NotFoundPage from "./NotFoundPage";

// Define the User type based on your AuthContext
type User = {
  email: string;
  isStudio: boolean;
};

interface ProtectedRouteProps {
  children: ReactElement;
  allowedForStudio: boolean;
}

const ProtectedRoute = ({ children, allowedForStudio }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <NotFoundPage />;
  }
  
  // Check access based on the user's isStudio role
  const isAuthorized = allowedForStudio ? user.isStudio : !user.isStudio;

  return isAuthorized ? children : <NotFoundPage />;
};

export default ProtectedRoute;