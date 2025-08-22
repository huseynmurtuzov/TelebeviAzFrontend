import { Navigate } from "react-router-dom";
import { useNotification } from "./context/NotificationContext";

export function PrivateRoute({ children }) {
  const {isLoggedIn} = useNotification();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}