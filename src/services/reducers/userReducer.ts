import {
  GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
  LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER, REGISTER_FAILED, REGISTER_SUCCESS,
  LOGOUT, LOGOUT_FAILED, LOGOUT_SUCCESS,
  SET_USER_DATA, SET_USER_DATA_SUCCESS, SET_USER_DATA_FAILED, SET_FORGOT_PASSWORD
} from '../constants/index';
import { IUser } from '../actions/userActions';
import { TUserActions } from '../actions/userActions';

export type TUserState = {
  loginRequest: boolean;
  loginFailed: boolean;
  getUserDataRequest: boolean;
  getUserDataRequestFailed: boolean;
  registrationRequest: boolean;
  registrationFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  isPasswordForgot: boolean;
  user: IUser | null;
  isLogin: boolean;
  accessToken?: string;
};

const initialState: TUserState = {
  loginRequest: false,
  loginFailed: false,
  getUserDataRequest: false,
  getUserDataRequestFailed: false,
  registrationRequest: false,
  registrationFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  isPasswordForgot: false,
  user: null,
  isLogin: false,
  accessToken: undefined
}

const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        accessToken: action.payload.accessToken, // починить
        user: action.payload.user,
        isLogin: true
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      };
    }
    case REGISTER: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        user: action.payload
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    }
    case SET_USER_DATA: {
      return {
        ...state,
        setUserDataRequest: true,
        setUserDataFailed: false,
      };
    }
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        setUserDataRequest: false,
        user: action.payload
      };
    }
    case SET_USER_DATA_FAILED: {
      return {
        ...state,
        setUserDataRequest: false,
        setUserDataFailed: true,
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataRequestFailed: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        user: action.payload.user
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataRequestFailed: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        user: null,
        accessToken: null,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      }
    }
    case SET_FORGOT_PASSWORD: {
      return {
        ...state,
        isPasswordForgot: action.payload,
      }
    }
    default: {
      return state;
    }
  }
 }

 export { userReducer };