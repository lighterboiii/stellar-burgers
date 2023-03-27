import { checkUserDataRequest, loginRequest, refreshTokenRequest, registerUserRequest, signOutRequest, changeUserDataRequest } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
  SET_USER_DATA, SET_USER_DATA_SUCCESS, SET_USER_DATA_FAILED,
  GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, SET_FORGOT_PASSWORD
} from '../constants/index';
import { AppDispatch } from "../types";

export interface IUser {
  name: string;
  email: string;
}

export interface IUserData {
  loginRequest: boolean;
  loginFailed: boolean;
  getUserDataRequest: boolean;
  getUserDataRequestFailed: boolean;
  registrationRequest: boolean;
  registrationFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  isPasswordForgot: boolean;
  user: IUser;
  isLogin: boolean;
  accessToken: string;
}

export interface ISetForgotPassword {
  readonly type: typeof SET_FORGOT_PASSWORD;
  readonly payload: boolean;
}

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
}

export interface ISetUserDataFailed {
  readonly type: typeof SET_USER_DATA_FAILED;
}

export interface ISetUserDataSuccess {
  readonly type: typeof SET_USER_DATA_SUCCESS;
  readonly payload: IUserData;
}

export interface ILogin {
  readonly type: typeof LOGIN;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: IUserData;
}

export interface ILogout {
  readonly type: typeof LOGOUT;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: string;
}

export interface IGetUserData {
  readonly type: typeof GET_USER_DATA;
}

export interface IGetUserDataFailed {
  readonly type: typeof GET_USER_DATA_FAILED;
}

export interface IGetUserDataSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: IUserData;
}

export interface IRegister {
  readonly type: typeof REGISTER;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: string;
}

export type TUserActions =
  | ISetForgotPassword
  | ISetUserData
  | ISetUserDataFailed
  | ISetUserDataSuccess
  | IGetUserData
  | IGetUserDataFailed
  | IGetUserDataSuccess
  | ILogin
  | ILoginFailed
  | ILoginSuccess
  | IRegister
  | IRegisterFailed
  | IRegisterSuccess
  | ILogout
  | ILogoutFailed
  | ILogoutSuccess;

export const loginLoading = (): ILogin => ({ type: LOGIN });
export const loginLoadingSuccess = (token: IUserData): ILoginSuccess => ({ type: LOGIN_SUCCESS, payload: token });
export const loginLoadingFailed = (): ILoginFailed => ({ type: LOGIN_FAILED });

export const register = (): IRegister => ({ type: REGISTER });
export const registerSuccess = (token: string): IRegisterSuccess => ({ type: REGISTER_SUCCESS, payload: token });
export const registerFailed = (): IRegisterFailed => ({ type: REGISTER_FAILED });

export const setUserDataLoading = (): ISetUserData => ({ type: SET_USER_DATA });
export const setUserDataSuccess = (userData: IUserData): ISetUserDataSuccess => ({ type: SET_USER_DATA_SUCCESS, payload: userData });
export const setUserDataFailed = (): ISetUserDataFailed => ({ type: SET_USER_DATA_FAILED });

export const getUserDataLoading = (): IGetUserData => ({ type: GET_USER_DATA });
export const getUserDataLoadingSuccess = (res: IUserData): IGetUserDataSuccess => ({ type: GET_USER_DATA_SUCCESS, payload: res });
export const getUserDataLoadingFailed = (): IGetUserDataFailed => ({ type: GET_USER_DATA_FAILED });

export const setLogoutLoading = (): ILogout => ({ type: LOGOUT });
export const logoutSuccess = (token: string): ILogoutSuccess => ({ type: LOGOUT_SUCCESS, payload: token });
export const logoutFailed = (): ILogoutFailed => ({ type: LOGOUT_FAILED });

export const setForgotPassword = (status: boolean) => ({ type: SET_FORGOT_PASSWORD, payload: status });

export const setLogin = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginLoading());

    loginRequest(email, password)
      .then(res => {
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

export const setRegistration = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(register());

    registerUserRequest(email, password, name)
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

export const sendUserInfo = (name: string, email: string, password: string, token: string | undefined) => {
  return function (dispatch: AppDispatch) {
    dispatch(setUserDataLoading());

    changeUserDataRequest(name, email, password, token)
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
};

export const getUserInfo = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserDataLoading());
    return checkUserDataRequest(getCookie("accessToken"))
      .then((res) => {
        if (res) {
          dispatch(getUserDataLoadingSuccess(res));
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(setRefreshToken(getCookie("refreshToken")));
        }
        console.log(err)
      });
  }
};

export const setRefreshToken = (refreshToken: string | undefined) => {
  return function (dispatch: AppDispatch) {
    refreshTokenRequest(refreshToken)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(getUserInfo());
      })
  }
};

export const setLogout = (token: string | undefined) => {
  return function (dispatch: AppDispatch) {
    dispatch(setLogoutLoading());

    signOutRequest(token)
      .then((res) => {
        if (res) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(logoutSuccess(res));
        }
      })
      .catch((err) => {
        logoutFailed();
        console.log(err)
      })
  }
};