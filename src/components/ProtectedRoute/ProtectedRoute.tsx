import { Navigate } from "react-router-dom"
import { useSelector } from "../../services/hooks";
import { getCookie } from "../../utils/cookie";
import { FC } from "react";
import { ReactNode } from "react";
import { TUserState } from "../../services/reducers/userReducer";

interface IProtectedRoute {
  element: ReactNode;
  to: string;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ element, to }) => {

  const token = getCookie("accessToken");
  const userData  = useSelector((state) => state.userReducer.user);

  return (
    <>
      {(userData && token) ? element : <Navigate to={to} replace />}
    </>
  )
};