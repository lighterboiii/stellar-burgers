import { getUserData, login, refreshToken, registerUser, signOut, patchUserData, fetchWithRefresh } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { request } from "../../utils/api";

// login
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const SET_IS_LOGIN = 'SET_IS_LOGIN';
// registration
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = ' REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
// refreshing
// export const REFRESH_TOKEN = 'REFRESH_TOKEN';
// export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
// export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
// sing out
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
// set user data 
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';
// get user data
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
// password forgot check
export const SET_FORGOT_PASSWORD = 'SET_FORGOT_PASSWORD';

export const loginLoading = () => ({ type: LOGIN });
export const loginLoadingSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginLoadingFailed = () => ({ type: LOGIN_FAILED });

export const setIsLogin = (state) => ({ type: SET_IS_LOGIN, payload: state })

export const register = () => ({ type: REGISTER });
export const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
export const registerFailed = () => ({ type: REGISTER_FAILED });

export const setUserDataLoading = () => ({ type: SET_USER_DATA });
export const setUserDataSuccess = (userData) => ({ type: SET_USER_DATA_SUCCESS, payload: userData });
export const setUserDataFailed = () => ({ type: SET_USER_DATA_FAILED });

export const getUserDataLoading = () => ({ type: GET_USER_DATA });
export const getUserDataLoadingSuccess = (res) => ({ type: GET_USER_DATA_SUCCESS, payload: res });
export const getUserDataLoadingFailed = () => ({ type: GET_USER_DATA_FAILED });

// export const refreshTokenLoading = () => ({ type: REFRESH_TOKEN });
// export const refreshTokenSuccess = (token) => ({ type: REFRESH_TOKEN_SUCCESS, payload: token });
// export const refreshTokenFailed = () => ({ type: REFRESH_TOKEN_FAILED });

export const setLogoutLoading = () => ({ type: LOGOUT });
export const logoutSuccess = (token) => ({ type: LOGOUT_SUCCESS, payload: token });
export const logoutFailed = () => ({ type: LOGOUT_FAILED });

export const setForgotPassword = (state) => ({ type: SET_FORGOT_PASSWORD, payload: state });

export const setLogin = (email, password) => {
  return function (dispatch) {
    dispatch(loginLoading());

    login(email, password)
      .then(res => {
        dispatch(setIsLogin(true)); // убрать
        dispatch(loginLoadingSuccess(res));
        setCookie("accessToken", res.accessToken)
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        loginLoadingFailed()
        console.log(err)
      });
  }
};

export const setRegistration = (email, password, name) => {
  return function (dispatch) {
    dispatch(register());

    registerUser(email, password, name)
      .then(res => {
        if (res) {
          dispatch(registerSuccess(res));
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        registerFailed()
        console.log(err)
      })
  }
};

export const sendUserInfo = (token, name, email, password) => {
  return function (dispatch) {
    dispatch(setUserDataLoading());

    patchUserData(token, name, email, password)
      .then(res => {
        if (res) {
          dispatch(setUserDataSuccess(res));
        }
      })
      .catch((err) => {
        setUserDataFailed();
        console.log(err)
      })
  }
}

export const getUserInfo = () => {
  return function (dispatch) {
    // dispatch(getUserDataLoading());
    getUserData(getCookie("accessToken"))
      .then((res) => {
        if (res) {
          dispatch(getUserDataLoadingSuccess(res));
        }
      })
      .catch((err) => {
        dispatch(setRefreshToken(getCookie("refreshToken")));
        console.log(err)
      });
  }
};

export const setRefreshToken = () => {
  return function (dispatch) {
    // dispatch(refreshTokenLoading());
    refreshToken(refreshToken)
      .then((res) => {
        if (res) {
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
          dispatch(getUserInfo(getCookie("accessToken")));
        }
      })
      .catch((err) => {
        getUserDataLoadingFailed()
        console.log(err)
      })
  }
}

export const logout = (token) => {
  return function (dispatch) {
    dispatch(setLogoutLoading());

    signOut(token)
      .then((res) => {
        if (res) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(setIsLogin(false)); // убрать
          dispatch(logoutSuccess(res));
        }
      })
      .catch((err) => {
        logoutFailed();
        console.log(err)
      })
  }
}