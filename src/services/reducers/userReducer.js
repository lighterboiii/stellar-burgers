import {
  GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
  LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER, REGISTER_FAILED, REGISTER_SUCCESS
} from '../actions/user';

const initialState = {
  loginRequest: false,
  loginFailed: false,
  getUserDataRequest: false,
  getUserDataRequestFailed: false,
  registrationRequest: false,
  registrationFailed: false,
  accessToken: null,
  user: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
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
        user: action.payload
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataRequestFailed: true,
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
        accessToken: action.payload,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    }
    default: {
      return state;
    }
  }
 }

 export { userReducer };