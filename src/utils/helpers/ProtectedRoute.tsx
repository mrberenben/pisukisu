import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean | false;
  children: ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: Props) => {
  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute;