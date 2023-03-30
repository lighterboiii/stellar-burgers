import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "../../services/hooks";
import { FC } from "react";
import { ReactNode } from "react";

interface IProtectedRoute {
  element: ReactNode;
  anonymous?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ element, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const isLogin = useSelector((store) => store.userReducer.isLogin);
  // Если разрешен неавторизованный доступ, а пользователь авторизован,
  // то отправляем его на предыдущую страницу
  if (anonymous && isLogin) {
    return  <><Navigate to={from} /></>;
  }

  if (!anonymous && !isLogin) {
    return <><Navigate to="/login" state={{ from: location }} /></>;
  }

  return <>element</>;
};

export default ProtectedRoute;