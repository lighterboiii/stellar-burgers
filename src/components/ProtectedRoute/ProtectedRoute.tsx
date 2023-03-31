import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "../../services/hooks";
import { getCookie } from "../../utils/cookie";
import { FC } from "react";

interface IProtectedRoute {
  element: any;
  // to: string;
  anonymous?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ element, anonymous = false }) => {
  const location = useLocation();
  const from = location.state?.from || '/';

  // const token = getCookie("accessToken");
  const userData = useSelector((store) => store.userReducer.user);

  if (anonymous && userData) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;

  // return (
  //   <> {(userData && token) ? element : <Navigate to={to} />} </>
  // )
};