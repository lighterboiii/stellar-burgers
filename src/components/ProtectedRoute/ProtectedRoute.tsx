import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "../../services/hooks";
import { getCookie } from "../../utils/cookie";
import { FC } from "react";

interface IProtectedRoute {
  element: any;
  to: string;
  isLoggedIn: boolean | undefined;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ element, isLoggedIn, to }) => {
  // const location = useLocation();
  // const from = location.state?.from || '/';

  // const token = getCookie("accessToken");
  // const userData = useSelector((store) => store.userReducer.user);
  // const { isLoggedIn } = useSelector((store) => store.userReducer);
  // console.log(isLoggedIn)
  // if (anonymous && isLoggedIn) {
  //   return <Navigate to={from} />;
  // }

  // if (!anonymous && !isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  // return element;

  return (
    <> {isLoggedIn ? element : <Navigate to={to} />} </>
  )
};