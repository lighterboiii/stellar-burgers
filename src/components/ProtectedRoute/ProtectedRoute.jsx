import { Navigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../services/actions/user";

export const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.accessToken);
  const userData = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!userData) {
      dispatch(getUserInfo(token))
    }
  }, [dispatch, token, userData])

  return (userData && token) ? element : <Navigate to="/login" replace/>;
}