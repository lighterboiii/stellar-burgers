import { getUserData, login, registerUser } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = ' REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const getUserDataLoading = () => ({ type: GET_USER_DATA });
export const getUserDataLoadingSuccess = (userData) => ({ type: GET_USER_DATA_SUCCESS, payload: userData });
export const getUserDataLoadingFailed = () => ({ type: GET_USER_DATA_FAILED });

export const loginLoading = () => ({ type: LOGIN });
export const loginLoadingSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginLoadingFailed = () => ({ type: LOGIN_FAILED });

export const register = () => ({ type: REGISTER });
export const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
export const registerFailed = () => ({ type: REGISTER_FAILED });

export const getUserInfo = (token) => {
  return function (dispatch) {
    dispatch(getUserDataLoading());

    getUserData(token)
      .then((res) => {
        if (res) {
          dispatch(getUserDataLoadingSuccess(res));
        }
      })
      .catch(() => getUserDataLoadingFailed());
  }
};

export const setLogin = (email, password) => {
  return function (dispatch) {
    dispatch(loginLoading());

    login(email, password)
      .then(res => {
        dispatch(loginLoadingSuccess(res));
      })
      .catch(() => loginLoadingFailed());
  }
};

export const setRegistration = (email, password, name) => {
  return function (dispatch) {
    dispatch(register());

    registerUser(email, password, name)
    .then(res => {
      if (res) {
        dispatch(registerSuccess(res));
      }
    })
    .catch((err) =>  {
      registerFailed()
      console.log(err)
    })
  }
};