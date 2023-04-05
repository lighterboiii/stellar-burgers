import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";

interface IProtectedRoute {
  element: any;
  anonymous?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ element, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const { isLoggedIn } = useSelector((store) => store.userReducer);
  
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};