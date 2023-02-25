import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ element, to }) => {

  const token = getCookie("accessToken");
  const userData = useSelector((state) => state.userInfo.user);
  
  return (userData && token) ? element : <Navigate to={to} replace/>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired
}