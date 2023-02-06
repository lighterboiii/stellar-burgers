import { Navigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../services/actions/user";
import PropTypes from 'prop-types';
import { IngredientPropTypes } from "../../utils/constants/constants";

export const ProtectedRoute = ({ element, to }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.accessToken);
  const userData = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!userData) {
      dispatch(getUserInfo(token))
    }
  }, [dispatch, token, userData])

  return (userData && token) ? element : <Navigate to={to} replace/>;
}

export const AuthRoute = ({ element, to }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.accessToken);
  const userData = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!userData) {
      dispatch(getUserInfo(token))
    }
  }, [dispatch, token, userData])

  return (!userData && !token) ? element : <Navigate to={to} replace/>;
}

ProtectedRoute.propTypes = {
  element: IngredientPropTypes.isRequired,
  to: PropTypes.string.isRequired
}